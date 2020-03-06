import React, { useRef, useEffect } from 'react'

const data = [
    { value: .3, title: 'javascript'},
    { value: .6, title: 'nodejs',},
    { value: .4, title: 'webpack'},
    { value: .7, title: 'canvas'},
]
export default function(props) {
    const canvasRef = useRef()

    useEffect(() => {
        const canvas = canvasRef.current
        const canvasW = canvas.width
        const canvasH = canvas.height
        // 原点坐标
        const x0 = 20
        const y0 = canvasH - 20
        // x轴箭头坐标
        const xx = canvasW - 20
        const xy = y0
        // y轴箭头坐标
        const yx = x0
        const yy = 20
        const ctx = canvas.getContext('2d')
        // x轴轴线
        ctx.beginPath()
        ctx.moveTo(x0, y0)
        ctx.lineTo(xx, y0)
        // x轴箭头
        ctx.moveTo(xx, xy)
        ctx.lineTo(xx - 10, xy - 10)
        ctx.moveTo(xx, xy)
        ctx.lineTo(xx - 10, xy + 10)
        ctx.stroke()
        // y轴轴线
        ctx.beginPath()
        ctx.moveTo(x0, y0)
        ctx.lineTo(x0, yy)
        // y轴箭头
        ctx.moveTo(yx, yy)
        ctx.lineTo(yx - 10, yy + 10)
        ctx.moveTo(yx, yy)
        ctx.lineTo(yx + 10, yy + 10)
        ctx.stroke()
        // 每个点的间距
        const pointW = (xx - 5) / (data.length + 1)
        ctx.beginPath()
        ctx.strokeStyle = 'red'
        data.forEach((item, index, arr) => {
            const {value, title} = item
            const pointX = x0 + (index + 1) *pointW
            const pointY = y0 * value
            ctx.lineTo(pointX, pointY)
        })
        ctx.stroke()
        
    })

    return <canvas ref={canvasRef} width='200' height='200'>你的浏览器版本过低，不支持canvas</canvas>
}