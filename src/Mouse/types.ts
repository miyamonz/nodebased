import type { Position } from '../types'

type MouseBase = {
  position: Position
}
type MouseMove = MouseBase & {
  type: 'move'
}
type MouseDown = MouseBase & {
  type: 'down'
}
type MouseDrag = MouseBase & {
  type: 'drag'
}
type MouseUp = MouseBase & {
  type: 'up'
}
export type SimpleMouseEvent = MouseMove | MouseDown | MouseDrag | MouseUp
