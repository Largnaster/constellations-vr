import { Fragment, useEffect, useState } from "react";
import { constellationsInfo } from "./utils";

const constellationsNames = constellationsInfo.map((constellation) =>
  constellation.name.toLocaleLowerCase()
);

AFRAME.registerComponent("collider-check", {
  dependencies: ["raycaster"],
  init: function () {
    const element = this.el;
    let constellationName = "";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getConstellation = (event: any) => {
      const collidedElement = event.detail.els;
      if (!collidedElement) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const constellation = collidedElement.find((element: any) =>
        constellationsNames.includes(element.id)
      );
      return constellation;
    };

    const handleConstellationClick = () => {
      if (!constellationName) return;
      console.info(`Clicked on ${constellationName}`);
      window.localStorage.setItem("constellation", constellationName);
      window.dispatchEvent(new Event("storage"));
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    element.addEventListener("raycaster-intersection", (event: any) => {
      const constellation = getConstellation(event);
      if (!constellation) return;

      constellationName = constellation.id;
      constellation.addEventListener("click", handleConstellationClick);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    element.addEventListener("raycaster-intersection-cleared", (event: any) => {
      const constellation = getConstellation(event);
      if (!constellation) return;

      constellation.removeEventListener("click", handleConstellationClick);
    });
  },
});

function App() {
  const [pauseMenuOpen, setPauseMenuOpen] = useState(false);
  const [selectedConstellation, setSelectedConstellation] =
    useState<ConstellationInfo | null>(null);

  window.addEventListener("storage", () => {
    const constellation = window.localStorage.getItem("constellation");
    if (constellation) {
      setSelectedConstellation(
        constellationsInfo.find(
          (constellationInfo) =>
            constellationInfo.name.toLowerCase() === constellation
        )!
      );
    }
  });

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPauseMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

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

  useEffect(() => {
    if (selectedConstellation) setPauseMenuOpen(true);
  }, [selectedConstellation]);

  const getRandomColor = (): string => {
    const colors = [
      "red",
      "blue",
      "green",
      "yellow",
      "orange",
      "purple",
      "pink",
      "brown",
      "gray",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  // event-set__click={`_event: click; color: ${getRandomColor()}`}
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
        <a-entity
          geometry="primitive: plane; width: 30; height: 6"
          material={`color: ${getRandomColor()}; opacity: 0.6`}
          position="0 0 0.2"
        />

        {constellationsInfo.map((constellation: ConstellationInfo) => (
          <Fragment key={constellation.name}>
            <a-plane
              id={constellation.name.toLowerCase()}
              class="collidable"
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
          <a-entity collider-check>
            <a-cursor
              color="white"
              animation__click="property: scale; from: 1 1 1; to: 0.1 0.1 0.1; easing: easeInCubic; dur: 150; startEvents: click"
              animation__clickreset="property: scale; to: 1 1 1; dur: 1; startEvents: animationcomplete__click"
              raycaster="objects: .collidable; far: 100"
            />
          </a-entity>
          <a-entity
            id="pauseMenu"
            position="0 0 -11"
            geometry="primitive: plane; width: 37; height: 19"
            material="color: gray; opacity: 0.4"
          >
            <a-entity
              id={`${selectedConstellation?.name.toLowerCase()}_description`}
              visible={!!selectedConstellation}
            >
              <a-plane
                color="#fff"
                position={"0 -2 0.1"}
                width="10"
                height="10"
              >
                <a-image
                  src={`#${selectedConstellation?.name.toLowerCase()}_img`}
                  position="0 4.5 0.1"
                  width="10"
                  height="9"
                />
                <a-text
                  value={selectedConstellation?.description}
                  align="center"
                  color="black"
                  position="0 -2.5 0.1"
                  scale="2 2 1"
                />
              </a-plane>
            </a-entity>
          </a-entity>
        </a-camera>
      </a-scene>
    </>
  );
}

export default App;
