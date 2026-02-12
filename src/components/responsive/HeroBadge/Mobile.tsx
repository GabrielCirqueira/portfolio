import { Terminal } from 'lucide-react'
import { Badge } from '@/shadcn/components/ui/badge'
import { Icon } from '@/shadcn/components/ui/icon'
import { Text } from '@/shadcn/components/ui/typography'

export const HeroBadgeMobile = () => {
  return (
    <Badge
      className="
        inline-flex items-center px-3 py-1
        rounded-full border border-brand-500/30
        bg-brand-500/10 text-brand-300
        text-[10px] uppercase tracking-widest
        font-bold shadow-sm shadow-brand-500/15 
        cursor-default
      "
    >
      <Icon icon={Terminal} className="w-3 h-3 mr-1.5 text-brand-400" />
      <Text>Dev Fullstack & Game Dev</Text>
    </Badge>
  )
}
