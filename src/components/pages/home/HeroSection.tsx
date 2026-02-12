import { memo } from 'react'
import { HeroContent } from '@/components/responsive/HeroContent'
import { Box } from '@/shadcn/components/ui/layout'

export const HeroSection = memo(() => {
  return (
    <Box id="inicio">
      <HeroContent />
    </Box>
  )
})
