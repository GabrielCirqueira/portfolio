import { AlertTriangle, Home, RefreshCcw } from 'lucide-react'
import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from '@/shadcn/components/ui/button'
import { Box, Center, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false })
    window.location.href = '/'
  }

  private handleReload = () => {
    this.setState({ hasError: false })
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Center className="min-h-screen bg-black p-6">
          <Box className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--color-brand-500-rgb),0.1),transparent_70%)] pointer-events-none" />

          <VStack className="items-center text-center gap-8 max-w-md relative z-10">
            <Box className="p-6 rounded-full bg-brand-500/10 border border-brand-500/20 shadow-brand-glow-lg">
              <AlertTriangle className="w-16 h-16 text-brand-500" />
            </Box>

            <VStack className="gap-3">
              <Title as="h1" className="text-3xl font-black uppercase tracking-tighter text-white">
                Ops! Algo deu errado.
              </Title>
              <Text className="text-zinc-500 text-sm leading-relaxed">
                Ocorreu um erro inesperado na aplicação. Não se preocupe, isso foi reportado e
                estamos trabalhando nisso.
              </Text>
            </VStack>

            <Box className="w-full h-px bg-zinc-900" />

            <VStack className="w-full gap-3">
              <Button
                onClick={this.handleReload}
                className="w-full bg-brand-500 hover:bg-brand-400 text-black font-black uppercase tracking-widest gap-2 py-6"
              >
                <RefreshCcw className="w-4 h-4" />
                Tentar Novamente
              </Button>

              <Button
                variant="outline"
                onClick={this.handleReset}
                className="w-full border-zinc-800 text-zinc-400 hover:bg-zinc-900 font-bold uppercase tracking-widest gap-2 py-6"
              >
                <Home className="w-4 h-4" />
                Voltar ao Início
              </Button>
            </VStack>

            {import.meta.env.DEV && this.state.error && (
              <Box className="mt-8 p-4 bg-zinc-950 border border-red-900/40 rounded-lg text-left overflow-auto max-h-48 w-full">
                <Text className="font-mono text-[10px] text-red-500 break-all">
                  {this.state.error.toString()}
                </Text>
              </Box>
            )}
          </VStack>
        </Center>
      )
    }

    return this.props.children
  }
}
