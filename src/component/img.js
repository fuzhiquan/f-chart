import React, { useRef, useEffect } from 'react'
import b from '../assets/boy.jpg'
import g from '../assets/girl.jpg'

// 步伐
const stepSize = 10
let stepX = 0
let stepY = 0
// 行走的方向，图片小人的纵坐标，0 down, 1 left, 2 right, 3 up
let direction = 0
// 走第几步，0 ～ 3循环，图片一种动作的个数
let index = 0
let img = undefined
let x0 = 0
let y0 = 0

export default function(props) {
    const canvasRef = useRef()

    useEffect(() => {
        /** @type {HTMLCanvasElement} */ 
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        // 画布中心
        x0 = canvas.width / 2
        y0 = canvas.height / 2
        // 监听上下左右，38 40 37 39
        document.onkeyup = function(e) {
            if(index > 3) {
                index = 0
            }
            switch(e.keyCode) {
                case 40:
                    direction = 0
                    index++
                    stepY ++
                    drawKiddy(ctx)
                    break
                case 37:
                    direction = 1
                    index++
                    stepX --
                    drawKiddy(ctx)
                    break
                case 39:
                    direction = 2
                    index++
                    stepX ++
                    drawKiddy(ctx)
                    break
                case 38:
                    direction = 3
                    index++
                    stepY --
                    drawKiddy(ctx)
                    break
                default:
                    direction = 0
            }
        }
        drawKiddyInit(ctx,x0,y0)
    })

    function drawKiddyInit(ctx,x0,y0) {
        // 初始化，将图片渲染在画布中间
        const i = new Image()
        i.src = b
        i.onload = function() {
            img = i
            drawKiddy(ctx)
        }
    }
    function drawKiddy(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        const w = img.width / 4
        const h = img.height / 4
        ctx.beginPath()
        ctx.drawImage(img,index*w,direction*h,w,h,x0-w/2+stepX*stepSize,y0-h/2+stepY*stepSize,w,h)

        if(index >= 3) index = 0
    }

    return <canvas ref={canvasRef} width='200' height='200'>你的浏览器版本过低，不支持canvas</canvas>
}