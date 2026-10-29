import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const containerRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth || 520;
    let height = container.clientHeight || 520;

    // 1. Scene & 4K Perspective Camera Setup
    const scene = new THREE.Scene();
    
    // Perfectly calibrated FOV and distance so nothing ever clips or cuts off
    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.8);

    // 2. Ultra-Sharp 4K Antialiased WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true
    });
    renderer.setSize(width, height);
    // Support up to 3x pixel ratio for crystal-clear 4K Retina displays
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3.0));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = false; // keep 60fps high throughput
    container.appendChild(renderer.domElement);

    // 3. Master Assembly Group
    const masterAssembly = new THREE.Group();
    scene.add(masterAssembly);

    // 4. Central Pearlescent Diamond Crystal (7. Varoluş Seviyesi - Saf Bilinç Çekirdeği)
    const coreGeo = new THREE.IcosahedronGeometry(1.05, 3);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFFDF7,
      emissive: 0xD4AF37,
      emissiveIntensity: 0.22,
      roughness: 0.08,
      metalness: 0.88,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transparent: true,
      opacity: 0.72,
      reflectivity: 0.95,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    masterAssembly.add(coreMesh);

    // 4b. Inner Glowing Heart
    const heartGeo = new THREE.SphereGeometry(0.5, 32, 32);
    const heartMat = new THREE.MeshBasicMaterial({
      color: 0xFDF3D0,
      transparent: true,
      opacity: 0.85,
    });
    const heartMesh = new THREE.Mesh(heartGeo, heartMat);
    masterAssembly.add(heartMesh);

    // 5. Volumetric Unbroken Sacred Geometry Cage (Icosahedron Solid Struts)
    // Instead of fragile 1px lines that break/clip, we generate real 3D solid cylinders for every edge!
    const strutGroup = new THREE.Group();
    const cageBaseGeo = new THREE.IcosahedronGeometry(1.65, 1);
    const cagePositions = cageBaseGeo.attributes.position;
    const vertexMap = [];

    for (let i = 0; i < cagePositions.count; i++) {
      vertexMap.push(new THREE.Vector3(
        cagePositions.getX(i),
        cagePositions.getY(i),
        cagePositions.getZ(i)
      ));
    }

    // Build unique edges
    const edges = [];
    const edgeKey = (a, b) => (a < b ? `${a}_${b}` : `${b}_${a}`);
    const edgeSet = new Set();

    for (let i = 0; i < vertexMap.length; i++) {
      for (let j = i + 1; j < vertexMap.length; j++) {
        const d = vertexMap[i].distanceTo(vertexMap[j]);
        // Icosahedron edge length is roughly 1.73 * radius for subdivision 1
        if (d > 1.4 && d < 2.1) {
          const key = edgeKey(i, j);
          if (!edgeSet.has(key)) {
            edgeSet.add(key);
            edges.push([vertexMap[i], vertexMap[j]]);
          }
        }
      }
    }

    const strutMat = new THREE.MeshStandardMaterial({
      color: 0xD4AF37, // Polished Champagne Gold
      emissive: 0xB89225,
      emissiveIntensity: 0.15,
      metalness: 0.94,
      roughness: 0.12,
    });

    edges.forEach(([v1, v2]) => {
      const distance = v1.distanceTo(v2);
      const strutGeo = new THREE.CylinderGeometry(0.016, 0.016, distance, 12);
      const strut = new THREE.Mesh(strutGeo, strutMat);

      // Position at midpoint
      const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
      strut.position.copy(mid);

      // Orient towards direction
      const dir = new THREE.Vector3().subVectors(v2, v1).normalize();
      const axis = new THREE.Vector3(0, 1, 0);
      strut.quaternion.setFromUnitVectors(axis, dir);

      strutGroup.add(strut);
    });
    masterAssembly.add(strutGroup);

    // 5b. Synapse Node Spheres (32 Golden Pearls at vertices)
    const nodeGeo = new THREE.SphereGeometry(0.052, 24, 24);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xFFF2BE,
      emissive: 0xD4AF37,
      emissiveIntensity: 0.55,
      metalness: 0.95,
      roughness: 0.08,
    });
    const nodesMesh = new THREE.InstancedMesh(nodeGeo, nodeMat, vertexMap.length);
    const dummy = new THREE.Object3D();

    vertexMap.forEach((v, idx) => {
      dummy.position.copy(v);
      dummy.updateMatrix();
      nodesMesh.setMatrixAt(idx, dummy.matrix);
    });
    masterAssembly.add(nodesMesh);

    // 6. Triple Unbroken 4K Theta Wave Frequency Rings
    // Built with high-tessellation TorusGeometry (300 tubular segments, 32 radial)
    const ringGroup = new THREE.Group();
    const ringConfigs = [
      {
        radius: 2.15,
        tube: 0.024,
        rotX: Math.PI / 3.2,
        rotY: 0,
        color: 0xD4AF37, // Champagne Gold
        emissive: 0xB89225,
        speed: 0.28
      },
      {
        radius: 2.32,
        tube: 0.020,
        rotX: -Math.PI / 3.4,
        rotY: Math.PI / 3.8,
        color: 0x7A8B7B, // Grounding Sage
        emissive: 0x485549,
        speed: -0.32
      },
      {
        radius: 2.48,
        tube: 0.016,
        rotX: Math.PI / 5.5,
        rotY: -Math.PI / 3.2,
        color: 0xC3B9D6, // Ethereal Lavender
        emissive: 0x735F92,
        speed: 0.22
      }
    ];

    const rings = ringConfigs.map((cfg) => {
      const geo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 32, 300);
      const mat = new THREE.MeshPhysicalMaterial({
        color: cfg.color,
        emissive: cfg.emissive,
        emissiveIntensity: 0.2,
        metalness: 0.92,
        roughness: 0.12,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = cfg.rotX;
      mesh.rotation.y = cfg.rotY;
      ringGroup.add(mesh);
      return { mesh, speed: cfg.speed };
    });
    masterAssembly.add(ringGroup);

    // 7. Ambient Micro-Stardust Halo (650 Shimmering Points)
    const particleCount = 650;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    const cGold = new THREE.Color('#D4AF37');
    const cSage = new THREE.Color('#7A8B7B');
    const cCream = new THREE.Color('#FFF5DC');

    for (let i = 0; i < particleCount; i++) {
      const dist = 2.0 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pPositions[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      pPositions[i * 3 + 2] = dist * Math.cos(phi);

      const pick = Math.random();
      const col = pick < 0.5 ? cGold : pick < 0.82 ? cSage : cCream;
      pColors[i * 3] = col.r;
      pColors[i * 3 + 1] = col.g;
      pColors[i * 3 + 2] = col.b;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.048,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    masterAssembly.add(particles);

    // 8. 4K Cinematic Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xFFFDF8, 1.6);
    scene.add(ambientLight);

    // Key Light (Warm Champagne)
    const keyLight = new THREE.PointLight(0xD4AF37, 5.0, 30);
    keyLight.position.set(7, 7, 7);
    scene.add(keyLight);

    // Fill Light (Calming Sage)
    const fillLight = new THREE.PointLight(0x7A8B7B, 3.8, 30);
    fillLight.position.set(-7, -4, 5);
    scene.add(fillLight);

    // Specular Rim Light (Crystal Diamond)
    const rimLight = new THREE.PointLight(0xFFFFFF, 3.0, 20);
    rimLight.position.set(0, 8, -4);
    scene.add(rimLight);

    // 9. Fluid Mouse & Drag Inertia Controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      setIsInteracting(true);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      targetTiltX = (clientX / width) * 2 - 1;
      targetTiltY = -(clientY / height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        velocityY += deltaX * 0.005;
        velocityX += deltaY * 0.005;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMouseX;
        const deltaY = e.touches[0].clientY - prevMouseY;
        velocityY += deltaX * 0.006;
        velocityX += deltaY * 0.006;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('resize', handleResize);

    // 10. Flawless 60fps Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Scroll progress factor
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollFactor = Math.min(1, Math.max(0, window.scrollY / maxScroll));

      // Damped rotational physics
      masterAssembly.rotation.y += velocityY;
      masterAssembly.rotation.x += velocityX;
      velocityX *= 0.92;
      velocityY *= 0.92;

      // Meditative autonomous rotation + gentle cursor parallax
      masterAssembly.rotation.y += 0.005 + scrollFactor * 0.015;
      masterAssembly.rotation.x += (targetTiltY * 0.28 - masterAssembly.rotation.x) * 0.05;
      masterAssembly.rotation.z = Math.sin(elapsed * 0.25) * 0.06;

      // 4-7 Hz Theta Breathing Pulse on Inner Crystalline Core
      const pulse4to7Hz = 1.0 + Math.sin(elapsed * 2.2) * 0.05 + Math.sin(elapsed * 5.5) * 0.02;
      coreMesh.scale.set(pulse4to7Hz, pulse4to7Hz, pulse4to7Hz);
      heartMesh.scale.set(pulse4to7Hz * 1.1, pulse4to7Hz * 1.1, pulse4to7Hz * 1.1);

      // Continuous Counter-Orbit of Cage & Struts
      strutGroup.rotation.y = -elapsed * 0.1;
      strutGroup.rotation.z = Math.cos(elapsed * 0.2) * 0.12;

      // Dynamic Node Sparkle
      const nodePulse = 1.0 + Math.sin(elapsed * 3.5) * 0.12;
      nodesMesh.rotation.y = strutGroup.rotation.y;
      nodesMesh.rotation.z = strutGroup.rotation.z;
      nodesMesh.scale.set(nodePulse, nodePulse, nodePulse);

      // Smooth Rings Precession
      rings.forEach((r) => {
        r.mesh.rotation.z += r.speed * 0.03;
      });

      // Micro-Stardust Orbital Flow
      particles.rotation.y = -elapsed * 0.04;
      particles.rotation.x = Math.sin(elapsed * 0.08) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
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
      className={`w-full h-full relative select-none transition-transform duration-300 ${
        isInteracting ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      title="4K Theta Kuantum Çekirdeği — Döndürmek için tıklayıp sürükleyin"
    />
  );
}
