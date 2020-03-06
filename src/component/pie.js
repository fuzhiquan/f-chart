import React, { useRef, useEffect } from 'react'

export default function(props) {
    const pieRef = useRef()

    const data = [
        {
            value: 9,
            title: 'java'
        },
        {
            value: 15,
            title: 'javascript'
        },
        {
            value: 20,
            title: 'node'
        },
        {
            value: 12,
            title: '.net'
        }
    ]
    function getRandomColor() {
        const r = Math.floor((Math.random() * 255))
        const g = Math.floor((Math.random() * 255))
        const b = Math.floor((Math.random() * 255))

        return `rgb(${r},${g},${b})`
    }
    useEffect(() => {
        const ctx = pieRef.current.getContext('2d')
        const r = Math.min(ctx.canvas.width, ctx.canvas.height) / 3
        // 圆心坐标
        const x0 = ctx.canvas.width / 2
        const y0 = ctx.canvas.height / 2
        // 伸出线的长度
        const outLine = 10

        drawPic(ctx,x0,y0,r,outLine)
    })
    function drawPic(ctx,x0,y0,r,outLine) {
        const total = data.reduce((pre, next) => {return pre + next['value']}, 0)
        let startAngle = 1.5 * Math.PI
        data.forEach((item, index) => {
            const currentAngle = 2 * Math.PI * (item['value'] / total)
            const endAngle = startAngle + currentAngle

            ctx.beginPath()
            ctx.moveTo(x0, y0)
            ctx.arc(x0, y0, r, startAngle, endAngle)
            const color = getRandomColor()
            ctx.fillStyle = color
            ctx.fill()
            drawLine(ctx,x0,y0,r,startAngle + currentAngle/2,outLine,color,item['title'])
            startAngle = endAngle
        })
    }
    function drawLine(ctx,x0,y0,r,angle,outLine,color,text) {
        ctx.beginPath()
        ctx.moveTo(x0, y0)
        const x = x0 + Math.cos(angle) * (r + outLine)
        const y = y0 + Math.sin(angle) * (r + outLine)
        ctx.lineTo(x, y)
        const textWidth = ctx.measureText(text).width
        let textAlign = 'start'
        if(x > x0) {
            ctx.lineTo(x + textWidth, y)
        }else{
            textAlign = 'end'
            ctx.lineTo(x - textWidth, y)
        }
        ctx.strokeStyle = color
        ctx.stroke()
        drawText(ctx,text,x,y,textAlign)
    }
    function drawText(ctx,text,x,y,textAlign) {
        ctx.beginPath()
        ctx.textBaseline = 'bottom'
        ctx.textAlign = textAlign
        ctx.fillText(text,x,y)
    }
    function drawLegend() {}
    return <canvas ref={pieRef} width='200' height='200'>你的浏览器版本过低，不支持canvas</canvas>
}