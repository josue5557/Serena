'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bot,
  BookHeart,
  HeartPulse,
  LayoutDashboard,
  Wind,
} from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from './ui/button'; // Puede que ya no necesites importarlo si no lo usas aquí
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/relaxation', label: 'Relaxation', icon: HeartPulse },
  { href: '/breathing', label: 'Breathing', icon: Wind },
  { href: '/journal', label: 'Journal', icon: BookHeart },
  { href: '/chat', label: 'Companion', icon: Bot },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              {/* ¡Aquí está el cambio clave! Quitamos el Button. */}
              <img
                src="https://storage.googleapis.com/serena-storage/Serena.PNG"
                alt="Serena Logo"
                className="w-32 h-32 object-contain" // Puedes ajustar el tamaño aquí
              />
              <div className="flex flex-col">
                {/* Puedes poner un texto aquí si quieres, o dejarlo vacío si solo es el logo */}
                <span className="font-bold text-lg tracking-tight"></span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://placehold.co/100x100.png" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">User</span>
                <span className="text-xs text-muted-foreground">user@email.com</span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
            <header className="sticky top-0 z-10 flex items-center justify-between h-14 px-4 border-b bg-background/80 backdrop-blur-sm md:px-6">
                <div className="md:hidden">
                    <SidebarTrigger />
                </div>
                <div className="flex-1">
                    {/* Could add breadcrumbs or page title here */}
                </div>
            </header>
            <main className="p-4 md:p-6 lg:p-8 flex-1">
                {children}
            </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}