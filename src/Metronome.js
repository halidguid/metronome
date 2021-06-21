import React from "react";
import click1 from "./audio/click1.wav";
import click2 from "./audio/click2.wav";
import Button from "./Button";
import Slider from "./Slider";

class Metronome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            count: 0,
            bpm: 100,
            beatsPerMeasure: 4
        }
        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
        this.handleBPM = this.handleBPM.bind(this);
        this.startStop = this.startStop.bind(this);
        this.playClick = this.playClick.bind(this);
    }

    handleBPM = event => {
        const bpm = event.target.value;

        if(this.state.playing) {
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

            this.setState({
                count: 0,
                bpm
            });
        } else {
            this.setState({ bpm });
        }
    }


    playClick = () => {
        const { count, beatsPerMeasure } = this.state;

        if(count % beatsPerMeasure === 0) {
            this.click2.play();
        } else {
            this.click1.play();
        }

        this.setState(state => ({
            count: (state.count + 1) % state.beatsPerMeasure
        }));
    }

    startStop() {
        if(this.state.playing) {
            clearInterval(this.timer);
            this.setState({
                playing: false
            });
        } else {
            this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
            this.setState({
                count: 0,
                playing: true
            }, this.playClick);
        }
    }

    render() {
        return (
            <div className="card">
                <h1>Metronome</h1>
                <Slider bpm={this.state.bpm} handleChange={this.handleBPM} />
                <Button handleClick={this.startStop} currentState={this.state.playing} />
            </div>
        );
    }
}

export default Metronome;