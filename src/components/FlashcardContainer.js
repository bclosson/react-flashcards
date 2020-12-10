import React from "react";
import Flashcard from "./Flashcard";
import { CLIENT_URL } from "../constants.js";

class FlashcardContainer extends React.Component {
  state = {
    flashcards: [],
    currentIndex: 0,
  };
  
  // increment currentIndex
  next = () => {
    let nextIndex = (this.state.currentIndex + 1) === this.state.flashcards.length
      ? this.state.currentIndex
      : this.state.currentIndex + 1;

    this.setState({currentIndex: nextIndex});
  }
  
  // decrement currentIndex
  prev = () => {
    let prevIndex = (this.state.currentIndex - 1) === this.state.flashcards.length
      ? 0
      : (this.state.currentIndex - 1);
    
    this.setState({currentIndex: prevIndex});
  }

  // callback to be used in the event lister below
  handleKeyUp = (event) => {
    if (event.keyCode === 39) this.next();
    if (event.keyCode === 37) this.prev();
  }

  componentDidMount() {
    fetch(CLIENT_URL)
    .then((buffer) => {
      if (buffer.ok) {
        return buffer.json(buffer)
      } else {
        console.log('API error')
        return[];
      }
    })
    .then((data) => this.setState({flashcards: data}))
    .catch((err) => console.log(err));
  }

  render() {
    let detail = this.state.flashcards[this.state.currentIndex];
    let card;

    if (detail) {
      card = <Flashcard detail={detail} />
    }

    return(
      <div>
        {card}
      </div>
    )
  }
}

export default FlashcardContainer;

