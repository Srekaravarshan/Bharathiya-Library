import React, { useEffect, useRef, useState } from "react";
import "./HomePage.css";
import { gsap } from "gsap";
import Heading from "../../components/typography/Heading";
import * as THREE from "three";
import Header from "../../components/widgets/Header";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import Caption from "../../components/typography/Caption";
import Heading2 from "../../components/typography/Heading2";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";

function HomePage() {
  let canvas = useRef();

  // useEffect(() => {
  //   const textureLoader = new THREE.TextureLoader();
  //   const normalTexture = textureLoader.load("/assets/NormalMap.png");

  //   const scene = new THREE.Scene();
  //   // Objects
  //   const geometry = new THREE.SphereGeometry(0.5, 12, 12);
  //   // var geometry = new THREE.BufferGeometry().fromGeometry(sphereGeometry);

  //   // var geometry = THREE.BufferGeometryLoader.fromGeometry( sphere );
  //   // const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);

  //   // Materials

  //   const material = new THREE.MeshStandardMaterial();
  //   material.metalness = 0.7;
  //   material.roughness = 0.2;
  //   material.normalMap = normalTexture;
  //   material.color = new THREE.Color(0x292929);

  //   // Mesh
  //   const sphere = new THREE.Mesh(geometry, material);
  //   scene.add(sphere);

  //   // Lights

  //   const pointLight = new THREE.PointLight(0xffffff, 0.1);
  //   pointLight.position.x = 2;
  //   pointLight.position.y = 3;
  //   pointLight.position.z = 4;
  //   scene.add(pointLight);

  //   const pointLight2 = new THREE.PointLight(0xff0000, 2);
  //   pointLight2.position.set(-1.86, 1, -0.4);
  //   pointLight2.intensity = 30;
  //   scene.add(pointLight2);

  //   const pointLight3 = new THREE.PointLight(0xe1ff, 2);
  //   pointLight3.position.set(2.13, -3, -1.98);
  //   pointLight3.intensity = 20;
  //   scene.add(pointLight3);

  //   /**
  //    * Sizes
  //    */
  //   const sizes = {
  //     width: 450,
  //     height: 450,
  //   };

  //   // window.addEventListener("resize", () => {
  //   //   // Update sizes
  //   //   sizes.width = 400;
  //   //   sizes.height = 400;

  //   //   // Update camera
  //   //   camera.aspect = sizes.width / sizes.height;
  //   //   camera.updateProjectionMatrix();

  //   //   // Update renderer
  //   //   renderer.setSize(sizes.width, sizes.height);
  //   //   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  //   // });
  //   /////////////////////

  //   const camera = new THREE.PerspectiveCamera(
  //     75,
  //     sizes.width / sizes.height,
  //     0.1,
  //     100
  //   );
  //   camera.position.x = 0;
  //   camera.position.y = 0;
  //   camera.position.z = 0.9;
  //   scene.add(camera);

  //   // Controls
  //   // const controls = new OrbitControls(camera, canvas)
  //   // controls.enableDamping = true

  //   /**
  //    * Renderer
  //    */
  //   const renderer = new THREE.WebGLRenderer({
  //     canvas: canvas,
  //     alpha: true,
  //   });
  //   renderer.setSize(sizes.width, sizes.height);
  //   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  //   const clock = new THREE.Clock();

  //   const tick = () => {
  //     const elapsedTime = clock.getElapsedTime();

  //     // Update objects
  //     sphere.rotation.y = 0.5 * elapsedTime;
  //     // Update Orbital Controls
  //     // controls.update()

  //     // Render
  //     renderer.render(scene, camera);

  //     // Call tick again on the next frame
  //     window.requestAnimationFrame(tick);
  //   };

  //   tick();
  // });

  const [{ popularBooks }, dispatch] = useStateValue();

  const addBook = async () => {
    const title = "Marvel Avengers Alliance";
    const searchTerms = ["amazing", "spider", "avengers"];
    const author = "Fabian Nicieza";
    const searchauthor = "Fabian Nicieza";
    const subject_people =
      "Fabian Nicieza, Sam Wood, Paco Díaz";
    const cover =
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1460560194i/29909667.jpg";
    const price = "100";
    const description =
      "War has been declared on Earth by the Black Order...and the Avengers Alliance is the planet's only hope for survival! A Chitauri invasion means the core team is going to need reinforcements! Nova, Ms. Marvel, and Squirrel Girl join the fray—with a special appearance by the Guardians of the Galaxy! But will they be enough to stave off the invasions? It's all hands on deck for the Avengers Alliance as they combat a powerful new threat in the Redwood Forest. The battle for Earth reaches a critical stage in this epic adventure bridging the story between the smash hit mobile game Avengers Alliance and the upcoming Avengers Alliance 2!";
    const subjects = [
      "Comics",
      "Graphic Novels",
      "Marvel",
      "Spider Man",
      "Superheroes",
    ];
    const pages = "29";
    const ISBN = "";
    const language = "English";
    const edition = "1";
    const copies = "20";

    const id = uuidv4();
    const searchKeywords = [];

    var temp = "";

    for (var i = 0; i < searchTerms.length; i++) {
      temp = "";
      for (var j = 0; j < searchTerms[i].length; j++) {
        temp += searchTerms[i].charAt(j);
        searchKeywords.push(temp);
      }
    }

    const temptitle = title.toLowerCase();
    const tempauthor = searchauthor.toLowerCase();
    temp = "";
    for (var i = 0; i < title.length; i++) {
      temp += temptitle.charAt(i);
      searchKeywords.push(temp);
    }
    temp = "";
    for (var i = 0; i < author.length; i++) {
      temp += tempauthor.charAt(i);
      searchKeywords.push(temp);
    }
    const temp_title = title.toLowerCase().replace(" ", "");

    const docData = {
      title: title,
      temp_title: temp_title,
      cover_url: cover,
      language: language,
      author: author,
      price: price,
      ISBN: ISBN,
      pages: pages,
      subjects: subjects,
      copies: copies,
      id: id,
      description: description,
      edition: edition,
      searchKeywords: searchKeywords,
      subject_people: subject_people,
    };

    await setDoc(doc(db, "books", id), docData);
  };

  return (
    <div className="home page">
      <div className="home__left">
        {/* <button className="button" onClick={addBook}>
          Add Book
        </button> */}
        <Header
          className="home__header"
          title="Happy reading, Srekaravarshan."
        />
        <Heading className="home__heading">Popular Now</Heading>
        <div className="books__row">
          {Object.values(popularBooks).map((book) => (
            <Link to={`/books/${book.id}`} key={book.id} className="book">
              <img src={book.cover_url} alt="" className="book__cover" />
              <Heading2 className="book__name">{book.title}</Heading2>
            </Link>
          ))}
        </div>
      </div>
      <div className="home__right">
        <canvas ref={(el) => (canvas = el)} id="threejsCanvas"></canvas>
      </div>
    </div>
  );
}

export default HomePage;
