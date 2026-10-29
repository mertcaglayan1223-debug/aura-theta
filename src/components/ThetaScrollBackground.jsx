import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThetaScrollBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene & 4K Camera
    const scene = new THREE.Scene();
    
    // Camera placed with generous breathing room (z: 22, fov: 42)
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0, 22);

    // 2. 4K Precision Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      depth: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3.0));
    mount.appendChild(renderer.domElement);

    // 3. Master Groups
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Responsive Scale Adjustment
    const getResponsiveScale = () => {
      const aspect = window.innerWidth / window.innerHeight;
      return aspect < 1.0 ? Math.max(0.65, aspect * 0.85) : 1.0;
    };
    masterGroup.scale.setScalar(getResponsiveScale());

    // 4. Solid Volumetric 4K Theta Wave Frequency Rings (No 1px broken lines!)
    // Using smooth TorusGeometry with 240 segments ensures unbroken, fluid lines at all angles
    const ringGroup = new THREE.Group();
    const ringData = [
      { radius: 6.2, tube: 0.022, rotX: Math.PI / 3.2, rotY: 0, color: 0xD4AF37, speed: 0.2 },
      { radius: 7.8, tube: 0.018, rotX: -Math.PI / 3.6, rotY: Math.PI / 4, color: 0x7A8B7B, speed: -0.25 },
      { radius: 9.4, tube: 0.015, rotX: Math.PI / 5.0, rotY: -Math.PI / 3.5, color: 0xC3B9D6, speed: 0.18 }
    ];

    const rings = ringData.map((d) => {
      const geo = new THREE.TorusGeometry(d.radius, d.tube, 24, 260);
      const mat = new THREE.MeshBasicMaterial({
        color: d.color,
        transparent: true,
        opacity: 0.35,
        depthWrite: false, // Prevents depth-buffer clipping
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = d.rotX;
      mesh.rotation.y = d.rotY;
      ringGroup.add(mesh);
      return { mesh, speed: d.speed, baseRadius: d.radius };
    });
    masterGroup.add(ringGroup);

    // 5. 1,400 Micro-Lights Subconscious Star Constellation
    const particleCount = 1400;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleOriginals = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cGold = new THREE.Color('#D4AF37');
    const cSage = new THREE.Color('#7A8B7B');
    const cCream = new THREE.Color('#F2E4B4');
    const cLavender = new THREE.Color('#DCD6E8');

    for (let i = 0; i < particleCount; i++) {
      const radius = 3.5 + Math.random() * 14.0;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * radius;

      const sinPhi = Math.sin(phi);
      const x = r * sinPhi * Math.cos(theta);
      const y = r * sinPhi * Math.sin(theta);
      const z = r * Math.cos(phi);

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleOriginals[i * 3] = x;
      particleOriginals[i * 3 + 1] = y;
      particleOriginals[i * 3 + 2] = z;

      const pick = Math.random();
      const col = pick < 0.45 ? cGold : pick < 0.75 ? cSage : pick < 0.9 ? cCream : cLavender;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particles);

    // 6. Sacred DNA Double Helix Spire (Continuous & Unbroken)
    const helixGroup = new THREE.Group();
    const helixStepCount = 100;
    const helixHeight = 18;
    const helixRadius = 1.35;

    const strand1CurvePoints = [];
    const strand2CurvePoints = [];

    for (let i = 0; i <= helixStepCount; i++) {
      const t = (i / helixStepCount) * Math.PI * 6;
      const y = ((i / helixStepCount) - 0.5) * helixHeight;

      strand1CurvePoints.push(new THREE.Vector3(
        Math.cos(t) * helixRadius,
        y,
        Math.sin(t) * helixRadius
      ));

      strand2CurvePoints.push(new THREE.Vector3(
        Math.cos(t + Math.PI) * helixRadius,
        y,
        Math.sin(t + Math.PI) * helixRadius
      ));
    }

    const curve1 = new THREE.CatmullRomCurve3(strand1CurvePoints);
    const curve2 = new THREE.CatmullRomCurve3(strand2CurvePoints);

    // Smooth volumetric tubes for the DNA strands so they never break or pixelate
    const strandGeo1 = new THREE.TubeGeometry(curve1, 160, 0.018, 12, false);
    const strandGeo2 = new THREE.TubeGeometry(curve2, 160, 0.018, 12, false);

    const strandMat1 = new THREE.MeshBasicMaterial({ color: 0xD4AF37, transparent: true, opacity: 0.35 });
    const strandMat2 = new THREE.MeshBasicMaterial({ color: 0x7A8B7B, transparent: true, opacity: 0.35 });

    const strandMesh1 = new THREE.Mesh(strandGeo1, strandMat1);
    const strandMesh2 = new THREE.Mesh(strandGeo2, strandMat2);
    helixGroup.add(strandMesh1);
    helixGroup.add(strandMesh2);

    // DNA Rungs (Connecting Cylinders)
    for (let i = 0; i < helixStepCount; i += 4) {
      const p1 = strand1CurvePoints[i];
      const p2 = strand2CurvePoints[i];
      const distance = p1.distanceTo(p2);

      const rungGeo = new THREE.CylinderGeometry(0.012, 0.012, distance, 8);
      const rungMat = new THREE.MeshBasicMaterial({ color: 0xF2E4B4, transparent: true, opacity: 0.28 });
      const rung = new THREE.Mesh(rungGeo, rungMat);

      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      rung.position.copy(mid);

      const dir = new THREE.Vector3().subVectors(p2, p1).normalize();
      rung.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);

      helixGroup.add(rung);
    }

    helixGroup.position.set(0, 0, -2);
    masterGroup.add(helixGroup);

    // 7. Scroll & Mouse Tracking with Smooth Damping
    let currentScroll = 0;
    let targetScroll = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetScroll = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      masterGroup.scale.setScalar(getResponsiveScale());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    handleScroll();

    // 8. Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth interpolations
      currentScroll += (targetScroll - currentScroll) * 0.055;
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      // Safe, expansive camera choreography with zero clipping:
      const camTargetX = Math.sin(currentScroll * Math.PI * 1.5) * 1.6 + mouseX * 0.6;
      const camTargetY = Math.cos(currentScroll * Math.PI) * 1.2 + mouseY * 0.4;
      const camTargetZ = 22 - currentScroll * 3.5;

      camera.position.x += (camTargetX - camera.position.x) * 0.04;
      camera.position.y += (camTargetY - camera.position.y) * 0.04;
      camera.position.z += (camTargetZ - camera.position.z) * 0.04;
      camera.lookAt(0, 0, 0);

      // Master rotation
      masterGroup.rotation.y = elapsed * 0.06 + currentScroll * Math.PI * 1.8;
      masterGroup.rotation.x = Math.sin(elapsed * 0.08) * 0.12 + currentScroll * 0.4;
      masterGroup.rotation.z = currentScroll * 0.5;

      // Smooth continuous precession of rings
      rings.forEach((item) => {
        item.mesh.rotation.z += item.speed * 0.02;
      });

      // DNA Helix continuous ascension with scroll
      helixGroup.rotation.y = elapsed * 0.2 + currentScroll * Math.PI * 2.2;
      helixGroup.position.y = Math.sin(elapsed * 0.3) * 0.3 - currentScroll * 2.0;

      // Particle breathing
      const posArr = particleGeo.attributes.position.array;
      const breath = 1 + Math.sin(elapsed * 0.6) * 0.05 + currentScroll * 0.15;
      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3] = particleOriginals[i * 3] * breath;
        posArr[i * 3 + 1] = particleOriginals[i * 3 + 1] * breath;
        posArr[i * 3 + 2] = particleOriginals[i * 3 + 2] * breath;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-75 transition-opacity duration-1000"
      style={{ willChange: 'transform' }}
      aria-hidden="true"
    />
  );
}
