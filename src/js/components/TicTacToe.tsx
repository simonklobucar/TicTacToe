import React from 'react';
import useTicTacToe from './useTicTacToe';

const TicTacToe = () => {
    const {
        gridSize,
        gridTiles,
        winner,
        handleClick,
        resetGame,
        handleGridSizeChange,
        gridSizes,
        gridTemplateRows,
        gridTemplateColumns
    } = useTicTacToe();

    return (
        <div className="game-grid-container">
            <fieldset className="game-grid__options">
                <legend>Select grid size:</legend>
                    {gridSizes.map((size, index) => (
                        <div key={index} className="game-grid__option">
                            <input 
                                onChange={handleGridSizeChange} 
                                type="radio" 
                                name="grid-size" 
                                value={size} 
                                checked={gridSize === size}
                            />
                            <label>{size}x{size}</label>
                        </div>
                    ))}
            </fieldset>

            <div className={`game-grid`} style={{gridTemplateRows, gridTemplateColumns}}>
                {gridTiles.map(tile => 
                    <button
                        key={tile.index}
                        className={`game-grid__cell game-grid__cell--${tile.player}`}
                        type="button"
                        onClick={() => handleClick(tile.index)}
                    >
                        {tile.player}
                    </button>
                )}
                <p className={`game-grid__winner-text game-grid__winner-text--${winner}`}>
                    {winner !== '' && `${winner} Winner`}
                </p>
            </div>

            <div className="btn-container">
                <button 
                    className="btn"
                    type="button"
                    onClick={resetGame}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default TicTacToe;
