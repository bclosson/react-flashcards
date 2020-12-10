import React, { Component } from 'react';
import Definition from './Definition';

class Flashcard extends Component {
  state = {
    time: 20,
    timer: null,
    showDef: false
  };

  componentDidMount() {
    this.setState({
      timer: setInterval(this.decrementTime, 1000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.detail !== this.props.detail) {
      this.setState({
        time: 20
      });
    }
  }

  decrementTime = () => {
    if (this.state.time === 1) {
      this.props.next();
    } else {
      this.setState(prevState => {
        return {
          time: prevState.time - 1
        };
      });
    }
  };

  toggleShowDef = () => {
    // this.setState({ showDef: !this.state.showDef });
    this.setState(prevState => {
      return {
        showDef: !prevState.showDef
      };
    });
  };

  displayDefs = definitions => {
    return definitions.map((def, idx) => {
      return <Definition key={idx} def={def} idx={idx} />;
    });
  };

  render() {
    const { word, definitions } = this.props.detail;
    const { showDef, time } = this.state;

    return (
      <>
        <div className='card'>
          <div className='card-content'>
            <h4>{time}</h4>
            <h1>{word}</h1>
            <div className='card-action'>
              <button
                onClick={this.toggleShowDef}
                className='waves-effect waves-light btn'
              >
                {showDef ? 'Hide Definition' : 'Show Definition'}
              </button>
            </div>
          </div>
        </div>
        <div className='card'>{showDef && this.displayDefs(definitions)}</div>
      </>
    );
  }
}

export default Flashcard;
