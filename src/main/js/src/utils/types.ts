import { KanbanDivisionType, KanbanDivisionColor } from './constants';

export type ValueOf<T> = T[keyof T];

export interface SectionProps {
  index: number
  title: string
  path: string
  content: React.ReactElement
  note?: React.ReactElement
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

export interface Authority {
  authority: string
}

export interface LocalUser {
  id: string
  token: string
  name: string
  email: string
  bio: string
  authorities: Authority[]
  username: string
}

export interface Login {
  email: string
  password: string
}

export interface Error {
  status: number
  message: string
}

export interface VideoResponse {
  id: string
  name: string
  type: string
  data: string
}
