import { FileCode } from 'lucide-react'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text } from '@/shadcn/components/ui/typography'

export const ProfileCardDesktop = () => {
  return (
    <Box className="relative w-full max-w-[280px] sm:max-w-sm aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl group mx-auto">
      <div className="absolute inset-0 bg-brand-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
      <img
        src="/images/gabriel1.png"
        alt="Gabriel Cirqueira"
        className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
      />

      <Box className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />

      <Box
        className="
          absolute bottom-6 left-6 right-6 p-4
          rounded-xl border border-white/10
          bg-white/5 backdrop-blur-md z-20
          hover:bg-white/10 transition-colors duration-300
        "
      >
        <HStack className="justify-between items-center">
          <VStack className="gap-0.5">
            <Text className="text-xs text-brand-400 font-mono uppercase tracking-wider mb-1">
              Fullstack Dev
            </Text>
            <Text className="text-xl font-bold text-white font-heading uppercase">
              Gabriel Cirqueira
            </Text>
          </VStack>
          <Box className="p-2.5 bg-brand-500 text-black rounded-lg shadow-[0_0_15px_var(--tw-shadow-color)] shadow-brand-500/50">
            <Icon icon={FileCode} className="h-5 w-5" />
          </Box>
        </HStack>
      </Box>
    </Box>
  )
}
