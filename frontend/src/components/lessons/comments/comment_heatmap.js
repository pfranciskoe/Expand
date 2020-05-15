import React from "react";
import "../../../stylesheets/lesson.css"

class CommentHeatmap extends React.Component {
    constructor(props) {
        super(props);
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
            ctx.beginPath()
            if (comment.author.instructor){
                ctx.fillStyle = "#f5a2a2"
            } else { ctx.fillStyle = "#a2cdf5"}
            ctx.arc(15+(2000 * timeRound), 15 ,15,0, 2*Math.PI,false)
            ctx.fill()
        })
    }


    render() {
        return (
            <div onClick={this.props.onHit}className='comment-heatmap'>
                <canvas id="canvas" height='30' width='2030' className='heatmap-canvas'
                >

                </canvas>
            </div>
        )
    }
}

export default CommentHeatmap