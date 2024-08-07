import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Topic from '../../../../components/Topic'
import useGetTopChartData from './hooks/useGetTopChartData'
import { useEffect, useState } from 'react'
import { SUCCEEDED } from '../../../../constants/fetchStatus.constant'
import moment from 'moment'
import { getMillisecondsToRoundedTime } from '../../../../helpers/timer'

const StoryStatus = [
    {
        content: 'Chưa phát hành',
        color: '#808080'
    },
    {
        content: 'Đang cập nhật',
        color: '#008001'
    },
    {
        content: 'Tạm hoãn',
        color: '#B7B704'
    },
    {
        content: 'Đã hoàn thành',
        color: '#0BA5E9'
    },
    {
        content: 'Đã bị ẩn hoặc xoá',
        color: '#FF0000'
    }
]

const _options = {
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
        series: {
            marker: {
                enabled: true,
                states: {
                    hover: {
                        enabled: true
                    }
                },
                symbol: 'circle'
            },
            cursor: 'pointer',
            point: {
                events: {
                    mouseOver: function () {
                        this.series.chart.xAxis[0].update({
                            crosshair: {
                                color: this.color
                            }
                        })
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
            color: '#4A90E2',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            type: 'spline',
            color: '#FF0000',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            type: 'spline',
            color: '#25BE9C',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    ],
    tooltip: {
        useHTML: true,
        formatter: function () {
            return [].concat(
                this.points ?
                    this.points.map(function (point) {
                        return `
                            <div style="display:flex;justify-content:space-between;width:280px;align-items:center;font-size:1rem">
                                <div style="display:flex;justify-content:space-between;">
                                    <img
                                        style="width:48px;height:48px;flex-shrink:0;object-fit:cover;object-position:center;"
                                        src=${import.meta.env.VITE_STORY_SERVICE_URL + point.series.userOptions.coverImageUrl}
                                        alt="Image" 
                                    />
                                    <div style="flex-grow:1;margin-left:8px;">
                                        <div style="font-weight:700;">${point.series.name}</div>
                                        <div style="font-size:0.7rem;margin-top:4px;"><span style="background-color:${StoryStatus[point.series.userOptions.status].color};color:white;padding:4px;border-radius:2px;">${StoryStatus[point.series.userOptions.status].content}</span></div>
                                    </div>
                                </div>
                                
                                <div style="font-weight:700;font-size:1.05rem;color:${point.series.color};">${point.y}%</div>
                            </div>
                        `
                    }) : []
            ).join('<br/>')
        },
        split: false,
        shared: true,
        outside: true
    }
}

function Chart() {
    const [queries, setQueries] = useState(undefined)
    const { data, status, setSubmit } = useGetTopChartData(queries)
    const [options, setOptions] = useState(_options)

    function categoriesGenerator(endTime) {
        endTime -= 3600000
        const result = ['']

        for (let i = 0; i < 12; ++i) {
            result.unshift('')
            result.unshift(moment(endTime).format('HH:mm'))
            endTime -= 3600000 * 2
        }
        return result
    }

    useEffect(() => {
        if (queries === undefined) {
            const now = getMillisecondsToRoundedTime()
            setQueries({
                from: now - 3600000 * 23,
                to: now,
                step: 3600000
            })
        } else {
            const intervalId = setInterval(() => {
                const now = getMillisecondsToRoundedTime()
                setQueries({
                    from: now - 3600000 * 23,
                    to: now,
                    step: 3600000
                })
            }, 3600000)

            return () => {
                clearInterval(intervalId)
            }
        }
    }, [])

    useEffect(() => {
        if (queries !== undefined) {
            setSubmit(true)
        }
    }, [queries])

    useEffect(() => {
        if (status === SUCCEEDED) {
            if (data.data) {
                setOptions({
                    ...Object.assign({}, options),
                    series: [
                        {
                            type: 'spline',
                            name: data.data[0].title,
                            status: data.data[0].status,
                            coverImageUrl: data.data[0].coverImageUrl,
                            color: '#4A90E2',
                            data: data.data[0].data,
                        },
                        {
                            type: 'spline',
                            color: '#25BE9C',
                            name: data.data[1].title,
                            status: data.data[1].status,
                            coverImageUrl: data.data[1].coverImageUrl,
                            data: data.data[1].data,
                        },
                        {
                            type: 'spline',
                            color: '#FF0000',
                            name: data.data[2].title,
                            status: data.data[2].status,
                            coverImageUrl: data.data[2].coverImageUrl,
                            data: data.data[2].data,
                        }
                    ],
                    xAxis: {
                        ...Object.assign({}, options.xAxis),
                        categories: categoriesGenerator(queries.to)
                    }
                })
            }
        }
    }, [status])

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

        </Topic>
    )
}

export default Chart