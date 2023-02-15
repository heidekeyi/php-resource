const routeRoutes = {
    timeRecord: {
        path: '/time/record',
        caption: 'Record',
    },
    timeCategory: {
        path: '/time/category',
        caption: 'Category',
    },
    timeCalibration: {
        path: '/time/calibration',
        caption: 'Calibration',
    },
    timeAmount: {
        path: '/time/amount',
        caption: 'Amount'
    },
    timePercent: {
        path: '/time/percent',
        caption: 'Percent'
    },
    billRecord: {
        path: '/bill/record',
        caption: 'Record',
    },
    billCategory: {
        path: '/bill/category',
        caption: 'Category',
    },
    billAmount: {
        path: '/bill/amount',
        caption: 'Amount'
    },
    billAssets: {
        path: '/bill/assets',
        caption: 'Assets'
    },
    sportRecord: {
        path: '/sport/record',
        caption: 'Record',
    },
    sportCategory: {
        path: '/sport/category',
        caption: 'Category',
    },
    sportCalibration: {
        path: '/sport/calibration',
        caption: 'Calibration'
    },
    sportAmount: {
        path: '/sport/amount',
        caption: 'Amount'
    },
    sportTrace: {
        path: '/sport/trace',
        caption: 'Trace',
    },
    unit: {
        path: '/unit',
        caption: 'Unit',
    },
    name: {
        path: '/name',
        caption: 'Name',
    },
    uri: (): string => {
        const {pathname, search} = window.location;
        return `${pathname}${search}`;
    }
};

export default routeRoutes;