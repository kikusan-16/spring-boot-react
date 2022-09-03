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
