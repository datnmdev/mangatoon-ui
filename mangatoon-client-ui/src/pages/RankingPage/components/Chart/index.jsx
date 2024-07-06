import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Topic from '../../../../components/Topic'
import TopWeekList from './components/TopWeekList'

function Chart() {
    const options = {
        chart: {
            type: 'line',
            backgroundColor: 'transparent'
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: null
            },
            labels: {
                format: '{value:HH:mm}',
                style: {
                    color: '#888'
                }
            },
            categories: [
                '14:00', '', '16:00', '', '18:00', '', '20:00', '', '22:00', '', '00:00', '', '02:00', '', '04:00', '', '06:00', '',
                '08:00', '', '10:00', '', '12:00', ''
            ],
            tickPosition: 'outside',
            crosshair: {
                width: 1
            }
        },
        yAxis: {
            visible: true,
            title: {
                text: null
            },
            labels: {
                enabled: false
            },
            gridLineColor: '#463F4F',
            gridLineWidth: 0.4,
            gridLineDashStyle: 'longdash'
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true,
                    formatter: function (point) {
                        return point.y + '%'
                    },
                    style: {
                        color: '#333'
                    }
                }
            },
            series: {
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                },
                cursor: 'pointer',
                point: {
                    events: {
                        mouseOver: function () {
                            this.series.chart.xAxis[0].update({
                                crosshair: {
                                    color: this.color
                                }
                            });
                        }
                    }
                }
            }
        },
        legend: {
            enabled: false
        },
        series: [
            {
                type: 'spline',
                color: '#FF0000',
                data: [1, 2, 3, 4, 2, 3, 4, 5, 2, 3, 3, 4, 4, 5, 7, 8, 5, 6, 9, 10, 4, 5, 6, 7]
            },
            {
                type: 'spline',
                color: '#4A90E2',
                data: [2, 3, 4, 5, 6, 7, 2, 3, 7, 8, 2, 3, 1, 2, 12, 13, 3, 4, 7, 8, 2, 3, 1, 2]
            },
            {
                type: 'spline',
                color: '#25BE9C',
                data: [3, 4, 2, 3, 12, 13, 1, 2, 3, 4, 6, 7, 9, 10, 1, 2, 3, 4, 1, 2, 6, 7, 3, 4]
            }
        ]
    }

    return (
        <Topic
            name={(
                <h3 className='inline-block text-[28px] font-[700] font-sans text-transparent [background-image:radial-gradient(50%_124.93%_at_95.86%_-10%,#3efad9_0,hsla(0,0%,100%,0)_100%),linear-gradient(91.56deg,#ff9357_1.54%,#9100ff_98.71%)] bg-clip-text'>
                    #MangatoonChart
                </h3>
            )}
        >
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={'chart'}
                options={options}
            />

            <TopWeekList />
        </Topic>
    )
}

export default Chart