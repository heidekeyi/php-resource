import React from 'react';
import SportTraceNavigation from "./SportTraceNavigation";
import SportTraceQuery from "./SportTraceQuery";
import ViewLayout from "../components/ViewLayout";
import {useAppSelect} from "../../store/hooks";
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import UtilTimeFormat from "../../utils/UtilTimeFormat";
import UtilQuery from "../../utils/UtilQuery";


interface ICategoryMap {
    [index: string]: {
        categoryId: string;
        categoryName: string;
    };
}

interface IDateMap {
    [date: string]: {
        [cId: string]: {
            categoryId: string;
            categoryName: string;
            amount: string;
        };
    };
}

interface ISeriesMap {
    [cId: string]: {
        type: 'line',
        name: string;
        data: [number, number][];
    }
}

const initSeries = (list: IObject[]) => {
    const categoryMap: ICategoryMap = {};
    const dateMap: IDateMap = {};
    const seriesMap: ISeriesMap = {};
    list.forEach(item => {
        const {categoryId, categoryName, date, amount} = item;
        categoryMap[categoryId] = {categoryId, categoryName};
        const tmp = dateMap[date] || {};
        tmp[categoryId] = {categoryId, categoryName, amount};
        dateMap[date] = tmp;
    });
    const categories = Object.keys(categoryMap);
    categories.forEach(cId => {
        seriesMap[cId] = {
            name: categoryMap[cId].categoryName,
            data: [],
            type: 'line'
        };
    });
    Object.keys(dateMap).forEach(date => {
        const res = dateMap[date];
        const x: number = (+date - +UtilQuery.timezone()) * 1000;
        categories.forEach(cId => {
            const y: number = res[cId] ? +res[cId].amount : 0;
            seriesMap[cId].data.push([x, y]);
        });
    });
    return categories.map(cId => seriesMap[cId]);
};

const SportTraceView = () => {
    const sidebarMode = useAppSelect(state => state.sidebarMode);
    const list = useAppSelect(state => state.sportTrace.list);
    const options: Highcharts.Options = {
        title: {
            text: 'Sport Trace',
            style: {
                fontSize: '24px',
                color: '#8f9f09',
                fontFamily: 'Microsoft YaHei'
            }
        },
        chart: {
            height: '690px',
        },
        series: initSeries(list),
        credits: {
            enabled: false // 禁用版权信息
        },
        tooltip: {
            borderRadius: 6,
            borderWidth: 2,
            backgroundColor: '#FCFFC5',
            formatter: function () {
                const {x, y, color} = this;
                const value: number = (x ? +x : 0) + +UtilQuery.timezone() * 1000;
                const date = `date: ${new UtilTimeFormat(value, true).dateTime()}`;
                const amount = `<p style="padding-top: 4px; color: ${color}">\u25cf ${this.series.name}:${y}<p/>`;
                return `<div>${date}${amount}<div/>`
            },
            style: {
                fontSize: '16px',
                fontFamily: 'Microsoft YaHei',
            },
            useHTML: true,
            padding: 9,
        },
        xAxis: {
            type: 'datetime',
            gridLineWidth: 1,
            labels: {
                style: {
                    fontSize: '16px',
                    fontFamily: 'Microsoft YaHei',
                    color: '#8f9f09',
                },
            },
            dateTimeLabelFormats: {
                millisecond:"%A, %b %e, %H:%M:%S.%L",
                second:"%A, %b %e, %H:%M:%S",
                minute:"%A, %b %e, %H:%M",
                hour:"%A, %b %e, %H:%M",
                day:"%A, %b %e, %Y",
                week:"Week from %A, %b %e, %Y",
                month:"%B %Y",
                year:"%Y"
            }
        },
        yAxis: {
            labels: {
                style: {
                    fontSize: '16px',
                    fontFamily: 'Microsoft YaHei',
                    color: '#8f9f09',
                },
            },
            min: -3,
            title: {
                text: 'date count',
                style: {
                    fontSize: '16px',
                    fontFamily: 'Microsoft YaHei',
                    color: '#8f9f09',
                }
            }
        }
    };

    return (<React.Fragment>
        <ViewLayout sidebarMode={sidebarMode}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </ViewLayout>
        <SportTraceNavigation sidebarMode={sidebarMode}/>
        <SportTraceQuery/>
    </React.Fragment>);
};

export default SportTraceView;