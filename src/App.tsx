import "aframe";
import { useEffect, useState } from "react";

function App() {
  const [pauseMenuOpen, setPauseMenuOpen] = useState(false);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setPauseMenuOpen(!pauseMenuOpen);
    }
  });

  useEffect(() => {
    const pauseMenu = document.getElementById("pauseMenu");
    if (pauseMenu) {
      if (pauseMenuOpen) {
        pauseMenu.setAttribute("visible", "true");
      } else {
        pauseMenu.setAttribute("visible", "false");
      }
    }
  }, [pauseMenuOpen]);

  return (
    <>
      <a-scene stats>
        <a-assets>
          <img id="starmap" src="/images/starmap_2020.webp" alt="sky" />
          <img
            id="boundaries"
            src="/images/constellation_bounds.png"
            alt="bounds"
          />
          <img
            id="figures"
            src="/images/constellation_figures.png"
            alt="figures"
          />
        </a-assets>
        <a-sky src="#starmap" radius="100" />
        <a-sky src="#boundaries" radius="99" transparent />
        <a-sky src="#figures" radius="99" transparent />

        <a-camera>
          <a-cursor
            color="white"
            animation__click="property: scale; from: 1 1 1; to: 0.1 0.1 0.1; easing: easeInCubic; dur: 150; startEvents: click"
            animation__clickreset="property: scale; to: 1 1 1; dur: 1; startEvents: animationcomplete__click"
          />
          <a-entity
            id="pauseMenu"
            position="0 0 -1"
            geometry="primitive: plane; width: 0.2; height: 0.1"
            material="color: gray; opacity: 0.5"
          >
            <a-text
              value="PAUSED"
              align="center"
              position="0 0 0.1"
              color="white"
            />
          </a-entity>
        </a-camera>
      </a-scene>
    </>
  );
}

export default App;
