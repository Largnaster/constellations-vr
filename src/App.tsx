import "aframe";
import { Fragment, useEffect, useState } from "react";
import { constellationsInfo } from "./utils";

function App() {
  const [pauseMenuOpen, setPauseMenuOpen] = useState(false);
  const [selectedConstellation, setSelectedConstellation] =
    useState<ConstellationInfo | null>(null);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setPauseMenuOpen(!pauseMenuOpen);
      setSelectedConstellation(constellationsInfo[0]);
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
        setSelectedConstellation(null);
        pauseMenu.setAttribute("visible", "true");
      } else {
        pauseMenu.setAttribute("visible", "false");
        setSelectedConstellation(null);
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
          <img id="tauro_img" src="/images/tauro.jpg" alt="tauro_img" />
          <img id="geminis_img" src="/images/geminis.jpg" alt="geminis_img" />
          <img id="cancer_img" src="/images/cancer.jpg" alt="cancer_img" />
          <img id="leo_img" src="/images/leo.jpg" alt="leo_img" />
          <img id="virgo_img" src="/images/virgo.jpg" alt="virgo_img" />
          <img id="libra_img" src="/images/libra.jpg" alt="libra_img" />
          <img
            id="escorpio_img"
            src="/images/escorpio.jpg"
            alt="escorpio_img"
          />
          <img
            id="sagitario_img"
            src="/images/sagitario.jpg"
            alt="sagitario_img"
          />
          <img
            id="capricornio_img"
            src="/images/capricornio.jpg"
            alt="capricornio_img"
          />
          <img id="acuario_img" src="/images/acuario.jpg" alt="acuario_img" />
          <img id="piscis_img" src="/images/piscis.jpg" alt="piscis_img" />
        </a-assets>
        <a-sky src="#starmap" radius="100" />
        <a-sky src="#boundaries" radius="99" transparent />
        <a-sky src="#figures" radius="99" transparent />

        {constellationsInfo.map((constellation: ConstellationInfo) => (
          <Fragment key={constellation.name}>
            <a-plane
              id={constellation.name.toLowerCase()}
              width="30"
              height="6"
              material="color: gray; opacity: 0.4"
              position={`${constellation.position.x} ${constellation.position.y} ${constellation.position.z}`}
              rotation={`${constellation.rotation.x} ${constellation.rotation.y} ${constellation.rotation.z}`}
            >
              <a-text
                value={constellation.name}
                position="0 0 0"
                align="center"
                width="128"
              />
            </a-plane>
          </Fragment>
        ))}

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
            {selectedConstellation && (
              <a-entity
                id={selectedConstellation.name.toLowerCase()}
                visible="true"
              >
                <a-plane
                  color="#fff"
                  position={`${calcOverflowPosition(
                    selectedConstellation.position.x
                  )} ${calcOverflowPosition(
                    selectedConstellation.position.y
                  )} ${calcOverflowPosition(selectedConstellation.position.z)}`}
                  width="15"
                  height="24"
                >
                  <a-image
                    src={`#${selectedConstellation.name.toLowerCase()}_img`}
                    position="0 4.5 0.2"
                    width="15"
                    height="15"
                  />
                  <a-text
                    value={selectedConstellation.description}
                    align="center"
                    color="black"
                    position="0 -4 0.3"
                    scale="3 3 1"
                  />
                </a-plane>
              </a-entity>
            )}
          </a-entity>
        </a-camera>
      </a-scene>
    </>
  );
}

export default App;
