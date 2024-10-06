import React, { useState } from "react";
import { GiRobotGolem } from "react-icons/gi";
import { MdArrowForward, MdArrowUpward } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";
import { MdArrowDownward } from "react-icons/md";

import { LuRotateCcw } from "react-icons/lu";
import { LuRotateCw } from "react-icons/lu";

import "./App.css";

type directionProp = "north" | "south" | "east" | "west";
type positionProp = { x: number; y: number };

const directions: directionProp[] = ["north", "east", "south", "west"];

function App() {
  const [position, setPosition] = useState<positionProp>({ x: 0, y: 0 });
  const [direction, setDirection] = useState<directionProp>("south");
  const gridSize = 5;
  console.log("direction", direction);

  const robotMoveForward = () => {
    switch (direction) {
      case "north":
        if (position.y < gridSize - 1) {
          setPosition({ ...position, y: position.y + 1 });
        } else {
          alert("Cannot move further north!");
        }
        break;

      case "south":
        if (position.y > 0) {
          setPosition({ ...position, y: position.y - 1 });
        } else {
          alert("Cannot move further south!");
        }
        break;

      case "east":
        if (position.x > 0) {
          setPosition({ ...position, x: position.x - 1 });
        } else {
          alert("Cannot move further east!");
        }
        break;

      case "west":
        if (position.x < gridSize - 1) {
          setPosition({ ...position, x: position.x + 1 });
        } else {
          alert("Cannot move further west!");
        }
        break;

      default:
        break;
    }
  };
  const rotateDegrees = {
    north: 0,
    east: 90,
    south: 180,
    west: 270,
  };

  const rotateClockwise = () => {
    const newDirection =
      directions[(directions.indexOf(direction) + 1) % directions.length];
    setDirection(newDirection);
  };

  const rotateAntiClockwise = () => {
    const newDirection =
      directions[
        (directions.indexOf(direction) + directions.length - 1) %
          directions.length
      ];
    setDirection(newDirection);
  };

  const returnIcon = () => {
    switch (direction) {
      case "north":
        return <MdArrowDownward />;
        break;
      case "south":
        return <MdArrowUpward />;
        break;
      case "east":
        return <MdArrowBack />;
        break;
      case "west":
        return <MdArrowForward />;
        break;
    }
  };

  return (
    <div>
      <div
        className="w-[600px] bg-blue-300 grid grid-cols-5 grid-rows-5 gap-1 p-2"
        data-cy="grid-div"
      >
        {Array.from({ length: gridSize * gridSize }).map((_, index) => {
          const x = index % gridSize;
          const y = Math.floor(index / gridSize);
          return (
            <div
              key={index}
              className="bg-red-200 w-28 h-28 flex items-center justify-center"
              data-cy={`grid-cell-${x}-${y}`}
            >
              {position.x === x && position.y === y && (
                <GiRobotGolem
                  className="text-4xl text-black-500"
                  style={{
                    transform: `rotate(${rotateDegrees[direction]}deg)`,
                  }}
                  data-cy="robot"
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="w-[200px] h-20 gap-1 flex justify-center items-center my-2 mx-2">
        <button
          className="w-16 bg-sky-400 p-2 my-2 mx-2 flex justify-center"
          onClick={robotMoveForward}
          data-cy="grid-position"
        >
          {returnIcon()}
        </button>

        <button
          className="w-[20%] bg-sky-400 p-2 m-2"
          onClick={rotateAntiClockwise}
          data-cy="direction-clock"
        >
          <LuRotateCcw />
        </button>
        <button
          className="w-[20%] bg-sky-400 p-2 m-2"
          onClick={rotateClockwise}
          data-cy="direction-anti-clock"
        >
          <LuRotateCw />
        </button>
      </div>
    </div>
  );
}

export default App;
