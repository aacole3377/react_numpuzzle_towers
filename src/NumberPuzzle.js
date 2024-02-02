import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Tile from './Tile';

const NumberPuzzle = () => {
    const [tiles, setTiles] = useState(generateInitialTiles());

    function generateInitialTiles() {
        const numbers = Array.from({ length: 15 }, (_, i) => i + 1);
        const shuffledNumbers = shuffle(numbers);
        const tileObjects = shuffledNumbers.map((number, id) => ({ id, number }));
        return [...tileObjects, { id: 15, number: null }];
    }

    function shuffle(array) {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    }

    function moveTile(fromIndex, toIndex) {
        const fromRow = Math.floor(fromIndex / 4);
        const fromCol = fromIndex % 4;
        const toRow = Math.floor(toIndex / 4);
        const toCol = toIndex % 4;

        const isAdjacent =
            (Math.abs(fromRow - toRow) === 1 && fromCol === toCol) ||
            (Math.abs(fromCol - toCol) === 1 && fromRow === toRow);

        if (isAdjacent && tiles[toIndex].number === null) {
            const newTiles = [...tiles];
            [newTiles[fromIndex].number, newTiles[toIndex].number] = [newTiles[toIndex].number, newTiles[fromIndex].number];
            setTiles(newTiles);

            if (isPuzzleSolved()) {
                alert('Congratulations! You solved the puzzle!');
            }

            return toIndex;
        }
    }

    function isPuzzleSolved() {
        for (let i = 0; i < tiles.length - 1; i++) {
            if (tiles[i] !== i + 1) {
                return false;
            }
            if (tiles[i].number !== i + 1) {
                return false;
            }
            return true;
        }
        return true;
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="number-puzzle">
                {tiles.map((tile, index) => (
                    <Tile key={index} number={tile.number} index={index} onMove={moveTile} />

                ))}
            </div>
        </DndProvider>
    );
};

export default NumberPuzzle;
