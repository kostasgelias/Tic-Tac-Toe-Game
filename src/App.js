import React from 'react'
import { useState } from 'react';

function Square({value, onSquareClick}) {

  return <button onClick={onSquareClick} className='square'>{value}</button>;
}



export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handlecClick(i) {
    const nextSquares = squares.slice();
    nextSquares[i] = "X";
    setSquares(nextSquares);
  }

  return(
    <React.Fragment>
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
