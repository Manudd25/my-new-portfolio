import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sphere } from "@react-three/drei";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

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

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://my-new-portfolio-2.onrender.com/send"
        , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
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
        <Link to="/about" style={navStyle}>About</Link>
        <Link to="/projects" style={navStyle}>Projects</Link>
      </nav>
      
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "#ffffff",
        textAlign: "center",
        zIndex: 10,
        maxWidth: "600px"
      }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>Contact Me</h1>
        <p style={{ fontSize: "1.3rem", lineHeight: "1.6", marginBottom: "30px" }}>
          Feel free to reach out to me through the form below or via my social links:
        </p>
        {submitted ? (
          <p style={{ fontSize: "1.5rem", color: "#00ffcc" }}>Thank you! Your message has been sent.</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", width: "350px", margin: "auto" }}>
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required style={inputStyle} />
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required style={inputStyle} />
            <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} required style={inputStyle} />
            <button type="submit" style={buttonStyle}>Send Message</button>
          </form>
        )}
        
        <div style={{ display: "flex", gap: "30px", fontSize: "2rem", marginTop: "30px" }}>
          <a href="mailto:didariomanuela@gmail.com" style={iconStyle}><FaEnvelope /></a>
          <a href="https://www.linkedin.com/in/manuela-di-dario-11812372" target="_blank" rel="noopener noreferrer" style={iconStyle}><FaLinkedin /></a>
          <a href="https://github.com/Manudd25" target="_blank" rel="noopener noreferrer" style={iconStyle}><FaGithub /></a>
        </div>
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

const iconStyle = {
  color: "#ffffff",
  transition: "0.3s",
  textDecoration: "none",
  cursor: "pointer",
  marginLeft: "20%",
};

const inputStyle = {
  padding: "10px",
  fontSize: "1rem",
  borderRadius: "5px",
  border: "none",
  width: "100%",
};

const buttonStyle = {
  padding: "10px",
  fontSize: "1.2rem",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#00ffcc",
  color: "#050505",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s",
  marginLeft: "5%"
};



