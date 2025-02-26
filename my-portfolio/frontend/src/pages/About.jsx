import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sphere } from "@react-three/drei";

function FloatingSphere({ position, color }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime) * 0.5;
    ref.current.rotation.y += 0.005;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} />
    </mesh>
  );
}

export default function AboutPage() {
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      position: "relative",
      overflow: "hidden",
    }}>
      <Canvas style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} intensity={2} />
        <Stars radius={100} depth={50} count={8000} factor={7} saturation={0} fade speed={2} />
        <FloatingSphere position={[1, 2, -3]} color="#00ffcc" />
        <FloatingSphere position={[-2, -1, -4]} color="#ffcc00" />
        <FloatingSphere position={[3, -2, -2]} color="#ff00ff" />
      </Canvas>
      
      <nav style={{
        position: "absolute",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "30px",
        zIndex: 10,
      }}>
        <Link to="/" style={navStyle}>Home</Link>
        <Link to="/projects" style={navStyle}>Projects</Link>
        <Link to="/contact" style={navStyle}>Contact</Link>
      </nav>
      
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "#ffffff",
        textAlign: "center",
        maxWidth: "800px",
        zIndex: 10
      }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>About Me</h1>
        <p style={{ fontSize: "1.3rem", lineHeight: "1.6" }}>
          Hi! I'm Manuela, a Full-Stack Web Developer currently enrolled in a training program at DCI Berlin, 
          specializing in the MERN stack. My journey into web development started in 2023, fueled by an interest in 
          building interactive and user-friendly applications.
        </p>
        <p style={{ fontSize: "1.3rem", lineHeight: "1.6", marginTop: "15px" }}>
          With a background in modern languages and literature, I bring strong analytical and problem-solving skills to coding. 
          My expertise includes JavaScript, React.js, Node.js, MongoDB, and UI/UX design, enhanced by my Google UX Design Certification.
        </p>
        <p style={{ fontSize: "1.3rem", lineHeight: "1.6", marginTop: "15px" }}>
          Prior to web development, I worked as a Customer Support Specialist, honing my communication and troubleshooting skills. 
          I enjoy building applications that enhance user experience, including projects like a Pizza Delivery Web App and a Traveler 
          Information Platform.
        </p>
        <p style={{ fontSize: "1.3rem", lineHeight: "1.6", marginTop: "15px" }}>
          Fluent in five languages (English, Italian, German, Spanish, Portuguese), I thrive in international environments and am 
          always eager to learn and collaborate on exciting projects.
        </p>
      </div>
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