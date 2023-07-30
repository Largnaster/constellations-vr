import "aframe";
import { useEffect, useState } from "react";

interface ConstellationInfo {
  name: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  description: string;
}

function App() {
  const [pauseMenuOpen, setPauseMenuOpen] = useState(false);

  const constellationsInfo: ConstellationInfo[] = [
    {
      name: "Aries",
      position: {
        x: -9,
        y: 5,
        z: 8,
      },
      description: "Aries is a constellation in the northern sky.",
    },
  ];

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setPauseMenuOpen(!pauseMenuOpen);
    }
  });

  const calcOverflowPosition = (position: number) => {
    if (position === 0) return position + 0.1;
    return position + Math.sign(position) * 0.1;
  };

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
          <img id="aries_img" src="/images/aries.jpg" alt="aries_img" />
        </a-assets>
        <a-sky src="#starmap" radius="100" />
        <a-sky src="#boundaries" radius="99" transparent />
        <a-sky src="#figures" radius="99" transparent />

        {constellationsInfo.map((constellation) => {
          const rotationY =
            Math.atan2(constellation.position.x, constellation.position.z) *
            (180 / Math.PI);
          return (
            <div
              key={constellation.name}
              onClick={() => {
                console.info("clicked");
              }}
            >
              <a-plane
                width="2.5"
                height="1"
                material="color: gray; opacity: 0.4"
                position={`${constellation.position.x} ${constellation.position.y} ${constellation.position.z}`}
                rotation={`0 ${rotationY} 0`}
              >
                <a-text
                  value={constellation.name}
                  position="0 0 0"
                  align="center"
                  width="18"
                />
              </a-plane>
              <a-entity id={constellation.name.toLowerCase()} visible="true">
                <a-plane
                  color="#fff"
                  position={`${calcOverflowPosition(
                    constellation.position.x
                  )} ${calcOverflowPosition(
                    constellation.position.y
                  )} ${calcOverflowPosition(constellation.position.z)}`}
                  rotation={`0 ${rotationY} 0`}
                  width="5"
                  height="8"
                >
                  <a-image
                    src={`#${constellation.name.toLowerCase()}_img`}
                    position="0 1.5 0.2"
                    width="5"
                    height="5"
                  />
                  <a-text
                    value={constellation.description}
                    align="center"
                    color="black"
                    position="0 -2.5 0.3"
                  />
                </a-plane>
              </a-entity>
            </div>
          );
        })}

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
