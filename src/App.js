import React from 'react'
import { useState } from 'react';
import Toggle from 'react-toggle'



function Square({value, onSquareClick}) {

  return (
    <button onClick={onSquareClick} className='square'>
      {value}
    </button>
    );
}

function ToggleButton ({isToggled,moves}) {

  const handleToggle = () => {
    setIsToggled(!isToggled);
    moves.reverse();
  }

  return (
    <React.Fragment>
      <Toggle checked={isToggled} defaultChecked= 'false' onChange={handleToggle}/>
    </React.Fragment>
  )
}


function Board({xIsNext, squares, onPlay}) {


  function handleClick(i) {
    if ( calculateWinner(squares) || squares[i]){
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext){
      nextSquares[i] = "X";
    }else{
      nextSquares[i] = "O"
    }
    onPlay(nextSquares);
  }


  const rows = [];

  for (let j = 0; j < 9; j+=3) {
      rows.push (
        <React.Fragment>
        <div className="board-row">
          <Square value= {squares[j]} onSquareClick= {() => handleClick(j)}/>
          <Square value= {squares[j+1]} onSquareClick= {() => handleClick(j+1)}/>
          <Square value= {squares[j+2]} onSquareClick= {() => handleClick(j+2)}/>
        </div>
        </React.Fragment>
        
    );
  }



  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  }else{
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  return (
    <React.Fragment>
      <div className="status">{status}</div>
      <div>{rows}</div>
    </React.Fragment>
  )



}


export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0,currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((square,move) => {
    let description;
    if (move == currentMove) {
      description = 'You are at move # ' + move;
      return ( <li key = {move}>{description}</li>)
    } else if (move > 0) {
      description = 'Go to move # '+ move;
    }else{
      description = 'Go to game start!'
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  })

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext = {xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>

      <div className='game-info'>
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  )
}




function calculateWinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for (let i=0; i < lines.length; i++){
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}
