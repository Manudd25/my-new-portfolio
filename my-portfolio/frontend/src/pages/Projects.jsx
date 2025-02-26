import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Stars, useTexture } from "@react-three/drei";
import { Link } from "react-router-dom";
import project1 from "../assets/pizza-delivery-app.jpeg";
import project2 from "../assets/travel-agency-app.jpeg";
import project3 from "../assets/traveler-app.jpeg";

const projects = [
  {
    title: "Pizza Delivery App",
    description: "An interactive food ordering platform.",
    link: "https://manudd25.github.io/Pizza-Delivery-Web/",
    thumbnail: project1,
  },
  {
    title: "Travel Agency Website", 
    description: "A travel agency specialised in tropic travels.",
    link: "https://manudd25.github.io/Travel-Agency-Web/",
    thumbnail: project2,
  },
  {
    title: "Traveler Info Platform",
    description: "A guide to explore cities around the world.",
    link: "https://traveler-web-app.surge.sh/",
    thumbnail: project3,
  },
];

function FloatingProject({ position, title, description, link, thumbnail }) {
  const ref = useRef();
  const texture = useTexture(thumbnail);

  useFrame(({ clock }) => {
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime) * 0.2;
    ref.current.rotation.y += 0.005;
  });

  return (
    <group ref={ref} position={position}>
      <mesh scale={[1.5, 1.5, 0.1]}>
        <boxGeometry args={[5, 4, 0.2]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <Html center>
        <div
          style={{
            width: "200px",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            padding: "20px",
            borderRadius: "15px",
            textAlign: "center",
            color: "#ffffff",
            fontSize: "1rem",
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.3)",
          }}
        >
          <h3>{title}</h3>
          <p>{description}</p>
          <a
            href={link}
            target="_blank"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "#00ffcc",
              background: "rgba(0, 0, 0, 0.6)",
              padding: "8px 12px",
              borderRadius: "6px",
            }}
          >
            View Project
          </a>
        </div>
      </Html>
    </group>
  );
}

export default function ProjectsPage() {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <nav
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "50px",
          zIndex: 100,
        }}
      >
        <Link to="/" style={navStyle}>
          Home
        </Link>
        <Link to="/about" style={navStyle}>
          About
        </Link>
        <Link to="/contact" style={navStyle}>
          Contact
        </Link>
      </nav>

      <Canvas camera={{ position: [0, 0, 7] }}>
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={1} />
        <directionalLight position={[3, 3, 3]} intensity={2} />
        <Stars
          radius={100}
          depth={50}
          count={8000}
          factor={7}
          saturation={0}
          fade
          speed={2}
        />

        <FloatingProject
          position={[0, 1.5, -3]}
          title={projects[0].title}
          description={projects[0].description}
          link={projects[0].link}
          thumbnail={projects[0].thumbnail}
        />
        <FloatingProject
          position={[-7, -2.8, -3]}
          title={projects[1].title}
          description={projects[1].description}
          link={projects[1].link}
          thumbnail={projects[1].thumbnail}
        />
        <FloatingProject
          position={[7, -2.8, -3]}
          title={projects[2].title}
          description={projects[2].description}
          link={projects[2].link}
          thumbnail={projects[2].thumbnail}
        />
      </Canvas>
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
