import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for entire interactive assembly
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Inner Crystalline Orb (Subconscious Core)
    const coreGeo = new THREE.IcosahedronGeometry(1.4, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xF5EBD2,
      roughness: 0.15,
      metalness: 0.85,
      wireframe: false,
      transparent: true,
      opacity: 0.45,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // 2. Sacred Geometry Wireframe Cage (Merkaba / Geodesic Lattice)
    const wireGeo = new THREE.IcosahedronGeometry(1.85, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xD4AF37, // Champagne gold
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    rootGroup.add(wireMesh);

    // 2b. Neural Synapse Vertex Points (Golden Spheres at wireframe vertices)
    const posAttribute = wireGeo.attributes.position;
    const verticesCount = posAttribute.count;
    const vertexSpheres = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.045, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xF2E4B4 }),
      verticesCount
    );
    const dummy = new THREE.Object3D();
    for (let i = 0; i < verticesCount; i++) {
      dummy.position.set(
        posAttribute.getX(i),
        posAttribute.getY(i),
        posAttribute.getZ(i)
      );
      dummy.updateMatrix();
      vertexSpheres.setMatrixAt(i, dummy.matrix);
    }
    rootGroup.add(vertexSpheres);

    // 3. Toroidal Subconscious Energy Ring (Theta Wave Track)
    const ringGeo = new THREE.TorusGeometry(2.6, 0.02, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x7A8B7B, // Grounding Sage
      transparent: true,
      opacity: 0.5,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh1.rotation.x = Math.PI / 3;
    rootGroup.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh2.rotation.x = -Math.PI / 3;
    ringMesh2.rotation.y = Math.PI / 4;
    rootGroup.add(ringMesh2);

    // 4. Ambient Star / Neural Particle Field
    const particleCount = 450;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const goldColor = new THREE.Color('#D4AF37');
    const sageColor = new THREE.Color('#7A8B7B');
    const creamColor = new THREE.Color('#F2E4B4');

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = Math.random() > 0.5 ? (Math.random() > 0.5 ? goldColor : sageColor) : creamColor;
      particleColors[i * 3] = chosenColor.r;
      particleColors[i * 3 + 1] = chosenColor.g;
      particleColors[i * 3 + 2] = chosenColor.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particles);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xD4AF37, 3, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x7A8B7B, 2.5, 20);
    pointLight2.position.set(-5, -4, 3);
    scene.add(pointLight2);

    // Mouse & Scroll Interactivity
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = window.scrollY;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const clientX = event.clientX - rect.left;
      const clientY = event.clientY - rect.top;
      mouseX = (clientX / width) * 2 - 1;
      mouseY = -(clientY / height) * 2 + 1;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Scroll factor (0 to ~1)
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollFactor = Math.min(1, Math.max(0, scrollY / maxScroll));

      // Rotate groups
      rootGroup.rotation.y = elapsedTime * 0.18 + targetX * 0.8 + scrollFactor * 3.5;
      rootGroup.rotation.x = Math.sin(elapsedTime * 0.12) * 0.2 + targetY * 0.5;

      // Breathe effect on core
      const pulse = 1 + Math.sin(elapsedTime * 1.5) * 0.06;
      coreMesh.scale.set(pulse, pulse, pulse);

      // Counter-rotate wireframe
      wireMesh.rotation.y = -elapsedTime * 0.14;
      wireMesh.rotation.z = Math.cos(elapsedTime * 0.2) * 0.15;

      // Morphing particle field
      particles.rotation.y = -elapsedTime * 0.06;
      particles.rotation.x = Math.sin(elapsedTime * 0.08) * 0.1;

      // Rings precession
      ringMesh1.rotation.z = elapsedTime * 0.25;
      ringMesh2.rotation.z = -elapsedTime * 0.3;

      // Dynamic scale and tilt based on scroll
      const dynamicScale = 1 - Math.min(0.2, scrollFactor * 0.4);
      rootGroup.scale.set(dynamicScale, dynamicScale, dynamicScale);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative cursor-grab active:cursor-grabbing select-none"
      title="İnteraktif Kuantum Theta Çekirdeği - Fareyi hareket ettirin"
    />
  );
}
