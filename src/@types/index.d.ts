import { HTMLAttributes } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "a-scene": HTMLAttributes<HTMLDivElement>;
      "a-entity": HTMLAttributes<HTMLElement>;
      "a-box": HTMLAttributes<HTMLElement>;
      "a-camera": HTMLAttributes<HTMLElement>;
      "a-circle": HTMLAttributes<HTMLElement>;
      "a-collada-model": HTMLAttributes<HTMLElement>;
      "a-cone": HTMLAttributes<HTMLElement>;
      "a-cursor": HTMLAttributes<HTMLElement>;
      "a-curvedimage": HTMLAttributes<HTMLElement>;
      "a-cylinder": HTMLAttributes<HTMLElement>;
      "a-dodecahedron": HTMLAttributes<HTMLElement>;
      "a-gltf-model": HTMLAttributes<HTMLElement>;
      "a-icosahedron": HTMLAttributes<HTMLElement>;
      "a-image": HTMLAttributes<HTMLElement>;
      "a-light": HTMLAttributes<HTMLElement>;
      "a-link": HTMLAttributes<HTMLElement>;
      "a-obj-model": HTMLAttributes<HTMLElement>;
      "a-octahedron": HTMLAttributes<HTMLElement>;
      "a-plane": HTMLAttributes<HTMLElement>;
      "a-ring": HTMLAttributes<HTMLElement>;
      "a-sky": HTMLAttributes<HTMLElement>;
      "a-sound": HTMLAttributes<HTMLElement>;
      "a-sphere": HTMLAttributes<HTMLElement>;
      "a-tetrahedron": HTMLAttributes<HTMLElement>;
      "a-text": HTMLAttributes<HTMLElement>;
      "a-torus-knot": HTMLAttributes<HTMLElement>;
      "a-torus": HTMLAttributes<HTMLElement>;
      "a-triangle": HTMLAttributes<HTMLElement>;
      "a-video": HTMLAttributes<HTMLElement>;
      "a-videosphere": HTMLAttributes<HTMLElement>;
      "a-assets": HTMLAttributes<HTMLElement>;
      "a-animation": HTMLAttributes<HTMLElement>;
      "a-asset-item": HTMLAttributes<HTMLElement>;
    }
  }
}
