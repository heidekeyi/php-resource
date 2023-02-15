import React from 'react';
import BillAssetsNavigation from "./BillAssetsNavigation";
import BillAssetsQuery from "./BillAssetsQuery";
import ViewLayout from "../components/ViewLayout";
import {useAppSelect} from "../../store/hooks";
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import UtilTimeFormat from "../../utils/UtilTimeFormat";
import UtilQuery from "../../utils/UtilQuery";


const initData = (list: IObject[]) => list.map(it => {
    const {id, amount} = it;
    const value = (+id - +UtilQuery.timezone()) * 1000;
    return [value, +amount];
});

const BillAssetsView = () => {
    const sidebarMode = useAppSelect(state => state.sidebarMode);
    const list = useAppSelect(state => state.billAssets.list);
    const options: Highcharts.Options = {
        title: {
            text: 'Bill Assets',
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
            name: 'amount',
            type: 'line',
            data: initData(list)
        }],
        credits: {
            enabled: false // 禁用版权信息
        },
        tooltip: {
            borderRadius: 6,
            borderWidth: 2,
            backgroundColor: '#FCFFC5',
            formatter: function () {
                const {x, y, color} = this;
                const xValue: number = (x ? +x : 0) + +UtilQuery.timezone() * 1000;
                const yValue = `${((+(y ? y : '0')) / 100).toFixed(2)}`;
                const date = `date: ${new UtilTimeFormat(xValue, true).dateTime()}`;
                const assets = `<p style="padding-top: 4px; color: ${color}">\u25cf ${this.series.name}:${yValue}<p/>`;
                return `<div>${date}${assets}<div/>`
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
                millisecond: "%A, %b %e, %H:%M:%S.%L",
                second: "%A, %b %e, %H:%M:%S",
                minute: "%A, %b %e, %H:%M",
                hour: "%A, %b %e, %H:%M",
                day: "%A, %b %e, %Y",
                week: "Week from %A, %b %e, %Y",
                month: "%B %Y",
                year: "%Y"
            },
        },
        yAxis: {
            labels: {
                style: {
                    fontSize: '16px',
                    fontFamily: 'Microsoft YaHei',
                    color: '#8f9f09',
                },
                formatter: function () {
                    const value = this.value;
                    const val = value ? +value : '0';
                    return (+val / 100).toFixed(2);
                }
            },
            title: {
                text: 'date assets',
                style: {
                    fontSize: '16px',
                    fontFamily: 'Microsoft YaHei',
                    color: '#8f9f09',
                }
            }
        },
        legend: {
            enabled :false
        }
    }

    return (<React.Fragment>
        <ViewLayout sidebarMode={sidebarMode}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </ViewLayout>
        <BillAssetsNavigation sidebarMode={sidebarMode}/>
        <BillAssetsQuery/>
    </React.Fragment>);
};

export default BillAssetsView;