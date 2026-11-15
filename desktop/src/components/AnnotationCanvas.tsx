import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

export type Tool = 'pen' | 'circle' | 'rect' | 'arrow' | 'snip'

interface Pt {
  x: number
  y: number
}
interface Shape {
  kind: Tool
  color: string
  a: Pt
  b: Pt
  pts: Pt[] // pen only
}
interface Region {
  x: number
  y: number
  w: number
  h: number
}

export interface ExportResult {
  dataUrl: string
  annotated: boolean
  cropped: boolean
}
export interface AnnotationHandle {
  exportImage: () => ExportResult
  undo: () => void
  clear: () => void
}

interface Props {
  src: string
  interactive: boolean
}

const COLORS = [
  { name: 'Red', value: '#ff453a' },
  { name: 'Yellow', value: '#ffd60a' },
  { name: 'Green', value: '#32d74b' },
]

const TOOLS: { id: Tool; label: string; hint: string }[] = [
  { id: 'pen', label: 'Pen', hint: 'Draw freehand' },
  { id: 'circle', label: 'Circle', hint: 'Circle something' },
  { id: 'rect', label: 'Box', hint: 'Box something' },
  { id: 'arrow', label: 'Arrow', hint: 'Point at something' },
  { id: 'snip', label: 'Region', hint: 'Send only a part of the screen' },
]

const EXPORT_MAX_EDGE = 2048 // longest side of the image sent to the model

function normRegion(a: Pt, b: Pt): Region {
  return { x: Math.min(a.x, b.x), y: Math.min(a.y, b.y), w: Math.abs(a.x - b.x), h: Math.abs(a.y - b.y) }
}

function drawShape(ctx: CanvasRenderingContext2D, s: Shape, lw: number) {
  ctx.save()
  ctx.strokeStyle = s.color
  ctx.lineWidth = lw
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.beginPath()

  if (s.kind === 'pen') {
    s.pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)))
  } else if (s.kind === 'rect') {
    const r = normRegion(s.a, s.b)
    ctx.rect(r.x, r.y, r.w, r.h)
  } else if (s.kind === 'circle') {
    const r = normRegion(s.a, s.b)
    ctx.ellipse(r.x + r.w / 2, r.y + r.h / 2, r.w / 2, r.h / 2, 0, 0, Math.PI * 2)
  } else if (s.kind === 'arrow') {
    const angle = Math.atan2(s.b.y - s.a.y, s.b.x - s.a.x)
    const head = lw * 5
    ctx.moveTo(s.a.x, s.a.y)
    ctx.lineTo(s.b.x, s.b.y)
    ctx.moveTo(s.b.x - head * Math.cos(angle - Math.PI / 6), s.b.y - head * Math.sin(angle - Math.PI / 6))
    ctx.lineTo(s.b.x, s.b.y)
    ctx.lineTo(s.b.x - head * Math.cos(angle + Math.PI / 6), s.b.y - head * Math.sin(angle + Math.PI / 6))
  }
  ctx.stroke()
  ctx.restore()
}

/** Paints screenshot + marks. `withDim` adds the region cut-out used on screen but not in the export. */
function paint(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  w: number,
  h: number,
  shapes: Shape[],
  draft: Shape | null,
  region: Region | null,
  withDim: boolean,
) {
  const lw = Math.max(3, w / 450)
  ctx.clearRect(0, 0, w, h)
  ctx.drawImage(img, 0, 0, w, h)

  const reg = draft?.kind === 'snip' ? normRegion(draft.a, draft.b) : region
  if (withDim && reg) {
    ctx.save()
    ctx.fillStyle = 'rgba(0,0,0,0.55)'
    ctx.beginPath()
    ctx.rect(0, 0, w, h)
    ctx.rect(reg.x, reg.y, reg.w, reg.h)
    ctx.fill('evenodd')
    ctx.strokeStyle = 'rgba(255,255,255,0.9)'
    ctx.lineWidth = lw * 0.6
    ctx.setLineDash([lw * 3, lw * 2])
    ctx.strokeRect(reg.x, reg.y, reg.w, reg.h)
    ctx.restore()
  }

  shapes.forEach((s) => drawShape(ctx, s, lw))
  if (draft && draft.kind !== 'snip') drawShape(ctx, draft, lw)
}

const AnnotationCanvas = forwardRef<AnnotationHandle, Props>(function AnnotationCanvas(
  { src, interactive },
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)

  const [size, setSize] = useState({ w: 0, h: 0 })
  const [tool, setTool] = useState<Tool>('pen')
  const [color, setColor] = useState(COLORS[0].value)
  const [shapes, setShapes] = useState<Shape[]>([])
  const [region, setRegion] = useState<Region | null>(null)
  const [draft, setDraft] = useState<Shape | null>(null)

  // Load the screenshot and reset marks whenever a new capture arrives
  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      imgRef.current = img
      setShapes([])
      setRegion(null)
      setDraft(null)
      setSize({ w: img.naturalWidth, h: img.naturalHeight })
    }
    img.src = src
  }, [src])

  // Repaint on any change
  useEffect(() => {
    const canvas = canvasRef.current
    const img = imgRef.current
    if (!canvas || !img || !size.w) return
    canvas.width = size.w
    canvas.height = size.h
    paint(canvas.getContext('2d')!, img, size.w, size.h, shapes, draft, region, true)
  }, [size, shapes, draft, region])

  // Cmd/Ctrl+Z (ignored while typing in the input)
  useEffect(() => {
    if (!interactive) return
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.tagName === 'INPUT'
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z' && !typing) {
        e.preventDefault()
        undo()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [interactive, shapes, region])

  function undo() {
    if (shapes.length) setShapes((s) => s.slice(0, -1))
    else if (region) setRegion(null)
  }
  function clear() {
    setShapes([])
    setRegion(null)
  }

  useImperativeHandle(
    ref,
    () => ({
      undo,
      clear,
      exportImage: () => {
        const img = imgRef.current
        if (!img) throw new Error('No screenshot loaded')
        const { w, h } = size

        // 1) screenshot + marks at full resolution, without the dim overlay
        const full = document.createElement('canvas')
        full.width = w
        full.height = h
        paint(full.getContext('2d')!, img, w, h, shapes, null, region, false)

        // 2) crop to region if one was chosen, then downscale
        const isCropped = !!region && region.w > 12 && region.h > 12
        const crop = isCropped ? region! : { x: 0, y: 0, w, h }
        const scale = Math.min(1, EXPORT_MAX_EDGE / Math.max(crop.w, crop.h))
        const out = document.createElement('canvas')
        out.width = Math.round(crop.w * scale)
        out.height = Math.round(crop.h * scale)
        out.getContext('2d')!.drawImage(full, crop.x, crop.y, crop.w, crop.h, 0, 0, out.width, out.height)

        return {
          dataUrl: out.toDataURL('image/jpeg', 0.85),
          annotated: shapes.length > 0,
          cropped: isCropped,
        }
      },
    }),
    [size, shapes, region],
  )

  // Pointer position in canvas pixel space (independent of window size / DPI)
  function toCanvas(e: React.PointerEvent): Pt {
    const r = canvasRef.current!.getBoundingClientRect()
    return { x: ((e.clientX - r.left) * size.w) / r.width, y: ((e.clientY - r.top) * size.h) / r.height }
  }

  function onPointerDown(e: React.PointerEvent) {
    if (!interactive || e.button !== 0) return
    canvasRef.current!.setPointerCapture(e.pointerId)
    const p = toCanvas(e)
    setDraft({ kind: tool, color, a: p, b: p, pts: [p] })
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!draft) return
    const p = toCanvas(e)
    setDraft((d) => (d ? { ...d, b: p, pts: d.kind === 'pen' ? [...d.pts, p] : d.pts } : d))
  }
  function onPointerUp() {
    if (!draft) return
    const minSize = size.w / 150
    const dx = Math.abs(draft.a.x - draft.b.x)
    const dy = Math.abs(draft.a.y - draft.b.y)

    if (draft.kind === 'snip') {
      setRegion(dx > minSize && dy > minSize ? normRegion(draft.a, draft.b) : null)
    } else if (draft.kind === 'pen' ? draft.pts.length > 2 : dx > minSize || dy > minSize) {
      setShapes((s) => [...s, draft])
    }
    setDraft(null)
  }

  return (
    <div className="absolute inset-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ cursor: interactive ? 'crosshair' : 'default', touchAction: 'none' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      />

      {interactive && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-2xl bg-zinc-900/85 backdrop-blur-xl border border-white/10 p-1.5 shadow-2xl">
          {TOOLS.map((t) => (
            <button
              key={t.id}
              title={t.hint}
              onClick={() => setTool(t.id)}
              className={`px-3 py-1.5 rounded-xl text-sm transition-colors ${
                tool === t.id ? 'bg-white text-zinc-900 font-medium' : 'text-white/70 hover:bg-white/10'
              }`}
            >
              {t.label}
            </button>
          ))}

          <div className="w-px h-5 bg-white/15 mx-1" />

          {COLORS.map((c) => (
            <button
              key={c.value}
              title={c.name}
              aria-label={c.name}
              onClick={() => setColor(c.value)}
              className={`w-5 h-5 rounded-full mx-0.5 transition-transform ${
                color === c.value ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900 scale-110' : ''
              }`}
              style={{ background: c.value }}
            />
          ))}

          <div className="w-px h-5 bg-white/15 mx-1" />

          <button
            onClick={undo}
            disabled={!shapes.length && !region}
            className="px-3 py-1.5 rounded-xl text-sm text-white/70 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            Undo
          </button>
          <button
            onClick={clear}
            disabled={!shapes.length && !region}
            className="px-3 py-1.5 rounded-xl text-sm text-white/70 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  )
})

export default AnnotationCanvas