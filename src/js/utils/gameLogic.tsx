const gameLogic = () => {
    function generateWinningConditions(gridSize: number): number[][] {
        const rows: number[][] = [];
        const columns: number[][] = [];
        const lrDiagonals: number[][] = [];
        const rlDiagonals: number[][] = [];

        for(let i = 0; i < gridSize; i++) {
            for(let j = 0; j <= gridSize - 3; j++) {
                rows.push([]);
                for(let k = 0; k < 3; k++) {
                    rows[i].push(i * gridSize + j + k);
                }
            }
        }
        
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j <= gridSize - 3; j++) {
                columns.push([]);
                for (let k = 0; k < 3; k++) {
                    columns[i + j].push(i + k * gridSize);
                }
            }
        }

        for (let i = 0; i <= gridSize - 3; i++) {
            for (let j = 0; j <= gridSize - 3; j++) {
                lrDiagonals.push([]);
                for (let k = 0; k < 3; k++) {
                    lrDiagonals[i + j].push((i + k) * gridSize + j + k);
                }
            }
        }

       // console.log([...rows, ...columns, ...lrDiagonals]);
        return [...rows, ...columns, ...lrDiagonals];
    }

    // Function to check for a winner
    function checkWinner(gridSize,tiles) {
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

    return {
        generateWinningConditions,
    };
}; 

export default gameLogic;
