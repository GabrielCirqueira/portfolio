import { navItems } from '@/data/navegacao'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Separator } from '@/shadcn/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/shadcn/components/ui/sheet'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="w-3/4 sm:max-w-xs border-l-zinc-800 bg-black/95 backdrop-blur-xl"
      >
        <SheetHeader className="text-left mb-6">
          <SheetTitle className="flex items-center gap-2 text-xl font-bold font-heading uppercase text-white tracking-wider">
            <span className="text-brand-500 font-mono">&lt;</span>
            Menu
            <span className="text-brand-500 font-mono">/&gt;</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className="w-full justify-start gap-4 h-12 text-base font-medium text-zinc-400 hover:text-brand-400 hover:bg-brand-500/10 transition-all group"
              asChild
              onClick={onClose}
            >
              <a href={item.href} aria-label={`Ir para a seção ${item.name}`}>
                {item.icon && (
                  <Icon
                    icon={item.icon}
                    className="h-5 w-5 group-hover:text-brand-500 transition-colors"
                  />
                )}
                <span className="uppercase tracking-wide">{item.name}</span>
              </a>
            </Button>
          ))}
        </div>

        <Separator className="my-6 bg-zinc-800" />

        <div className="flex flex-col gap-4">
          <Button
            className="w-full gap-2 font-bold tracking-widest uppercase bg-brand-600 hover:bg-brand-500 text-black border-0"
            asChild
            onClick={onClose}
          >
            <a
              href="https://linktr.ee/gabrielCirqueira"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visite meu Linktree"
            >
              Linktree
            </a>
          </Button>

          <div className="mt-auto text-center">
            <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
              © 2026 Gabriel Cirqueira
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
