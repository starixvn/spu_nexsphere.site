import {
    HomeIcon,
    NewspaperIcon
} from '@heroicons/react/24/outline';

interface SubLink {
    name: string;
    href: string;
}

interface Link {
    name: string;
    href: string;
    icon: React.ElementType;
    subLinks?: SubLink[];
}

const links: Link[] = [
    {
        name: 'Home',
        href: '/',
        icon: HomeIcon,
        subLinks: []
    },
    {
        name: 'Report',
        href: '/report',
        icon: NewspaperIcon,
        //   subLinks: [
        //     { name: 'Daily', href: '/report/daily' },
        //     { name: 'Monthly', href: '/report/monthly' },
        //   ]
    }
];

export default links;