import { ChangeEvent, useCallback, useRef, useState } from "react";
import "./canvas.css";
import delay from "./helpers/delay";

const size = 10;
const ENTER = 200;

function App() {
  const [deepness, setDeepness] = useState(40);
  const [climb, setClimb] = useState(5);
  const [drop, setDrop] = useState(3);
  const [started, setStarted] = useState(false);
  const [numberOfTries, setNumberOfTries] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const start = () => {
    cleanCanvas();
    dropWorm();
  };

  const dropWorm = async () => {
    if (started) {
      return;
    }
    setStarted(true);
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");

      for (let x = 0; x < deepness; ) {
        // Should i maintain the real value? or choose a better UI/UX aproach
        const fakeDeepness = deepness * 4;
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        ctx?.fillRect(100, x, size, size);
        x += size;
        await delay(200);

        if (x >= deepness) {
          for (let y = deepness; y >= 0; ) {
            y -= climb;
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
            ctx?.fillRect(100, y, size, size);

            await delay(200);
            y += drop;
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
            ctx?.fillRect(100, y, size, size);

            if (y <= deepness / 2) {
              canvas.style.background = "yellow";
            }
            setNumberOfTries((prevState) => prevState + 1);
            await delay(1000);
          }
          canvas.style.background = "blue";
          setStarted(false);
        }
      }
    }
  };

  const handleDeepnessChange = (e: ChangeEvent<HTMLInputElement>) => {
    cleanCanvas();
    setDeepness(Number(e.target.value));
  };

  const handleClimbChange = (e: ChangeEvent<HTMLInputElement>) => {
    cleanCanvas();
    setClimb(Number(e.target.value));
  };

  const handleDropChange = (e: ChangeEvent<HTMLInputElement>) => {
    cleanCanvas();
    setDrop(Number(e.target.value));
  };

  const cleanCanvas = () => {
    const actualCanvas = canvasRef.current;
    actualCanvas
      ?.getContext("2d")
      ?.clearRect(0, 0, actualCanvas.width, actualCanvas.height);
    if (actualCanvas) {
      actualCanvas.style.background = "#FFF";
    }
    setStarted(false);
    setNumberOfTries(0);
  };

  return (
    <div className="container">
      <div>
        <div className="canvas-inputs">
          <label htmlFor="deepness">Deepness:</label>
          <input
            type="number"
            value={deepness}
            onChange={handleDeepnessChange}
            id="deepness"
            disabled={started}
          />
        </div>
        <div className="canvas-inputs">
          <label htmlFor="climb">Climb ammount:</label>
          <input
            type="number"
            value={climb}
            onChange={handleClimbChange}
            id="climb"
            disabled={started}
          />
        </div>
        <div className="canvas-inputs">
          <label htmlFor="drop">Drop ammount:</label>
          <input
            type="number"
            value={drop}
            onChange={handleDropChange}
            id="drop"
            disabled={started}
          />
        </div>
        <button onClick={start} disabled={started} className="canvas-start-btn">
          Start
        </button>
        <div>
          <p>The worm climb up {numberOfTries} times</p>
        </div>
      </div>
      <div className="canvas-wrapper">
        <canvas id="canvas" width={500} height={400} ref={canvasRef}>
          your browser doesn't support html5 canvas
        </canvas>
      </div>
      <p>
        The ratio of cm to pixels is 1:1 (40cm = 40px), in the canvas grid
        system
      </p>
    </div>
  );
}

export default App;
