import "aframe";
import { Fragment, useEffect, useState } from "react";

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
        x: -70,
        y: 29,
        z: 55,
      },
      description: "Aries is a constellation in the northern sky.",
    },
    {
      name: "Tauro",
      position: {
        x: -16,
        y: 7,
        z: 35,
      },
      description: "Tauro is a constellation in the northern sky.",
    },
    {
      name: "Geminis",
      position: {
        x: 13,
        y: 14,
        z: 40,
      },
      description: "Geminis is a constellation in the northern sky.",
    },
    {
      name: "Cancer",
      position: {
        x: 26,
        y: 12,
        z: 30,
      },
      description: "Cancer is a constellation in the northern sky.",
    },
    {
      name: "Leo",
      position: {
        x: 50,
        y: 10,
        z: 16,
      },
      description: "Leo is a constellation in the northern sky.",
    },
    {
      name: "Virgo",
      position: {
        x: 40,
        y: 0,
        z: -12,
      },
      description: "Virgo is a constellation in the northern sky.",
    },
    {
      name: "Libra",
      position: {
        x: 30,
        y: -12,
        z: -35,
      },
      description: "Libra is a constellation in the northern sky.",
    },
    {
      name: "Escorpio",
      position: {
        x: 16,
        y: -34,
        z: -50,
      },
      description: "Escorpio is a constellation in the northern sky.",
    },
    {
      name: "Sagitario",
      position: {
        x: -10,
        y: -18,
        z: -40,
      },
      description: "Sagitario is a constellation in the northern sky.",
    },
    {
      name: "Capricornio",
      position: {
        x: -36,
        y: -16,
        z: -34,
      },
      description: "Capricornio is a constellation in the northern sky.",
    },
    {
      name: "Acuario",
      position: {
        x: -45,
        y: -12,
        z: -15,
      },
      description: "Acuario is a constellation in the northern sky.",
    },
    {
      name: "Piscis",
      position: {
        x: -50,
        y: 10,
        z: 12,
      },
      description: "Piscis is a constellation in the northern sky.",
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

  const calcRotationY = (position: {
    x: number;
    y: number;
    z: number;
  }): { rotationX: number; rotationY: number } => {
    const { x, y, z } = position;
    const radius = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
    const theta = x == 0 ? 0 : Math.atan(y / x);
    const phi = radius == 0 ? 0 : Math.acos(z / radius);

    const testPhi = Math.acos(y / radius) * (180 / Math.PI); // Rotation in X
    let testTheta = Math.atan(x / z) * (180 / Math.PI); // rotation in Y
    // calculate the right testTheta angle based on the quadrant
    if ((y < 0 && x < 0) || (y < 0 && x > 0)) {
      testTheta += 180;
    } else if (y > 0 && x < 0) {
      testTheta += 360;
    }
    console.info("testPhi: ", testPhi, "\ntestTheta: ", testTheta);

    const rotationY = phi * (180 / Math.PI);
    const rotationX = theta * (180 / Math.PI);
    return { rotationX, rotationY };
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

        {constellationsInfo.map((constellation: ConstellationInfo) => {
          const { rotationX, rotationY } = calcRotationY(
            constellation.position
          );

          console.info(
            `Rotation for ${constellation.name}\nrotation y: `,
            rotationY,
            "\nrotation x: ",
            rotationX
          );
          return (
            <Fragment key={constellation.name}>
              <a-plane
                width="2.5"
                height="1"
                material="color: gray; opacity: 0.4"
                position={`${constellation.position.x} ${constellation.position.y} ${constellation.position.z}`}
                rotation={`${rotationX} ${rotationY} 0`}
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
                  rotation={`0 0 0`}
                  width="15"
                  height="24"
                >
                  <a-image
                    src={`#${constellation.name.toLowerCase()}_img`}
                    position="0 4.5 0.2"
                    width="15"
                    height="15"
                  />
                  <a-text
                    value={constellation.description}
                    align="center"
                    color="black"
                    position="0 -4 0.3"
                    scale="3 3 1"
                  />
                </a-plane>
              </a-entity>
            </Fragment>
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
