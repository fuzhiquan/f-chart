import React, {useRef, useEffect} from 'react'
import echarts from 'echarts'

export default function() {
    const containerRef = useRef()

    useEffect(() => {
        const dataList = [
            {name:"南海诸岛", value: 0},
            {name: '北京', value: 115},
            {name: '天津', value: 5},
            {name: '上海', value: 26},
            {name: '重庆', value: 50},
            {name: '河北', value: 7},
            {name: '河南', value: 7},
            {name: '云南', value: 2},
            {name: '辽宁', value: 18},
            {name: '黑龙江', value: 65},
            {name: '湖南', value: 54},
            {name: '安徽', value: 5},
            {name: '山东', value: 127},
            {name: '新疆', value: 1},
            {name: '江苏', value: 29},
            {name: '浙江', value: 60},
            {name: '江西', value: 18},
            {name: '湖北', value: 21214},
            {name: '广西', value: 31},
            {name: '甘肃', value: 30},
            {name: '山西', value: 7},
            {name: '内蒙古', value: 7},
            {name: '陕西', value: 18},
            {name: '吉林', value: 2},
            {name: '福建', value: 11},
            {name: '贵州', value: 29},
            {name: '广东', value: 111},
            {name: '青海', value: 0},
            {name: '西藏', value: 0},
            {name: '四川', value: 888},
            {name: '宁夏', value: 4},
            {name: '海南', value: 4},
            {name: '台湾', value: 32},
            {name: '香港', value: 54},
            {name: '澳门', value: 0}
        ]
        function randomValue() {
            return Math.floor(Math.random() * 50)
        }

        const chart = echarts.init(containerRef.current)
        const option = {
            title: {
                text: '中国疫情分布图',
                subtext: '武汉加油，中国加油!',
                sublink: 'http://www.pm25.in',
                left: 'center',
                textAlign: 'center'
            },
            tooltip : {
                formatter:function(params,ticket,callback){
                    return params.name+'：'+params.value
                }
            },
            visualMap: [
                {
                    type: 'piecewise',
                    pieces: [
                        {min: 1500}, // 不指定 max，表示 max 为无限大（Infinity）。
                        {min: 900, max: 1500},
                        {min: 310, max: 1000},
                        {min: 200, max: 300},
                        {min: 10, max: 200},
                        {min: 1, max: 9},    // 不指定 min，表示 min 为无限大（-Infinity）。
                        {value: 0, color: '#FFF'}
                    ],
                    inRange: {
                        color: ['#FAEBD2', '#E9A189', '#D56356', '#BB3937', '#772526', '#480E10'],
                    }
                }
            ],
            geo: {
                map: 'china',
                roam: false,
                zoom: 1.25,
                label: {
                    normal: {
                        show: true,
                        fontSize: '10',
                        color: 'rgba(0,0,0,0.7)'
                    }
                },
                itemStyle: {
                    normal:{
                        borderColor: 'rgba(0, 0, 0, 0.2)'
                    },
                    emphasis: { // 鼠标悬浮样式
                        areaColor: '#F3B329',
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 20,
                        borderWidth: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },
            series : [
                {
                    name: '感染情况',
                    type: 'map',
                    geoIndex: 0,
                    data: dataList
                }
            ]
        }
        chart.setOption(option)
    })
    return <div ref={containerRef} style={{height:`${window.innerHeight - 8}px`}}></div>
}