import React from "react";

class Slider extends React.Component {
    render() {
        return (
            <div id="bpm-slider">
                <div id="volume">{this.props.bpm} BPM </div>
                <input type="range" min="40" max="200" value={this.props.bpm} onChange={this.props.handleChange} />
            </div>
        );
    }
}

export default Slider;