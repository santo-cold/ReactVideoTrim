import { useEffect, useState } from "react";
import Draggable from "react-draggable"; // The default
import "./App.css";
import Trim from "./images/trim.svg";
function App() {
  function handleDrag(e, data) {
    console.log(e, data);
  }

  const [duration, setDuration] = useState("");
  useEffect(() => {
    var video = document.querySelector("video");
    var i = setInterval(function () {
      if (video.readyState > 0) {
        var minutes = parseInt(video.duration / 60, 10);
        var seconds = video.duration % 60;
        setDuration(video.duration);
        // (Put the minutes and seconds in the display)
        clearInterval(i);
      }
    }, 200);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <video controls style={{ width: "90%", height: "300px" }}>
          <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" />
        </video>
        <div style={{ width: "90%", marginTop: 15 }}>
          <div className="handle">
            <img
              width="40px"
              height="40px"
              src={Trim}
              style={{ opacity: 0.7 }}
            />
          </div>
        </div>
        <div
          style={{
            height: "100px",
            background: "#e0e0e0eb",
            width: "90%",
            marginTop: 10,
            borderRadius: 3,
          }}
        >
          <Draggable
            axis="x"
            handle=".handle"
            defaultPosition={{ x: 0, y: 0 }}
            position={null}
            grid={[25, 25]}
            scale={1}
            // onStart={this.handleStart}
            onDrag={handleDrag}
            // onStop={this.handleStop}
          >
            <div
              className="handle"
              style={{
                height: 100,
                width: 40,
                background: "#6a5ca6",
                display: "inline-block",
              }}
            >
              {" "}
              <div
                style={{
                  background: "#ffffff87",
                  height: 15,
                  width: 2,
                  marginTop: "calc(50% + 19px)",
                  marginLeft: 19,
                }}
              ></div>
            </div>
          </Draggable>
          <Draggable
            axis="x"
            handle=".handle"
            defaultPosition={{ x: 0, y: 0 }}
            position={null}
            grid={[25, 25]}
            scale={1}
            // onStart={this.handleStart}
            onDrag={handleDrag}
            // onStop={this.handleStop}
          >
            <div
              className="handle"
              style={{
                height: 100,
                width: 40,
                background: "#6a5ca6",
                display: "inline-block",
              }}
            >
              <div
                style={{
                  background: "#ffffff87",
                  height: 15,
                  width: 2,
                  marginTop: "calc(50% + 19px)",
                  marginLeft: 19,
                }}
              ></div>
            </div>
          </Draggable>
        </div>
        <div
          style={{
            background: "#e0e0e0eb",
            width: "90%",
          }}
        >
          <div></div>
        </div>
      </header>
    </div>
  );
}

export default App;
