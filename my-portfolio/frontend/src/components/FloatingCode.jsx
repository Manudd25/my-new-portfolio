import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Sphere, OrbitControls, Stars, Html } from "@react-three/drei";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div style={{ 
      position: "fixed", 
      top: 10, 
      left: "50%", 
      transform: "translateX(-50%)", 
      display: "flex", 
      gap: "50px", 
      zIndex: 100 
    }}>
      <Link to="/" style={navStyle}>Home</Link>
      <Link to="/about" style={navStyle}>About</Link>
      <Link to="/projects" style={navStyle}>Projects</Link>
      <Link to="/contact" style={navStyle}>Contact</Link>
    </div>
  );
}

const navStyle = {
  color: "#ffffff",
  fontSize: "1.5rem",
  textDecoration: "none",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s",
};

function InteractiveSphere() {
  const ref = useRef();
  const [color, setColor] = useState("#00ffff");

  useFrame(() => {
    ref.current.rotation.y += 0.01;
  });

  return (
    <Sphere args={[1.5, 64, 64]} position={[0, 0, -2]} ref={ref}
      onPointerOut={() => setColor("#00ffff")}
    >
      <meshStandardMaterial color={color} metalness={1} roughness={0} emissive={color} emissiveIntensity={0.8} />
    </Sphere>
  );
}

function FloatingCursorSphere() {
  const ref = useRef();
  const [mousePos, setMousePos] = useState([0, 0]);

  useFrame(() => {
    ref.current.position.x = mousePos[0] / 100;
    ref.current.position.y = -mousePos[1] / 100;
  });

  return (
    <Sphere ref={ref} args={[0.3, 32, 32]} position={[0, 0, -1]}>
      <meshStandardMaterial color="#ffcc00" emissive="#ffcc00" emissiveIntensity={0.8} />
    </Sphere>
  );
}

function HeroText() {
  return (
    <Html>
      <div style={{ 
        textAlign: "center", 
        color: "#ffffff", 
        fontSize: "2rem", 
        width: "100vw", 
        position: "absolute", 
        top: "50%", 
        left: "50%", 
        transform: "translate(-50%, -50%)"
      }}>
        <h1 style={{ fontSize: "4rem", fontWeight: "bold" }}>Hi, I'm Manuela</h1>
        <p style={{ fontSize: "1.8rem" }}>Full-Stack Developer specializing in React, Three.js & UI/UX</p>
      </div>
    </Html>
  );
}

export default function PortfolioLanding() {
  const [mousePos, setMousePos] = useState([0, 0]);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
      onMouseMove={(e) => {
        setMousePos([e.clientX - window.innerWidth / 2, e.clientY - window.innerHeight / 2]);
      }}>
      <Navigation />
      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 3, 3]} intensity={2} />
        <HeroText />
        <InteractiveSphere />
        <FloatingCursorSphere />
        <Stars radius={100} depth={50} count={8000} factor={6} saturation={0} fade speed={2} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
