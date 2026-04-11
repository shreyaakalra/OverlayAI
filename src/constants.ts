export const modeConfig: Record<string, { label: string; icon: string; colorClass: string }> = {
  code:     { label: 'Code',     icon: '</>',  colorClass: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/25' },
  email:    { label: 'Email',    icon: '@',    colorClass: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25' },
  terminal: { label: 'Terminal', icon: '$',    colorClass: 'text-orange-400 bg-orange-400/10 border-orange-400/25' },
  document: { label: 'Document', icon: '§',    colorClass: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/25' },
  browser:  { label: 'Browser',  icon: '⊕',   colorClass: 'text-purple-400 bg-purple-400/10 border-purple-400/25' },
  other:    { label: 'Reading',  icon: '◎',   colorClass: 'text-slate-400 bg-slate-400/10 border-slate-400/25' },
}