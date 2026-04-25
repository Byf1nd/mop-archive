import React, { useState, useEffect } from 'react';

export default function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const winner = calculateWinner(board);

    // Efecto para el movimiento de la IA
    useEffect(() => {
        if (!isXNext && !winner && board.includes(null)) {
            const timer = setTimeout(() => {
                const availableMoves = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
                const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
                handleClick(randomMove);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isXNext, winner, board]);

    const handleClick = (i) => {
        if (board[i] || winner) return;
        const nextBoard = board.slice();
        nextBoard[i] = isXNext ? 'X' : 'O';
        setBoard(nextBoard);
        setIsXNext(!isXNext);
    };

    return (
        <div className="border-2 border-black p-4 bg-white rotate-1 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] w-64">
            <div className="flex justify-between font-mono text-[10px] mb-2 border-b border-black uppercase">
                <span>MOP_SYSTEM_v1</span>
                <span>{winner ? `Winner: ${winner}` : isXNext ? "Your Turn (X)" : "AI Thinking..."}</span>
            </div>
            <div className="grid grid-cols-3 gap-0 border-l border-t border-black bg-zinc-50">
                {board.map((square, i) => (
                    <button key={i} onClick={() => handleClick(i)} className="h-16 w-16 border-r border-b border-black text-2xl font-black hover:bg-white transition-all uppercase italic">
                        {square}
                    </button>
                ))}
            </div>
            {(winner || !board.includes(null)) && (
                <button onClick={() => setBoard(Array(9).fill(null))} className="mt-4 w-full bg-black text-white font-mono text-[10px] py-2 uppercase hover:bg-[#FF3E00]">
                    Play Again_
                </button>
            )}
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let line of lines) {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    }
    return null;
}