import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Environment } from "@react-three/drei";
import CanvasLoader from "../Loader";
import GamingPc from "../../gamingpc/Gamingpc";
// import { Html } from '@react-three/drei';

const Computers = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    
    // Set the initial value of the 'isMobile' state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener('change',handleMediaQueryChange);

    // Remove the Listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change',handleMediaQueryChange);
    }
  },[])

  return (
    <>
      <Canvas
        frameloop="demand"    //Only re-renders the scene when changes occur (better performance).
        shadows
        camera={{ position: [20, 3, 5], fov: 25 }}   //fov(field of view means how wide should the field be viewed)
        gl={{ preserveDrawingBuffer: true }}    //allows screenshots.
      >
        <Suspense fallback={<CanvasLoader />}>
          <hemisphereLight intensity={3} groundColor="black"/>
          <pointLight intensity={4} />
          {/* <spotLight
            position={[0, 10, 10]}
            angle={0.12}
            penumbra={1}
            intensity={1}
            castShadow
            shadow-mapSize={1024}
          /> */}
          <OrbitControls enableZoom={false} />
          <GamingPc
            scale={isMobile ? 0.7 : 0.75}
            position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
            rotation={[-0.01, -0.2, -0.001]}
            isMobile={isMobile}
          />
        </Suspense>
        <Preload all />
      </Canvas>
    </>
  );
};

export default Computers;
