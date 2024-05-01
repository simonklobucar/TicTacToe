import { useState, useEffect } from 'react';

const DEFAULT_GRID_SIZE = 3;

const PLAYERS = {
    human: 'X',
    ai: 'O',
};

const SCORES = {
    X: -1,
    O: 1,
    Tie : 0,
};

const useTicTacToe = () => {
    const [gridSize, setGridSize] = useState(DEFAULT_GRID_SIZE);
    const [gridTiles, setGridTiles] = useState(generateTiles(DEFAULT_GRID_SIZE * DEFAULT_GRID_SIZE));
    const [activePlayer, setActivePlayer] = useState(PLAYERS.human);
    const [winner, setWinner] = useState('');

    // Function to generate initial grid tiles
    function generateTiles(size) {
        return Array.from({ length: size }, (_, index) => ({
            index,
            player: "",
        }));
    }

    // Function to handle click on a grid cell
    function handleClick(index) {
        if (gridTiles[index].player === "" && !winner) {
            const newGridTiles = [...gridTiles];
            newGridTiles[index].player = activePlayer;
            setGridTiles(newGridTiles);
            setWinner(checkWinner(gridTiles));
            setActivePlayer(PLAYERS.ai);
        }
    }

    useEffect(() => {
        // Check if it's the bot's turn and handle bot's move
        if (activePlayer === PLAYERS.ai) {
            bestMove();
        }
    }, [activePlayer]);

    function bestMove() {
        let bestScore = -Infinity;
        let move = 0;
        const newGridTiles = [...gridTiles];
        for (let index = 0; index < gridSize*gridSize; index++) {
            if (newGridTiles[index].player === '') {
                newGridTiles[index].player = PLAYERS.ai;
                let score = minimax(newGridTiles, false, 0);
                newGridTiles[index].player = '';
                if (score > bestScore) {
                    bestScore = score;
                    move = index;
                }
            }
        }
        if(newGridTiles[move].player === '') {
            newGridTiles[move].player = PLAYERS.ai;
            setGridTiles(newGridTiles);
            setWinner(checkWinner(newGridTiles));
            setActivePlayer(PLAYERS.human);

        }

    }

    function minimax(board, isMaximizing, depth) {
        const winner = checkWinner(board);
        if (winner) {
            return SCORES[winner];
        }

        if (depth >= 3) {
            return 0; // Return 0 for the tie if depth limit is reached
        }

        if(isMaximizing) {
            let bestScore = -Infinity;
            for(let index = 0; index < gridSize*gridSize; index++) {
                if(board[index].player === '') {
                    board[index].player = PLAYERS.ai;
                    let score = minimax(board, false, depth + 1)
                    board[index].player = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for(let index = 0; index < gridSize*gridSize; index++) {
                if(board[index].player === '') {
                    board[index].player = PLAYERS.human;
                    let score = minimax(board, true, depth + 1)
                    board[index].player = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    // Function to check for a winner
    function checkWinner(tiles) {
        const winningConditions = [
            // Rows
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            // Columns
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            // Diagonals
            [0, 4, 8],
            [2, 4, 6],
        ];



        // Check if a winner has already been set
        if (winner) {
            return winner;
        }

        for (const condition of winningConditions) {
            const [a, b, c] = condition;
            const tileA = tiles[a];
            const tileB = tiles[b];
            const tileC = tiles[c];

            if (tileA.player && tileA.player === tileB.player && tileB.player === tileC.player) {
                return tileA.player;
            }
        }

        // Check for a tie
        if (!tiles.some(tile => !tile.player)) {
            return 'Tie';
        }
    }

    // Function to reset the game
    function resetGame() {
        setGridSize(DEFAULT_GRID_SIZE);
        setGridTiles(generateTiles(DEFAULT_GRID_SIZE * DEFAULT_GRID_SIZE));
        setActivePlayer(PLAYERS.human);
        setWinner('');
    }

    // Function to handle change in grid size
    function handleGridSizeChange(event) {
        const newSize = parseInt(event.target.value);
        setGridSize(newSize);
        setGridTiles(generateTiles(newSize * newSize));
    }

    const gridSizes = [3, 5, 7];
    const gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    const gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    return {
        gridSize,
        gridTiles,
        winner,
        handleClick,
        resetGame,
        handleGridSizeChange,
        gridSizes,
        gridTemplateRows,
        gridTemplateColumns
    };
};

export default useTicTacToe;
