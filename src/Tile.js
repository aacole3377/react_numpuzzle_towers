import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Tile = ({ number, index, onMove }) => {
    const ref = useRef(null);

    const [, drag] = useDrag(() => ({
        type: 'tile',
        item: () => ({ index }),
    }), [index]);

    const [, drop] = useDrop(() => ({
        accept: 'tile',
        drop: (item) => {
            const newIndex = onMove(item.index, index);
            return { newIndex };
        },
    }), [index, onMove]);

    drag(drop(ref));

    return (
        <div
            ref={ref}
            className="tile"
            style={{
                gridColumn: (index % 4) + 1,
                gridRow: Math.floor(index / 4) + 1,
            }}
        >
            {number}
        </div>
    );
};

export default Tile;
