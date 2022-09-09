import { KanbanDivisionType, KanbanDivisionColor } from './constants';

export type ValueOf<T> = T[keyof T];

export interface SectionProps {
  index: number
  title: string
  path: string
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
  order: number
  type: KanbanTypes
  cards: CardAttr[]
}

export interface CardAttr {
  id: string
  text?: string
}

export interface CardOrder {
  id: string
  next: string | null
}
