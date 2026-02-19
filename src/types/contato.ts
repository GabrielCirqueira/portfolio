import type { LucideIcon } from 'lucide-react'

export interface ContactItem {
  icon: LucideIcon
  label: string
  value: string
  href: string | null
  highlight?: boolean
  description?: string
  responseTime?: string
}
