import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutGrid,
    User,
    Users,
    Banknote,
    Newspaper,
    BookOpen,
    School,
    GalleryVerticalEnd,
    UserCircle,
    LibrarySquare,
    MessageCircle
} from 'lucide-react';
import AppLogo from './app-logo';

const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'User',
        href: '/admin/user',
        icon: Users,
    },
    {
        title: 'Siswa',
        href: '/admin/siswa',
        icon: User,
    },
    {
        title: 'Guru',
        href: '/admin/guru',
        icon: School,
    },
    {
        title: 'Mata pelajaran',
        href: '/admin/mapel',
        icon: LibrarySquare,
    },
    {
        title: 'Galeri',
        href: '/admin/galeri',
        icon: GalleryVerticalEnd,
    },
    {
        title: 'Berita',
        href: '/admin/berita',
        icon: Newspaper,
    },
    {
        title: 'Ekstrakurikuler',
        href: '/admin/ekstrakulikuler',
        icon: BookOpen,
    },
    {
        title: 'Profil sekolah',
        href: '/admin/profil-sekolah',
        icon: UserCircle,
    },
    {
        title: 'Pesan dari anonim',
        href: '/admin/fax',
        icon: MessageCircle,
    },
];

const operatorNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Siswa',
        href: '/operator/siswa',
        icon: User,
    },
    {
        title: 'Guru',
        href: '/operator/guru',
        icon: School,
    },
    {
        title: 'Mata pelajaran',
        href: '/operator/mapel',
        icon: LibrarySquare,
    },
    {
        title: 'Galeri',
        href: '/operator/galeri',
        icon: GalleryVerticalEnd,
    },
    {
        title: 'Berita',
        href: '/operator/berita',
        icon: Newspaper,
    },
    {
        title: 'Ekstrakurikuler',
        href: '/operator/ekstrakulikuler',
        icon: BookOpen,
    },
    {
        title: 'Profil sekolah',
        href: '/operator/profil-sekolah',
        icon: Banknote,
    },
];

const footerNavItems: NavItem[] = [];

interface User {
    id: number;
    name: string;
    username: string;
    role: string;
}

interface PageProps {
    auth: {
        user: User;
    };
}

export function AppSidebar() {
    const { props } = usePage<PageProps>();
    const { user } = props.auth;

    const getNavItems = (): NavItem[] => {
        if (user.role === 'admin') {
            return adminNavItems;
        } else if (user.role === 'operator') {
            return operatorNavItems;
        }

        return operatorNavItems;
    };

    const mainNavItems = getNavItems();

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
