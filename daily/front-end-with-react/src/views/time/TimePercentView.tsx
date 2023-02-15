import React from 'react';
import TimePercentNavigation from "./TimePercentNavigation";
import TimePercentQuery from "./TimePercentQuery";
import ViewLayout from "../components/ViewLayout";
import {useAppSelect} from "../../store/hooks";
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const secondSum = (list: IObject[]) => {
    let sum = 0;
    list.forEach(it => {
        const {amount} = it;
        sum += +amount;
    });
    return sum;
}

const initData = (list: IObject[]) => {
    const sum = secondSum(list);
    let value: number = 0;
    const limit = 0.618;
    const data = list
        .map(item => {
            const {name, amount} = item;
            const y = (+amount) * 100;
            return {name, y};
        })
        .sort((a, b) => b.y - a.y)
        .map((it, ix) => {
            const y = it.y / sum;
            if (y < limit) {
                value += it.y;
            }
            const name = it.name;
            return !ix ? {sliced: true, selected: true, y, name} : {y, name};
        })
        .filter(it => it.y >= limit);
    value /= sum;
    if (value > 0) {
        data.push({name: '(...)', y: value});
    }
    return data;
};

const TimePercentView = () => {
    const sidebarMode = useAppSelect(state => state.sidebarMode);
    const list = useAppSelect(state => state.timePercent.list);
    const title = list.length > 0 ? `(${(secondSum(list) / 3600).toFixed(2)}h)` : '';
    const options: Highcharts.Options = {
        title: {
            text: `Time Percent ${title}`,
            style: {
                fontSize: '24px',
                color: '#8f9f09',
                fontFamily: 'Microsoft YaHei'
            }
        },
        chart: {
            height: '690px',
        },
        series: [{
            name: 'percent',
            type: 'pie',
            data: initData(list),
        }],
        credits: {
            enabled: false // 禁用版权信息
        },
        legend: {
            enabled: true,
            itemStyle: {
                fontSize: '16px',
                fontFamily: 'Microsoft YaHei',
                color: '#8f9f09',
            }
        },
        tooltip: {
            borderRadius: 6,
            borderWidth: 2,
            backgroundColor: '#FCFFC5',
            formatter: function () {
                const {y, key, color} = this;
                const value = (y ? +y : 0).toFixed(2);
                return `<div style="color: ${color}">\u25cf ${key} ${value}%<div/>`
            },
            style: {
                fontSize: '16px',
                fontFamily: 'Microsoft YaHei',
                color: '#8f9f09',
            },
            useHTML: true,
            padding: 9,
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: '16px',
                        fontFamily: 'Microsoft YaHei',
                        color: '#8f9f09',
                    },
                    format: '<b>{point.name}</b>: {point.percentage:.2f} %',
                },
                showInLegend: true,
                borderWidth: 1,
                color: '#8f9f09',
            }
        },
    }
    return (<React.Fragment>
        <ViewLayout sidebarMode={sidebarMode}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </ViewLayout>
        <TimePercentNavigation sidebarMode={sidebarMode}/>
        <TimePercentQuery/>
    </React.Fragment>);
};

export default TimePercentView;