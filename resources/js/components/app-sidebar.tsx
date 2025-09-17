import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, User, ChartColumnStacked, UserCircle, Banknote,} from 'lucide-react';
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
        title: 'Warga',
        href: '/admin/warga',
        icon: User,
    },
    {
        title: 'Petugas',
        href: '/admin/petugas',
        icon: UserCircle,
    },
    {
        title: 'Kategori tagihan',
        href: '/admin/category',
        icon: ChartColumnStacked,
    },
    {
        title: 'Kelola member',
        href: '/admin/member',
        icon: User,
    },
    {
        title: 'Laporan kas',
        href: '/admin/kas/laporan',
        icon: Banknote,
    },
    {
        title: 'Kas Masuk',
        href: '/admin/kas/pemasukan',
        icon: Banknote,
    },
    {
        title: 'Kas Keluar',
        href: '/admin/kas/pengeluaran',
        icon: Banknote,
    }

];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Berita',
    //     href: '',
    //     icon: Newspaper,
    // },
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
