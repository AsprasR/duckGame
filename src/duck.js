export class Duck {
  constructor(props) {
    this.position = props.position;
    this.minV = 1;
    this.maxV = 3;
    this.velocity =
      props.level * Math.random() * (this.maxV - this.minV) + this.minV;
  }

  changeVerocity() {
    this.position.x += this.velocity;
  }
}
