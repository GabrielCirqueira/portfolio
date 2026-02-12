import { Terminal } from 'lucide-react'
import { Badge } from '@/shadcn/components/ui/badge'
import { Icon } from '@/shadcn/components/ui/icon'
import { Text } from '@/shadcn/components/ui/typography'

export const HeroBadgeDesktop = () => {
  return (
    <Badge
      className="
        inline-flex items-center px-4 py-1.5
        rounded-full border border-brand-500/30
        bg-brand-500/10 text-brand-300
        text-sm uppercase tracking-widest
        font-bold shadow-[0_0_20px_var(--tw-shadow-color)]
        shadow-brand-500/15 hover:bg-brand-500/20
        transition-colors cursor-default
      "
    >
      <Icon icon={Terminal} className="w-3.5 h-3.5 mr-2 text-brand-400" />
      <Text>Dev Fullstack & Game Dev</Text>
    </Badge>
  )
}
