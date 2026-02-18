import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  name: string
  href: string
  icon?: LucideIcon
}

export interface SocialItem {
  icon: LucideIcon
  href: string
  label: string
}

export interface LinkItem {
  name: string
  href: string
}
