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
        /** @type {HTMLCanvasElement} */ 
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        drawGrid(ctx)
        drawAxis(ctx)
    })
    function drawGrid(ctx) {
        ctx.beginPath()
        const step = 10
        let yLineTotal = Math.floor(ctx.canvas.width / step)
        let wLineTotal = Math.floor(ctx.canvas.height / step)
        while(yLineTotal >= 0) {
            ctx.moveTo(yLineTotal * step + 0.5, 0)
            ctx.lineTo(yLineTotal * step + 0.5, ctx.canvas.height)
            ctx.strokeStyle = '#eee'
            ctx.stroke()
            yLineTotal --
        }
        while(wLineTotal >= 0) {
            ctx.moveTo(0, wLineTotal * step + 0.5)
            ctx.lineTo(ctx.canvas.width, wLineTotal * step + 0.5)
            ctx.strokeStyle = '#eee'
            ctx.stroke()
            wLineTotal --
        }
    }
    function drawAxis(ctx) {
        // 原点坐标
        const x0 = 20
        const y0 = ctx.canvas.height - 20
        // x轴箭头坐标
        const xx = ctx.canvas.width - 20
        const xy = y0
        // y轴箭头坐标
        const yx = x0
        const yy = 20
        ctx.strokeStyle = '#000'
        // x轴轴线
        ctx.beginPath()
        ctx.moveTo(x0, y0)
        ctx.lineTo(xx, y0)
        // x轴箭头
        ctx.moveTo(xx, xy)
        ctx.lineTo(xx - 8, xy - 4)
        ctx.moveTo(xx, xy)
        ctx.lineTo(xx - 8, xy + 4)
        ctx.lineTo(xx - 8, xy - 4)
        ctx.fill()
        ctx.stroke()
        // y轴轴线
        ctx.beginPath()
        ctx.moveTo(x0, y0)
        ctx.lineTo(x0, yy)
        // y轴箭头
        ctx.moveTo(yx, yy)
        ctx.lineTo(yx - 4, yy + 8)
        ctx.moveTo(yx, yy)
        ctx.lineTo(yx + 4, yy + 8)
        ctx.lineTo(yx - 4, yy + 8)
        ctx.fill()
        ctx.stroke()
        // 每个点的间距
        const pointW = (xx - 5) / (data.length + 1)
        ctx.beginPath()
        ctx.strokeStyle = 'pink'
        data.forEach((item, index, arr) => {
            const {value, title} = item
            const pointX = x0 + (index + 1) *pointW
            const pointY = y0 * value
            ctx.lineTo(pointX, pointY)
        })
        ctx.stroke()
    }
    return <canvas ref={canvasRef} width='200' height='200'>你的浏览器版本过低，不支持canvas</canvas>
}