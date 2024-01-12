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
            id: 'user',
            title: 'Người dùng',
            type: 'item',
            url: '/user',
            icon: icons.IconUserCircle,
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
