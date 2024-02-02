import React, { useState, useEffect } from "react";
import "./TowersOfHanoi.css";

const DISK_TYPES = ["disk-1", "disk-2", "disk-3"];

function TowersOfHanoi() {
    const [towers, setTowers] = useState([DISK_TYPES.slice(), [], []]);
    const [moves, setMoves] = useState(0);
    const [winner, setWinner] = useState(false);

    useEffect(() => {
        if (towers[2].length === 3) {
            setWinner(true);
        }
    }, [towers]);

    function canDrop(diskType, targetTowerIndex) {
        const targetTower = towers[targetTowerIndex];
        if (targetTower.length === 0) {
            return true;
        }
        const topDiskType = targetTower[0];
        const topDiskIndex = DISK_TYPES.indexOf(topDiskType);
        const diskIndex = DISK_TYPES.indexOf(diskType);
        if (diskIndex < topDiskIndex) {
            for (let i = 1; i < targetTower.length; i++) {
                const towerDiskType = targetTower[i];
                const towerDiskIndex = DISK_TYPES.indexOf(towerDiskType);
                if (diskIndex >= towerDiskIndex) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    function handleDragStart(event, diskType) {
        event.dataTransfer.setData("text/plain", diskType);
        event.dataTransfer.effectAllowed = "move";
    }

    function handleDragOver(event, towerIndex) {
        event.preventDefault();
        const diskType = event.dataTransfer.getData("text/plain");
        if (canDrop(diskType, towerIndex)) {
            event.dataTransfer.dropEffect = "move";
        } else {
            event.dataTransfer.dropEffect = "none";
        }
    }

    function handleDrop(event, targetTowerIndex) {
        event.preventDefault();
        const diskType = event.dataTransfer.getData("text/plain");
        const sourceTowerIndex = towers.findIndex((tower) => tower.includes(diskType));
        const sourceTower = towers[sourceTowerIndex];
        const targetTower = towers[targetTowerIndex];

        if (sourceTower[0] !== diskType) {
            return;
        }

        if (canDrop(diskType, targetTowerIndex)) {
            const diskIndex = sourceTower.indexOf(diskType);
            const disk = sourceTower.splice(diskIndex, 1)[0];
            targetTower.unshift(disk);
            setTowers([...towers]);
            setMoves(moves + 1);
        }
    }

    return (
        <div className="towers-of-hanoi">
            {towers.map((tower, towerIndex) => (
                <div
                    key={towerIndex}
                    className="tower"
                    onDragOver={(event) => handleDragOver(event, towerIndex)}
                    onDrop={(event) => handleDrop(event, towerIndex)}
                >
                    {tower.slice().reverse().map((diskType, diskIndex) => (
                        <Disk
                            key={diskType}
                            diskType={diskType}
                            onDragStart={(event) => handleDragStart(event, diskType)}
                        />
                    ))}
                </div>
            ))}
            <div className="moves">{moves} moves</div>
            {winner && <div className="winner">You won!</div>}
        </div>
    );
}
function Disk({ diskType, onDragStart }) {
    const className = `disk ${diskType}`;

    return (
        <div className={className} draggable="true" onDragStart={onDragStart}>
            <div className="inner" />
        </div>
    );
}
function App() {
    return (
        <div className="App">
            <TowersOfHanoi />
        </div>
    );
}
export default App;
