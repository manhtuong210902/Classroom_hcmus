// assets
/* eslint-disable */
import { IconBrandChrome, IconHelp, IconUserCircle, IconPackage, IconPrompt, IconMailbox, IconDiscountCheck, IconSchool, IconBallpen, IconBrandBlogger, IconSchoolBell, IconMessageCircle2, IconBrandBlender } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp, IconUserCircle, IconPackage, IconPrompt, IconMailbox, IconDiscountCheck, IconSchool, IconBallpen, IconBrandBlogger, IconSchoolBell, IconMessageCircle2, IconBrandBlender };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'duyet-gia-su',
            title: 'Duyệt gia sư',
            type: 'item',
            url: '/duyet-gia-su',
            icon: icons.IconSchool,
            breadcrumbs: false
        },
        {
            id: 'duyet-lop',
            title: 'Duyệt lớp',
            type: 'item',
            url: '/duyet-lop',
            icon: icons.IconBallpen,
            breadcrumbs: false
        },
        {
            id: 'class',
            title: 'Lớp học',
            type: 'item',
            url: '/class',
            icon: icons.IconSchoolBell,
            breadcrumbs: false
        }
    ]
};

export default other;
