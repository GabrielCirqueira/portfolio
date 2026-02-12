import { FileCode } from 'lucide-react'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text } from '@/shadcn/components/ui/typography'

export const ProfileCardMobile = () => {
  return (
    <Box className="relative w-full max-w-[280px] aspect-square rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl mx-auto">
      <img
        src="/images/gabriel1.png"
        alt="Gabriel Cirqueira"
        className="object-cover w-full h-full opacity-90"
      />

      <Box className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />

      <Box className="absolute bottom-4 left-4 right-4 z-20">
        <Box
          className="
            p-3 rounded-xl border border-white/10
            bg-white/5 backdrop-blur-md
          "
        >
          <HStack className="justify-between items-center">
            <VStack className="gap-0.5">
              <Text className="text-[10px] text-brand-400 font-mono uppercase tracking-wider">
                Fullstack Dev
              </Text>
              <Text className="text-lg font-bold text-white font-heading uppercase">
                Gabriel Cirqueira
              </Text>
            </VStack>
            <Box className="p-2 bg-brand-500 text-black rounded-lg shadow-lg shadow-brand-500/30">
              <Icon icon={FileCode} className="h-4 w-4" />
            </Box>
          </HStack>
        </Box>
      </Box>
    </Box>
  )
}
