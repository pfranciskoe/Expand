import React from "react";
import "../../../stylesheets/lesson.css"

class CommentHeatmap extends React.Component {
    constructor(props) {
        super(props);
        console.log(this)
    }
    componentDidMount() {
        this.setupAndDraw(this.props.lesson.comments,this.props.vidLength)
    }

    setupAndDraw(comments,vidLength) {
        const heatMap = document.getElementById('canvas')
        const ctx = heatMap.getContext("2d")
        this.draw(ctx,comments,vidLength)
    }
    draw(ctx, comments, vidLength) {
        
        comments.forEach((comment)=>{
            const timeRound = comment.timestamp / vidLength
            console.log(timeRound)
            ctx.beginPath()
            ctx.fillStyle = "#2B3972"
            ctx.arc((2000 * timeRound), 25 ,15,0, 2*Math.PI,false)
            ctx.fill()
        })
    }


    render() {
        return (
            <div className='comment-heatmap'>
                <canvas id="canvas" height='50' width='2000' className='heatmap-canvas'>

                </canvas>
            </div>
        )
    }
}

export default CommentHeatmap