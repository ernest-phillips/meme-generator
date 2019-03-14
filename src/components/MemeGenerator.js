import React, { Component } from "react";

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.generateRandom = this.generateRandom.bind(this);
  }
  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const { memes } = response.data;
        console.log(memes[0]);
        this.setState({ allMemeImgs: memes });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  generateRandom(event) {
    event.preventDefault();
    const genRandom = this.state.allMemeImgs.map(item => item.url);

    let rNum = Math.floor(Math.random() * genRandom.length);
    console.log(genRandom[rNum]);
    this.setState({ randomImg: genRandom[rNum] });
  }

  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={this.generateRandom}>
          <input
            type="text"
            value={this.state.topText}
            placeholder="Top Text"
            onChange={this.handleChange}
            name="topText"
          />
          <input
            type="text"
            value={this.state.bottomText}
            placeholder="Bottom Text"
            onChange={this.handleChange}
            name="bottomText"
          />
          <button>Gen</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImg} alt="" />
          <h2 className="top">{this.state.topText}</h2>

          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
