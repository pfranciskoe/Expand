import React from "react";
import "../../../stylesheets/lesson.css"

class CommentHeatmap extends React.Component {
    constructor(props) {
        super(props);
        this.state= {loading:true}
    }
    componentDidMount(){
        const heatMap = document.getElementById('canvas')
        heatMap.width = 400;
        heatMap.height = 400;
        this.setState({ loading: false })
    }
    render() {
        return (
            <div className='comment-heatmap'>
                <canvas id="canvas">

                </canvas>
            </div>
        )
    }
}

export default CommentHeatmap