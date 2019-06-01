import React from "react";
import background from "./resources/background.jpg";
import duck from "./resources/duck.gif";
import "./styles.css";
import gun from "./resources/crosshair.png";

export class Canvas extends React.Component {
  constructor() {
    super();
    this.bg = new Image();
    this.bg.src = background;
    this.duck = new Image();
    this.duck.src = duck;
    this.ctx = null;
    this.gun = new Image();
    this.gun.src = gun;
  }

  componentDidMount() {
    this.ctx = this.refs.canvas.getContext("2d");
  }

  componentDidUpdate() {
    this.loadBg();
    this.addDuck();
    this.loadGunSight();
  }

  addDuck() {
    this.ctx.scale(this.props.screen.ratio, this.props.screen.ratio);
    let duck = this.props.duck;
    this.ctx.save();
    for (var i = 0; i < duck.length; i++) {
      if (duck[i].position.x > this.props.screen.width) {
        duck[i].position.x = -this.duck.width;
      }
      this.ctx.drawImage(
        this.duck,
        duck[i].position.x,
        duck[i].position.y,
        this.props.screen.width / 10 + this.props.screen.height / 7,
        this.props.screen.width / 15 + this.props.screen.height / 10
      );
    }
  }

  loadGunSight() {
    this.ctx.drawImage(this.gun, this.props.gun.x - 30, this.props.gun.y - 30);
  }

  loadBg() {
    this.ctx.drawImage(
      this.bg,
      0,
      0,
      this.props.screen.width,
      this.props.screen.height
    );
  }

  render() {
    return (
      <canvas
        ref="canvas"
        width={this.props.screen.width * this.props.screen.ratio}
        height={this.props.screen.height * this.props.screen.ratio}
      />
    );
  }
}
