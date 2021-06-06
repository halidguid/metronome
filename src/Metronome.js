import React from "react";
import click1 from './audio/click1.wav';
import click2 from './audio/click2.wav';


class Metronome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bpm: 100,
            playing: false,
            count: 0,
        }
        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
        this.handleBPM = this.handleBPM.bind(this);
        this.updateInterval = this.updateInterval.bind(this);
        this.startStop = this.startStop.bind(this);
        this.playClick = this.playClick.bind(this);
    }

    updateInterval() {
        const bmpSpeed = 60 * 1000 / this.state.bpm;
        this.timer = setInterval(this.playClick, bmpSpeed);
    }

    handleBPM(event) {
        const bpm = event.target.value;
        if (this.state.playing) {
            clearInterval(this.timer);
            this.updateInterval();
            this.setState({
                count: 0,
                bpm
            });
        } else {
            this.setState({
                bpm
            });
        };
    }

    playClick() {
        if (this.state.count === 0) this.click2.play();
        else this.click1.play();
        this.setState({
            count: this.state.count + 1
        });
    }

    startStop() {
        if (this.state.playing) {
            clearInterval(this.timer);
            this.setState({
                playing: false
            });
        } else {
            this.updateInterval();
            this.setState({
                count: 0,
                playing: true
            }, this.playClick)
        }
    }

    render() {
        return (
          <div>
              <h1>Metronome</h1>
              <Slider bpm={this.state.bpm} handleChange={this.handleBPM}/>
              <Button handleClick={this.startStop} currentState={this.state.playing}/>
          </div>
        );
    }
}

class Button extends React.Component {
    render() {
        return (
            <button onClick={this.props.handleClick}>
              {this.props.currentState ? "Stop" : "Start"}
            </button>
        );
    }
}

class Slider extends React.Component {
    render() {
        return (
            <div id="bpm-slider">
                  <div>{this.props.bpm} BPM</div>
                  <input type="range" min="40" max="200" value={this.props.bpm} onChange={this.props.handleChange}/>
            </div>
        );
    }
}

export default Metronome;
 
