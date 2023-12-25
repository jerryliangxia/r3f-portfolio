import {
  MeshReflectorMaterial,
  Float,
  Text,
  Html,
  PivotControls,
  TransformControls,
  OrbitControls,
} from "@react-three/drei";
import { useRef } from "react";
import { button, useControls } from "leva";
import { Perf } from "r3f-perf";

export default function Experience() {
  const { perfVisible } = useControls("performance", {
    perfVisible: true,
  });
  const { position, color, visible } = useControls("sphere", {
    position: {
      value: { x: -2, y: 0 },
      step: 0.01,
      joystick: "invertY",
    },
    color: "#ff0000",
    visible: true,
    myInterval: {
      min: 0,
      max: 10,
      value: [4, 5],
    },
    clickMe: button(() => {
      console.log("ok");
    }),
    choice: { options: ["a", "b", "c"] },
  });

  const { scale } = useControls("cube", {
    scale: {
      value: 1.5,
      step: 0.01,
      min: 0,
      max: 5,
    },
  });

  const cube = useRef();
  const sphere = useRef();
  return (
    <>
      {perfVisible && <Perf position="top-left" />}
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
      <Float speed={5} floatIntensity={2}>
        <Text
          font="./bangers-v20-latin-regular.woff"
          fontSize={1}
          color="salmon"
          position-y={2}
          maxWidth={2}
          textAlign="center"
        >
          JERRY XIA
        </Text>
      </Float>

      <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        lineWidth={4}
        axisColors={["#9381ff", "#ff4d6d", "#7ae582"]}
        scale={100}
        fixed={true}
      >
        <mesh
          ref={sphere}
          visible={visible}
          position={[position.x, position.y, 0]}
        >
          <sphereGeometry />
          <meshStandardMaterial color={color} />
          <Html
            position={[1, 1, 0]}
            wrapperClass="label"
            distanceFactor={8}
            occlude={[sphere, cube]}
          >
            Text Pop-Up
          </Html>
        </mesh>
      </PivotControls>

      <mesh ref={cube} position-x={2} scale={scale}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <TransformControls object={cube} />

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <MeshReflectorMaterial
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.5}
          color="greenyellow"
        />
      </mesh>
    </>
  );
}
