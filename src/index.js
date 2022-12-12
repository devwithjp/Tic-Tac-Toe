import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css'


  function Square(props) {
      return (
        <button className="square" onClick={props.onClick}> 
          {props.squares}
        </button>
      );
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return <Square 
                squares={this.props.squares[i]}
                onClick={()=>{this.props.onClickChange(i)}}
              />;
    }

    render() {
  
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history: [{squares:Array(9).fill(null)}], currentPlayer:"O", stepNumber:0
      };
      this.onClickChange= this.onClickChange.bind(this)

    }

    onClickChange(i){
      const history = this.state.history.slice(0,this.state.stepNumber+1);
      const current = history[history.length - 1];
      const squares = [...current.squares]
      if(calculateWinner(squares)||squares[i]){
        return
      }
      squares[i] = this.state.currentPlayer;
      this.setState((state)=>({
        history:history.concat(
          {squares: squares}
        ),
        stepNumber: history.length, 
        currentPlayer:state.currentPlayer === 'X'? 'O':'X'}))
    }

    moveTo(step){
      this.setState({
        stepNumber: step,
        currentPlayer: this.state.history.length % 2 ===0 ? 'O' : "X"
      })
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber].squares;
      const status = calculateWinner(current)? `Winner:${calculateWinner(current)}`:`Next player: ${this.state.currentPlayer}`;

      const moves = history.map((steps,move)=>
        { const desc = move ?
          'Go to move #' + move :
          'Go to game start';
          return(
            <li key={move}> 
              <button onClick={()=>this.moveTo(move)}>
                {desc}
              </button>
            </li>
          )
        }
      );
      return (
        <div className="game">
          <div className="game-board">
            <Board squares={current} onClickChange={this.onClickChange}/>
          </div>
          <div className="game-info">
            <div className="status">{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }


  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  