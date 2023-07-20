import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
    const [currentScreen, setCurrentScreen] = useState(0);
    const [playerFirst, setPlayerFirst] = useState("X");
    const [turn, setTurn] = useState("X");
    const [board, setBoard] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]);
    const [winner, setWinner] = useState(null);

    const handleClick = (row, col) => {
        if (!board[row][col] && !winner) {
            setBoard((prevBoard) => {
                const newBoard = [...prevBoard];
                newBoard[row][col] = turn;
                return newBoard;
            });

            setTurn((prevTurn) => (prevTurn === "X" ? "O" : "X"));
        }
    };

    useEffect(() => {
        // Check for a winner after each move
        const winner = checkWinner(board);
        if (winner) {
            setWinner(winner);
        } else {
            // Check for a draw (all cells are filled)
            const isDraw = checkDraw(board);
            if (isDraw) {
                setWinner("DRAW");
            }
        }
    }, [board]);

    const checkDraw = (board) => {
        // Check if all cells on the board are filled
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === null) {
                    return false;
                }
            }
        }
        return true; // All cells are filled (draw)
    };

    const checkWinner = (board) => {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (
                board[i][0] === board[i][1] &&
                board[i][1] === board[i][2] &&
                board[i][0] !== null
            ) {
                return board[i][0];
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (
                board[0][i] === board[1][i] &&
                board[1][i] === board[2][i] &&
                board[0][i] !== null
            ) {
                return board[0][i];
            }
        }

        // Check diagonals
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

        return null; // No winner yet
    };

    return (
        <>
            {currentScreen === 0 && (
                <>
                    <div id="intro-screen" className="center">
                        <h2>Chọn lượt chơi đầu:</h2>
                        <button
                            type="button"
                            id="choose-x"
                            className="choose"
                            onClick={() => {
                                setTurn("X");
                                setPlayerFirst("X");
                                setCurrentScreen(1);
                            }}
                        >
                            X
                        </button>
                        <button
                            type="button"
                            id="choose-o"
                            className="choose"
                            onClick={() => {
                                setTurn("O");
                                setPlayerFirst("O");
                                setCurrentScreen(1);
                            }}
                        >
                            O
                        </button>
                    </div>
                </>
            )}
            {currentScreen === 1 && (
                <>
                    <div id="game-screen" className="center">
                        <table className="center">
                            <tbody>
                                {board.map((row, i) => (
                                    <tr key={i}>
                                        {row.map((cell, j) => (
                                            <td key={j}>
                                                <button
                                                    type="button"
                                                    className={`cell ${
                                                        cell === "O"
                                                            ? "cell-o"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        handleClick(i, j)
                                                    }
                                                    disabled={
                                                        cell !== null ||
                                                        winner !== null
                                                    }
                                                >
                                                    {cell}
                                                </button>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {winner && (winner === "O" || winner === "X") && (
                            <div className="message-winner">
                                <h3>Người chơi "{winner}" chiến thắng!</h3>
                            </div>
                        )}
                        {winner === "DRAW" && (
                            <div className="message-winner">
                                <h3>Hòa! Không có người chiến thắng.</h3>
                            </div>
                        )}
                        <button
                            type="button"
                            id="restart"
                            onClick={() => {
                                setBoard([
                                    [null, null, null],
                                    [null, null, null],
                                    [null, null, null],
                                ]);
                                setTurn(playerFirst);
                                setWinner(null);
                            }}
                        >
                            Chơi lại
                        </button>
                    </div>
                </>
            )}
        </>
    );
};

export default App;
