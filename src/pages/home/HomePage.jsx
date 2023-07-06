import React, { useEffect, useRef, useState } from "react";
import "./HomePage.css";
import { ReactComponent as LinkArrow } from "./../../assets/icons/arrow-right-up-line.svg";
import { ReactComponent as Search } from "./../../assets/icons/search-2-line.svg";
import { gsap } from "gsap";
import Heading from "../../components/typography/Heading";
import * as THREE from "three";

function HomePage() {
  let title = useRef();
  let tl = new gsap.timeline({ repeat: -1 });
  let canvas = useRef();

  useEffect(() => {
    tl.to(title, 15, {
      backgroundPosition: "-960px 0",
      ease: "linear",
    });
  });

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const normalTexture = textureLoader.load("/assets/NormalMap.png");

    const scene = new THREE.Scene();
    // Objects
    const geometry = new THREE.SphereGeometry(0.5, 12, 12);
    // var geometry = new THREE.BufferGeometry().fromGeometry(sphereGeometry);

    // var geometry = THREE.BufferGeometryLoader.fromGeometry( sphere );
    // const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);

    // Materials

    const material = new THREE.MeshStandardMaterial();
    material.metalness = 0.7;
    material.roughness = 0.2;
    material.normalMap = normalTexture;
    material.color = new THREE.Color(0x292929);

    // Mesh
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Lights

    const pointLight = new THREE.PointLight(0xffffff, 0.1);
    pointLight.position.x = 2;
    pointLight.position.y = 3;
    pointLight.position.z = 4;
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xff0000, 2);
    pointLight2.position.set(-1.86, 1, -0.4);
    pointLight2.intensity = 30;
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xe1ff, 2);
    pointLight3.position.set(2.13, -3, -1.98);
    pointLight3.intensity = 20;
    scene.add(pointLight3);

    /**
     * Sizes
     */
    const sizes = {
      width: 450,
      height: 450,
    };

    // window.addEventListener("resize", () => {
    //   // Update sizes
    //   sizes.width = 400;
    //   sizes.height = 400;

    //   // Update camera
    //   camera.aspect = sizes.width / sizes.height;
    //   camera.updateProjectionMatrix();

    //   // Update renderer
    //   renderer.setSize(sizes.width, sizes.height);
    //   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // });
    /////////////////////

    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 0.9;
    scene.add(camera);

    // Controls
    // const controls = new OrbitControls(camera, canvas)
    // controls.enableDamping = true

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update objects
      sphere.rotation.y = 0.5 * elapsedTime;
      // Update Orbital Controls
      // controls.update()

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  });

  return (
    <div className="home">
      <div className="home__left">
      <div className="search__container">
      <Search className="home__search--icon"/>
       <input type="text" className="home__search" placeholder="Search book name, author"/>
       </div>
        <h1 ref={(el) => (title = el)} className="title">
          Happy reading,
          <br />
          Srekaravarshan
        </h1>
        <blockquote className="home__quote">
          “I kept always two books in my pocket, one to read, one to write in.”
          <span className="home__quote--author">- Robert Louis Stevenson</span>
        </blockquote>
        <button className="home__start-read button">
          Start Reading
          <LinkArrow className="home__start-read--icon" />
        </button>
        <Heading className="home__heading">Popular Now</Heading>
        <div className="books__row">
          <div className="book">
            <img src="\assets\bookcovers\A Portrait of the Artist as a Young Man - Roman Muradov.png" alt="" className="book__cover" />
            <caption className="book__name">The Amazing Spider-man</caption>
          </div>
          <div className="book">
            <img src="\assets\bookcovers\A Portrait of the Artist as a Young Man - Roman Muradov.png" alt="" className="book__cover" />
            <caption className="book__name">The Amazing Spider-man</caption>
          </div>
          <div className="book">
            <img src="\assets\bookcovers\A Portrait of the Artist as a Young Man - Roman Muradov.png" alt="" className="book__cover" />
            <caption className="book__name">The Amazing Spider-man</caption>
          </div>
          <div className="book">
            <img src="\assets\bookcovers\A Portrait of the Artist as a Young Man - Roman Muradov.png" alt="" className="book__cover" />
            <caption className="book__name">The Amazing Spider-man</caption>
          </div>
          <div className="book">
            <img src="\assets\bookcovers\A Portrait of the Artist as a Young Man - Roman Muradov.png" alt="" className="book__cover" />
            <caption className="book__name">The Amazing Spider-man</caption>
          </div>
          <div className="book">
            <img src="\assets\bookcovers\A Portrait of the Artist as a Young Man - Roman Muradov.png" alt="" className="book__cover" />
            <caption className="book__name">The Amazing Spider-man</caption>
          </div>
          <div className="book">
            <img src="\assets\bookcovers\Amazing Spider-Man Vol 1 316.png" alt="" className="book__cover" />
            <caption className="book__name">The Amazing Spider-man</caption>
          </div>
        </div>
        <Heading className="home__heading">New Series Collection</Heading>

      </div>
      <div className="home__right">
        <canvas ref={(el) => (canvas = el)} id="threejsCanvas"></canvas>
      </div>
    </div>
  );
}

export default HomePage;
