import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, User, UserCircle, Banknote, NewspaperIcon,} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'User',
        href: '/admin/user',
        icon: User,
    },
    {
        title: 'Siswa',
        href: '/admin/siswa',
        icon: User,
    },
    {
        title: 'Guru',
        href: '/admin/guru',
        icon: User,
    },
    {
        title: 'Galeri',
        href: '/admin/galeri',
        icon: UserCircle,
    },
    {
        title: 'Berita',
        href: '/admin/berita',
        icon: NewspaperIcon,
    },
    {
        title: 'Ekstrakurikuler',
        href: '/admin/ekstrakurikuler',
        icon: User,
    },
    {
        title: 'Profil sekolah',
        href: '/admin/kas/profil-sekolah',
        icon: Banknote,
    },

];

const footerNavItems: NavItem[] = [
    
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
