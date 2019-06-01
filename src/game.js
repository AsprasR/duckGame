import React from "react";
import "./styles.css";
import { Duck } from "./duck.js";
import { Canvas } from "./canvas.js";

export class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1
      },
      shooter: {
        x: -100,
        y: -100
      },
      duckCount: 3,
      currentScore: 0,
      level: 1,
      scorePerKill: 0
    };
    this.duck = [];
    this.bullets = [];
  }

  handleMouseDown(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    var sizeX = this.state.screen.width / 11 + this.state.screen.height / 8;
    var sizeY = this.state.screen.width / 16 + this.state.screen.height / 11;
    for (let i = 0; i < this.duck.length; i++) {
      let d = this.duck[i];
      if (
        x >= d.position.x + this.state.screen.width / 32 &&
        x <= d.position.x + sizeX
      ) {
        if (
          y >= d.position.y + this.state.screen.height / 40 &&
          y <= d.position.y + sizeY
        ) {
          this.duck.splice(i, 1);
          this.setState({
            currentScore: this.state.currentScore + this.state.scorePerKill
          });
          break;
        }
      }
    }
  }

  handleResize() {
    this.setState({
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1
      }
    });
  }

  handleMouseMove(event) {
    this.setState({
      shooter: {
        x: event.offsetX,
        y: event.offsetY
      }
    });
  }

  handleMouseOut() {
    this.setState({
      shooter: {
        x: -100,
        y: -100
      }
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize.bind(this, false));
    window.addEventListener(
      "mousedown",
      event => this.handleMouseDown(event),
      false
    );
    window.addEventListener(
      "mousemove",
      event => this.handleMouseMove(event),
      false
    );
    window.addEventListener(
      "mouseout",
      event => this.handleMouseOut(event),
      false
    );
    this.startGame();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("mousedown", this.handleMouseDown);
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mousemout", this.handleMouseMove);
  }

  startGame() {
    this.setState({
      currentScore: 0,
      scorePerKill: this.state.level * this.state.duckCount * 100
    });
    this.createDuck();
    requestAnimationFrame(() => {
      this.update();
    });
  }

  createDuck() {
    var max_h = this.state.screen.height / 1.7;
    var min_h = 0;
    for (let i = 0; i < this.state.duckCount; i++) {
      let duck = new Duck({
        position: {
          x: -this.state.screen.width / 4.5,
          y: Math.random() * (max_h - min_h) + min_h
        },
        level: this.state.level
      });
      this.duck.push(duck);
    }
  }

  update() {
    if (this.duck.length === 0) {
      this.createDuck();
    } else {
      for (let i = 0; i < this.duck.length; i++) {
        this.duck[i].changeVerocity();
        this.setState({});
      }
    }
    requestAnimationFrame(() => {
      this.update();
    });
  }

  render() {
    return (
      <div>
        <Canvas
          screen={this.state.screen}
          duck={this.duck}
          gun={this.state.shooter}
        />
        <span className="score current-score">{this.state.currentScore}</span>
        <span className="score level">Level: {this.state.level}</span>
      </div>
    );
  }
}
