export async function captureScreen(): Promise<string> {
  const screenshot = await (window as any).overlayAPI.captureScreen()
  console.log('Screenshot length:', screenshot?.length)
  console.log('Screenshot preview:', screenshot?.substring(0, 50))
  return screenshot
}