"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Fog } from "three";
import ThreeGlobe from "three-globe";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import countries from "./files/globe-data-min.json";

const Globe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return; // Ensure the code runs only on the client-side
    }

    if (typeof window !== "undefined") {
      let renderer: THREE.WebGLRenderer;
      let camera: THREE.PerspectiveCamera;
      let scene: THREE.Scene;
      let controls: OrbitControls;
      let globe: ThreeGlobe;

      const canvasSize = 512;

      const init = () => {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(canvasSize, canvasSize);
        renderer.setClearColor(0x000000, 0);
        if (containerRef.current) {
          containerRef.current.appendChild(renderer.domElement);
        }

        scene = new THREE.Scene();
        scene.add(new THREE.AmbientLight(0xbbbbbb, 0.3));
        scene.fog = new Fog(0x535ef3, 400, 2000);

        camera = new THREE.PerspectiveCamera(
          50,
          canvasSize / canvasSize,
          0.1,
          1000
        );
        camera.position.set(0, 0, 280);
        camera.updateProjectionMatrix();

        const dLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dLight.position.set(-800, 1000, 600);
        scene.add(dLight);

        const dLight1 = new THREE.DirectionalLight(0x7982f6, 1);
        dLight1.position.set(-200, 500, 200);
        scene.add(dLight1);

        const dLight2 = new THREE.PointLight(0x8566cc, 0.5);
        dLight2.position.set(-200, 500, 200);
        scene.add(dLight2);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.enableZoom = false; // Disable zooming
        controls.rotateSpeed = 0.2; // Reduce rotate speed for slower interaction
        controls.autoRotate = true;
        controls.minPolarAngle = Math.PI / 3.5;
        controls.maxPolarAngle = Math.PI - Math.PI / 3;
      };

      const initGlobe = () => {
        globe = new ThreeGlobe({
          waitForGlobeReady: true,
          animateIn: true,
        })
          .hexPolygonsData(countries.features)
          .hexPolygonResolution(3)
          .hexPolygonMargin(0.3)
          .showAtmosphere(true)
          .atmosphereColor("#3a228a")
          .atmosphereAltitude(0.25)
          .hexPolygonColor(() => "rgba(255,255,255, 1)");

        globe.rotateY(-Math.PI * (5 / 9));
        globe.rotateZ(-Math.PI / 6);
        globe.globeMaterial(
          new THREE.MeshPhongMaterial({
            color: "#4C1D95",
            emissive: "#220038",
            emissiveIntensity: 0.1,
            shininess: 0.7,
          })
        );

        scene.add(globe);
      };

      const onWindowResize = () => {
        camera.aspect = canvasSize / canvasSize;
        camera.updateProjectionMatrix();
        renderer.setSize(canvasSize, canvasSize);
      };

      const animate = () => {
        camera.lookAt(scene.position);
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      init();
      initGlobe();
      onWindowResize();
      animate();

      return () => {
        window.removeEventListener("resize", onWindowResize);
        if (containerRef.current) {
          containerRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    }
  }, []);

  return (
    <div className="hero-globe">
      <div ref={containerRef} />
    </div>
  );
};

export default Globe;
