import "aframe";

function App() {
  return (
    <>
      <a-scene>
        <a-assets>
          <img id="sky" src="/images/starmap_2020.webp" alt="sky" />
        </a-assets>
        <a-sky src="#sky" rotation="0 -90 0" />
      </a-scene>
    </>
  );
}

export default App;
