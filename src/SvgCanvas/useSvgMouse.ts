import React from 'react'
import { Position } from '../types'

const screenToSvg = (svg: SVGSVGElement) => (
  e: React.MouseEvent<SVGGraphicsElement>
) => {
  const pt = svg.createSVGPoint()
  pt.x = e.clientX
  pt.y = e.clientY
  return pt.matrixTransform(svg.getScreenCTM()?.inverse())
}

type Callback = (e: React.MouseEvent<SVGSVGElement>) => Position
export function useSVGMouse() {
  const [fn, setFn] = React.useState<Callback>(() => () => ({ x: 0, y: 0 }))
  const ref = React.useCallback((node: SVGSVGElement) => {
    const fn = screenToSvg(node)
    const handler: Callback = (e) => {
      const p = fn(e)
      return { x: p.x, y: p.y }
    }
    setFn(() => handler)
  }, [])

  return [ref, fn] as const
}
