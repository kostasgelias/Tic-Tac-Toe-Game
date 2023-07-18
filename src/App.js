import React from 'react'
import { useState } from 'react';

function Square({value, onSquareClick}) {

  return <button onClick={onSquareClick} className='square'>{value}</button>;
}


export default function Board() {
  const [xIsNext,setIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const winner = calculateWinner(squares);

  function handlecClick(i) {
    if (squares[i] || calculateWinner(squares)){
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext){
      nextSquares[i] = "X";
    }else{
      nextSquares[i] = "O"
    }
    setIsNext(!xIsNext);
    setSquares(nextSquares);
  }

  
  let status;
  if (winner) {
    status = "Winner: " + winner;
  }else{
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  return(
    <React.Fragment>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value = {squares[0]} onSquareClick={() => handlecClick(0)} />
        <Square value = {squares[1]} onSquareClick={() => handlecClick(1)}/>
        <Square value = {squares[2]} onSquareClick={() => handlecClick(2)}/>
      </div>
      <div className='board-row'>
        <Square value = {squares[3]} onSquareClick={() => handlecClick(3)}/>
        <Square value = {squares[4]} onSquareClick={() => handlecClick(4)}/>
        <Square value = {squares[5]} onSquareClick={() => handlecClick(5)}/>
      </div>
      <div className='board-row'>
        <Square value = {squares[6]} onSquareClick={() => handlecClick(6)}/>
        <Square value = {squares[7]} onSquareClick={() => handlecClick(7)}/>
        <Square value = {squares[8]} onSquareClick={() => handlecClick(8)}/>
      </div>
    </React.Fragment>
  
  );
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

  for (let i=0; i< lines.length; i++){
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
    return null;
  }
}
