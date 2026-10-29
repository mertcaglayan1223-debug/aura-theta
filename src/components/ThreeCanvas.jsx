import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const containerRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    // 1. Scene & Camera Setup (calibrated so no rings ever cut off)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.2);

    // 2. High-Fidelity Antialiased Renderer with Soft Tonemapping
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // 3. Master Assembly
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 4. Soft Ethereal Inner Core (Sade & Işıltılı Şeffaf Kristal)
    const coreGeo = new THREE.IcosahedronGeometry(1.25, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xFAF6EB, // Yumuşak kemik krem
      roughness: 0.25,
      metalness: 0.45,
      transparent: true,
      opacity: 0.38,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    masterGroup.add(coreMesh);

    // 4b. Inner Subtle Glow Sphere
    const innerGlowGeo = new THREE.SphereGeometry(0.7, 24, 24);
    const innerGlowMat = new THREE.MeshBasicMaterial({
      color: 0xFDF8EC,
      transparent: true,
      opacity: 0.22,
    });
    const innerGlow = new THREE.Mesh(innerGlowGeo, innerGlowMat);
    masterGroup.add(innerGlow);

    // 5. Zarif & Sade Geodezik Tel Kafes (Merkaba / Kuantum Alanı)
    const wireGeo = new THREE.IcosahedronGeometry(1.72, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xD4AF37, // Sıcak Şampanya Altını
      wireframe: true,
      transparent: true,
      opacity: 0.48,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    masterGroup.add(wireMesh);

    // 5b. Narin Sinaps Düğüm İncileri (Altın & Krem Düğümler)
    const posAttr = wireGeo.attributes.position;
    const vertexCount = posAttr.count;
    const nodeSpheres = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.038, 16, 16),
      new THREE.MeshBasicMaterial({
        color: 0xF5E6B8, // Soft pastel altın
      }),
      vertexCount
    );

    const dummy = new THREE.Object3D();
    for (let i = 0; i < vertexCount; i++) {
      dummy.position.set(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
      dummy.updateMatrix();
      nodeSpheres.setMatrixAt(i, dummy.matrix);
    }
    masterGroup.add(nodeSpheres);

    // 6. İki Adet Zarif & Soft Rezonans Halkası (Kesilmeyen, narin toruslar)
    // Radius 2.25 max, camera z: 8.2 — ekrana tam ve kusursuz sığar
    const ringGroup = new THREE.Group();

    // 1. Halka: Sıcak Şampanya Altını
    const ring1Geo = new THREE.TorusGeometry(2.18, 0.016, 24, 200);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0xD4AF37,
      transparent: true,
      opacity: 0.42,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3.2;
    ringGroup.add(ring1);

    // 2. Halka: Dingin Topraklayıcı Adaçayı Yeşili
    const ring2Geo = new THREE.TorusGeometry(2.32, 0.013, 24, 200);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x7A8B7B,
      transparent: true,
      opacity: 0.38,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 3.4;
    ring2.rotation.y = Math.PI / 4;
    ringGroup.add(ring2);

    masterGroup.add(ringGroup);

    // 7. Hafif ve Dingin Parçacık Tozu (380 Adet Soft Yıldız)
    const particleCount = 380;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    const cGold = new THREE.Color('#D4AF37');
    const cSage = new THREE.Color('#7A8B7B');
    const cCream = new THREE.Color('#FAF5E8');

    for (let i = 0; i < particleCount; i++) {
      const dist = 1.9 + Math.random() * 2.1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pPositions[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      pPositions[i * 3 + 2] = dist * Math.cos(phi);

      const pick = Math.random();
      const col = pick < 0.5 ? cGold : pick < 0.85 ? cSage : cCream;
      pColors[i * 3] = col.r;
      pColors[i * 3 + 1] = col.g;
      pColors[i * 3 + 2] = col.b;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.NormalBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    masterGroup.add(particles);

    // 8. Dingin & Yumuşak Doğal Işıklandırma
    const ambientLight = new THREE.AmbientLight(0xFFFDF8, 1.3);
    scene.add(ambientLight);

    const softGoldLight = new THREE.PointLight(0xD4AF37, 2.4, 25);
    softGoldLight.position.set(5, 5, 5);
    scene.add(softGoldLight);

    const softSageLight = new THREE.PointLight(0x7A8B7B, 2.0, 25);
    softSageLight.position.set(-5, -4, 4);
    scene.add(softSageLight);

    // 9. Akıcı Fare & Dokunmatik Etkileşim
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
        velocityY += deltaX * 0.004;
        velocityX += deltaY * 0.004;
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
        velocityY += deltaX * 0.005;
        velocityX += deltaY * 0.005;
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

    // 10. Meditatif & Dingin Animasyon Döngüsü
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Scroll faktörü
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollFactor = Math.min(1, Math.max(0, window.scrollY / maxScroll));

      // Sönümlü serbest dönüş
      masterGroup.rotation.y += velocityY;
      masterGroup.rotation.x += velocityX;
      velocityX *= 0.94;
      velocityY *= 0.94;

      // Sakin & meditatif ana dönüş (Theta 5.5 Hz sükuneti)
      masterGroup.rotation.y += 0.0035 + scrollFactor * 0.012;
      masterGroup.rotation.x += (targetTiltY * 0.22 - masterGroup.rotation.x) * 0.04;
      masterGroup.rotation.z = Math.sin(elapsed * 0.18) * 0.04;

      // Nefes alan iç kristal küre
      const breath = 1.0 + Math.sin(elapsed * 1.5) * 0.045;
      coreMesh.scale.set(breath, breath, breath);
      innerGlow.scale.set(breath * 1.05, breath * 1.05, breath * 1.05);

      // Tel kafesin ters yönde sakin dönüşü
      wireMesh.rotation.y = -elapsed * 0.09;
      wireMesh.rotation.z = Math.cos(elapsed * 0.15) * 0.08;

      // Düğüm noktalarının eşzamanlı takibi
      nodeSpheres.rotation.y = wireMesh.rotation.y;
      nodeSpheres.rotation.z = wireMesh.rotation.z;

      // Halkaların bağımsız salınımı
      ring1.rotation.z += 0.008;
      ring2.rotation.z -= 0.009;

      // Yıldız tozu
      particles.rotation.y = -elapsed * 0.03;
      particles.rotation.x = Math.sin(elapsed * 0.06) * 0.05;

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
      title="Zarif Kuantum Çekirdeği — Döndürmek için tıklayıp sürükleyin"
    />
  );
}
