import { KanbanDivisionType, KanbanDivisionColor } from './constants';

export type ValueOf<T> = T[keyof T];

export interface SectionProps {
  index: number
  title: string
  path: string
  content: React.ReactElement
  note?: string
}

export interface MainProps {
  section: SectionProps
  children?: React.ReactNode
}

export type KanbanTypes = ValueOf<typeof KanbanDivisionType>;

export type KanbanColors = ValueOf<typeof KanbanDivisionColor>;

export interface ColumnAttr {
  id: string
  title: string
  lineNumber: number
  type: KanbanTypes
  stickyNotes: StickyNoteAttr[]
}

export interface StickyNoteAttr {
  id: string
  text?: string
}

export interface NodeLink {
  id: string
  next: string | null
}
