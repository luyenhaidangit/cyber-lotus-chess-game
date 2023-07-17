import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../assets/css/game.css"

const Game = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [turn, setTurn] = useState("X");

  const [board, setBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const handleClick = (row, col) => {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[row][col] = turn;
      return newBoard;
    });

    setTurn((prevTurn) => {
      return prevTurn === "X" ? "O" : "X";
    });
  };

  useEffect(() => {
    // Check for a winner
    const winner = checkWinner(board);
    if (winner) {
      alert(winner + " là người chiến thắng!");
      setBoard([
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ]);
      setTurn("X");
    }
  }, [board]);

  const checkWinner = (board) => {
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2] &&
        board[i][0] !== null
      ) {
        return board[i][0];
      }
      if (
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i] &&
        board[0][i] !== null
      ) {
        return board[0][i];
      }
    }
    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] !== null
    ) {
      return board[0][0];
    }
    if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[0][2] !== null
    ) {
      return board[0][2];
    }
    return null;
  };

  return (
    <>
      {!isGameStarted && (
        <div className="d-flex justify-content-center">
          <button
            class="btn btn-primary justify-content-center"
            onClick={() => setIsGameStarted(!isGameStarted)}
          >
            Bắt đầu
          </button>
        </div>
      )}
      {isGameStarted && (
        <div className="game">
          <Container>
            <Row className="d-flex flex-column align-items-center">
              {board.map((row, i) => (
                <Col md={2}>
                  {row.map((cell, j) => (
                    <Button
                      key={i * 3 + j}
                      onClick={() => handleClick(i, j)}
                      variant="outline-primary"
                      disabled={cell !== null}
                      className="btn-caro"
                    >
                      {cell}
                    </Button>
                  ))}
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default Game;
