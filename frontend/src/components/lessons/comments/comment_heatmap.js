import React from "react";
import "../../../stylesheets/lesson.css"

class CommentHeatmap extends React.Component {
    constructor(props) {
        super(props);
        this.state= {loading:true}
    }
    componentDidMount() {
        this.setupAndDraw()
    }

    setupAndDraw() {
        const heatMap = document.getElementById('canvas')
        const ctx = heatMap.getContext("2d")
        ctx.width = 100;
        this.draw(ctx)
    }
    draw(ctx) {
        for(let i=0; i<100; i++){
        ctx.fillRect(i, 0, 10, 10)
        }
    }


    render() {
        return (
            <div className='comment-heatmap'>
                <canvas id="canvas" className='heatmap-canvas'>

                </canvas>
            </div>
        )
    }
}

export default CommentHeatmap