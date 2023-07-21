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

  const [have3D, setHave3D] = useState(false);

  let camera, scene, renderer;

  function init() {
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
    });
    renderer.setSize(450, 450);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  function render() {

    const texture = new THREE.TextureLoader();
    const normal = texture.load("/assets/NormalMap.png");

    const geometry = new THREE.SphereGeometry(0.5, 12, 12);

    const material = new THREE.MeshStandardMaterial();
    material.metalness = 0.7;
    material.roughness = 0.2;
    material.normalMap = normal;
    material.color = new THREE.Color(0x292929);

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

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

    camera = new THREE.PerspectiveCamera(
      75,
      450 / 450,
      0.1,
      100
    );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 0.9;
    scene.add(camera);

    geometry.dispose();
    material.dispose();
    normal.dispose()

    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      sphere.rotation.y = 0.5 * elapsedTime;
      renderer.render(scene, camera);
      if (!have3D) {
        renderer.dispose()
      } else {
        window.requestAnimationFrame(tick);
      }
    };

    tick();
  }

  useEffect(() => {
    if (have3D) {
      init();
      render();
    } else {
      // renderer.dispose()
    }
  }, [have3D]);

  const [{ popularBooks, user }, dispatch] = useStateValue();

  const addBook = async () => {
    const title = "Ready To Fire";
    const searchTerms = ["science", "rocket", "nambi", "narayanan"];
    const author = "Nambi Narayanan";
    const searchauthor = "Nambi Narayanan";
    const subject_people = "Nambi Narayanan, Arun Ram";
    const cover =
      "https://m.media-amazon.com/images/I/51Z+TFQzTnL.jpg";
    const price = "592";
    const description =
      "A top scientist is falsely accused of selling space technology secrets. A police inspector's misadventure with a Maldivian woman results in a fabricated espionage case. A faction within a political party capitalises on the case to bring down a government. An intelligence agency obligingly plays into the hands of vested interests to slow down India's space programme. And a complex investigation finally proves the allegations untrue. In this riveting book, Isro scientist S Nambi Narayanan - who was falsely accused of espionage in ISRO spy case of the 1990s - and senior journalist Arun Ram meticulously unpick the ISRO spy case, revisit old material and discover new details to expose the international plot that delayed India's development of a cryogenic engine by at least a decade. It took four years for the CBI to exonerate Nambi, but his fight for justice to ensure action against the officers who faked the case and tortured him in custody continues.This book is as much a history of the early days of India's ambitious space programme as it is a record of one of the most sensational cases that enthralled the nation long before the era of online updates and 24-hour news cycles.";
    const subjects = ["Science", "Technology", "Rocket"];
    const pages = "372";
    const ISBN = "9789386826268";
    const language = "English";
    const edition = "2";
    const copies = "1002";

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
          title={`Happy reading, ${user ? user.username : "Mate"}`}
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
        {have3D ? (
          <canvas ref={(el) => (canvas = el)} id="threejsCanvas"></canvas>
        ) : (
          <img src="/assets/images/3d.png" alt="" className="sphere" />
        )
        }

        <div className="switch__container">
          <Heading2 className="switch__title">Use 3D</Heading2>
          <label class="switch">
            <input
              type="checkbox"
              value={have3D}
              onChange={(e) => setHave3D(e.target.checked)}
            />
            <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
