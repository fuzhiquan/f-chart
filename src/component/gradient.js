import React, { useRef, useEffect } from 'react'

export default function(Props) {
    const canvasRef = useRef()

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d')

        ctx.lineWidth = 30
        pointLine(ctx)

        ctx.beginPath()
        const linearGradient = gradient(ctx)
        ctx.fillStyle = linearGradient
        ctx.fillRect(10, 120, ctx.canvas.width - 20, 30)

        drawText(' Welcome Leaders to Visit', ctx)
    })
    function drawText(text, ctx) {
        ctx.beginPath()
        ctx.font = '10px "微软雅黑"'
        const { width } = ctx.measureText(text)

        const x0 = ctx.canvas.width / 2 - width / 2
        const y0 = ctx.canvas.height / 2
        ctx.fillText(text, x0, y0)
    }
    function getRandomColor() {
        const r = Math.floor(Math.random() * 255)
        const g = Math.floor(Math.random() * 255)
        const b = Math.floor(Math.random() * 255)

        return `rgb(${r},${g},${b})`
    }
    /**
     * 方案一：通过点画出线
     */
    function pointLine(ctx) {
        ctx.beginPath()

        const stratX = 10
        const stopX = ctx.canvas.width - 10
        for(let i = 0;i < 255; i++) {
            if(stratX + i >= stopX) {
                break
            }
            ctx.beginPath()
            ctx.moveTo(stratX + i - 1, 50)
            ctx.lineTo(stratX + i, 50)
            ctx.strokeStyle = `rgb(${i}, 0, 0)`
            ctx.stroke()
        }
    }
    /**
     * 方案二：通过canvas提供的渐变方案createLinearGradient函数
     * 使用思路：通过指定两个点的坐标来决定渐变的方向和角度
     */
    function gradient(ctx) {
        // 指定两个点的坐标
        const linearGradient = ctx.createLinearGradient(10, 10, 200, 10)
        // 参数number 0-1之间，color 色值
        linearGradient.addColorStop(0, getRandomColor())
        linearGradient.addColorStop(1, getRandomColor())

        return linearGradient
    }
    return <canvas ref={canvasRef} width='200' height='200'>你的浏览器版本过低，不支持canvas</canvas>
}
