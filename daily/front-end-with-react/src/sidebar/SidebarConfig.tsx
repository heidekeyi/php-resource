import css from './SidebarConfig.module.css';
import routeRoutes from "../route/routeRoutes";

const SidebarConfig = [
    {
        icon: css.clock,
        caption: 'Time',
        path: '',
        list: [
            {...routeRoutes.timeRecord},
            {...routeRoutes.timeCategory},
            {...routeRoutes.timeCalibration},
            {...routeRoutes.timeAmount},
            {...routeRoutes.timePercent},
        ]
    },
    {
        icon: css.bill,
        caption: 'Bill',
        path: '',
        list: [
            {...routeRoutes.billRecord},
            {...routeRoutes.billCategory},
            {...routeRoutes.billAmount},
            {...routeRoutes.billAssets},
        ]
    },
    {
        icon: css.sport,
        caption: 'Sport',
        path: '',
        list: [
            {...routeRoutes.sportRecord},
            {...routeRoutes.sportCategory},
            {...routeRoutes.sportCalibration},
            {...routeRoutes.sportAmount},
            {...routeRoutes.sportTrace},
        ]
    },
    {
        icon: css.unit,
        list: [],
        ...routeRoutes.unit
    },
    {
        icon: css.collect,
        list: [],
        ...routeRoutes.name
    },
];

export type ISidebarItem = typeof SidebarConfig[0];

export default SidebarConfig;