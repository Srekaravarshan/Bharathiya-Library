import Heading from "../../components/typography/Heading";
import "./Settings.css";
import React from "react";
import { useStateValue } from "./../../StateProvider";
import { authentication } from "../../firebase";
import ImageHeader from "../../components/typography/ImageHeader";
import Heading2 from "../../components/typography/Heading2";
import Caption from "../../components/typography/Caption";
import { ReactComponent as LinkArrow } from "./../../assets/icons/arrow-right-up-line.svg";
import { ReactComponent as BookmarkIcon } from "./../../assets/icons/bookmark-line.svg";
import { ReactComponent as ShareIcon } from "./../../assets/icons/share-line.svg";
import { ReactComponent as DownloadIcon } from "./../../assets/icons/skip-down-line.svg";

function Settings() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthenticaton = () => {
    if (user) {
      authentication.signOut();
    }
  };

  return (
    <div className="about page">
      <div className="about__title">
        <Heading className="about__heading">
          <span className="about__heading--span">Settings</span> About
        </Heading>
        <span>😅</span>
      </div>
      <div className="bookdetail__top">
        <img
          src="\assets\images\pro.jpg"
          alt=""
          className="bookdetail__cover"
        />
        <div className="bookdetail__meta">
          <div>
            <h1 className="bookdetail__title">Srekaravarshan N K</h1>
            <Caption className="bookdetail__caption mb-2">
              "I think it is possible for ordinary people to choose to be
              extraordinary."
            </Caption>
            <Heading2 className="mb-2 highlight">- Elon Musk</Heading2>
          </div>
          <div className="bookdetail__buttons">
            <button className="button bookdetail__button">
              Start reading <LinkArrow className="bookdetail__button--icon" />
            </button>
            <div className="bookdetail__actions">
              <BookmarkIcon className="bookdetail__action--icon" />
              <ShareIcon className="bookdetail__action--icon" />
              <DownloadIcon className="bookdetail__action--icon" />
            </div>
          </div>
        </div>
      </div>
      <div className="bookdetail__bottom">
        <div className="bookdetail__left">
          <Heading2 className="mb-2 highlight">Description</Heading2>
          <Caption className="bookdetail__caption bookdetail__desc mb-3">
            Developer with 3 years of experience working on own product
            applications. I am self-learned, hard working and responsible
            person. I have well knowledge in OOPs concepts, SQL and NoSQL
            Databases, Java, Flutter and React.
          </Caption>
          <Heading2 className="mb-2 highlight">Experience</Heading2>
          <div className="experience__card">
            <Heading2 className="experience__card--title">
              Velammal Hospital - Patient DB
            </Heading2>
            <Caption className="experience__card--caption">
              2021 - JavaFX | MySQL
            </Caption>
            <p className="experience__card--desc">
              Patient Database JavaFX application - for storing patient details
              at CAG department and mainly for analytics with MySQL database
            </p>
            <div className="experience__card--actions">
              <a
                className="experience__card--button button"
                target="_blank"
                href="https://github.com/Srekaravarshan/VMC-Hospital-Management"
              >
                Gitub
              </a>
              <a
                className="experience__card--button button"
                target="_blank"
                href="https://drive.google.com/file/d/1JZKj2eB8SIGEYtCbDA2f86wOlUEIYJgU/view"
              >
                Exe file
              </a>
            </div>
          </div>
          <div className="experience__card">
            <Heading2 className="experience__card--title">Ashtothram</Heading2>
            <Caption className="experience__card--caption">
              2022 - Flutter
            </Caption>
            <p className="experience__card--desc">
              Flutter Manthra database app - built for have various manthras in
              single application.
            </p>
            <div className="experience__card--actions">
              <a
                className="experience__card--button button"
                target="_blank"
                href="https://play.google.com/store/apps/details?id=com.maayon.ashtothram"
              >
                Playstore
              </a>
            </div>
          </div>
          <div className="experience__card">
            <Heading2 className="experience__card--title">
              Gothrakhandam
            </Heading2>
            <Caption className="experience__card--caption">
              2020 - Android Studio
            </Caption>
            <p className="experience__card--desc">
              Gothrakhandam is an android app helps sourashtra community to know
              their gothram details.
            </p>
            <div className="experience__card--actions">
              <a
                className="experience__card--button button"
                target="_blank"
                href="https://play.google.com/store/apps/details?id=com.Sre.gothrakhando"
              >
                Playstore
              </a>
            </div>
          </div>
          <div className="experience__card">
            <Heading2 className="experience__card--title">Numerology</Heading2>
            <Caption className="experience__card--caption">
              2021 - Android Studio
            </Caption>
            <p className="experience__card--desc">
              Numerology app helps to choose names with numerology algorithm and
              contains every benefits of their names.
            </p>
            <div className="experience__card--actions">
              <a
                className="experience__card--button button"
                target="_blank"
                href="https://play.google.com/store/apps/details?id=com.triplestar.numerology"
              >
                Playstore
              </a>
            </div>
          </div>
          <div className="experience__card">
            <Heading2 className="experience__card--title">
              Prohithar Portfolio Website
            </Heading2>
            <Caption className="experience__card--caption">
              2021 - HTML | CSS | JS | EJS
            </Caption>
            {/* <p className="experience__card--desc">
              Numerology app helps to choose names with numerology algorithm and
              contains every benefits of their names.
            </p> */}
            <div className="experience__card--actions">
              <a
                className="experience__card--button button"
                target="_blank"
                href="https://prohithar-b4d02.web.app/"
              >
                Website
              </a>
            </div>
          </div>
          <div className="experience__card">
            <Heading2 className="experience__card--title">NOVA Green</Heading2>
            <Caption className="experience__card--caption">
              2021 - Flutter | Firebase
            </Caption>
            <p className="experience__card--desc">
              ECommerce app for Plants and Seeds with Firestore database
            </p>
          </div>
          <div className="experience__card">
            <Heading2 className="experience__card--title">Kalvettiyal</Heading2>
            <Caption className="experience__card--caption">
              2022 - OCR | Python
            </Caption>
            <p className="experience__card--desc">
              Working on OCR for Ancient Tamil letters from Inscriptions. With
              own Ancient Tamil Dataset
            </p>
          </div>
          <div className="experience__card">
            <Heading2 className="experience__card--title">Futcrick</Heading2>
            <Caption className="experience__card--caption">
              2020 - Firebase | Express API
            </Caption>
            <p className="experience__card--desc">
              Real time Football and Cricket Score application with real time
              Express API
            </p>
          </div>
          <div className="experience__card">
            <Heading2 className="experience__card--title">Nalabagam</Heading2>
            <Caption className="experience__card--caption">
              2022 - Flutter | API
            </Caption>
            <p className="experience__card--desc">
              Food Recipes Flutter application with existing API
            </p>
          </div>
        </div>
        <div className="bookdetail__right">
          <Heading2 className="mb-2 highlight">Contact</Heading2>
          <Caption className="bookdetail__caption">
            <a href="tel:+919940760543" className="link bookdetail__link">
              +91 9940760543
            </a>
            <a
              href="mailto:srekaravarshan@gmail.com"
              className="link bookdetail__link"
            >
              srekaravarshan@gmail.com
            </a>
            <a href="" className="link bookdetail__link">
              {" "}
              +91 9940760543
            </a>
            <span className="bookdetail__subheading ">Github:</span>
            <a
              target="_blank"
              href="https://github.com/Srekaravarshan"
              className="link bookdetail__link"
            >
              github.com/Srekaravarshan
            </a>

            <span className="bookdetail__subheading">
              User Interface Designs:
            </span>
            <a
              target="_blank"
              href="https://dribbble.com/Srekaravarshan"
              className="link bookdetail__link"
            >
              dribbble.com/Srekaravarshan
            </a>

            <span className="bookdetail__subheading">Playstore:</span>
            <a
              target="_blank"
              href="https://play.google.com/store/apps/dev?id=8624718577991878103"
              className="link bookdetail__link"
            >
              Nova Software Company
            </a>
          </Caption>
          <Heading2 className="mb-2 highlight">Education & Intern</Heading2>
          <div className="experience__card">
            <div className="experience__card--left">
              <img
                className="experience__card--logo"
                src="/assets/images/economize.jfif"
                alt=""
              />
              <div className="experience__card--right">
                <Heading2 className="experience__card--title">
                  Economize - Intern
                </Heading2>
                <Caption className="experience__card--caption">
                  July 2023
                </Caption>
                <p className="experience__card--desc">
                  Software Developer Intern
                </p>
              </div>
            </div>
          </div>
          <div className="experience__card">
            <div className="experience__card--left">
              <img
                className="experience__card--logo"
                src="/assets/images/velammal.jfif"
                alt=""
              />
              <div className="experience__card--right">
                <Heading2 className="experience__card--title">
                  Velammal College of Enginnering and Technology
                </Heading2>
                <Caption className="experience__card--caption">
                  2020 - 2024
                </Caption>
                <p className="experience__card--desc">CGPA: 8.6</p>
              </div>
            </div>
          </div>
          <div className="experience__card">
            <div className="experience__card--left">
              <img
                className="experience__card--logo"
                src="/assets/images/rose.png"
                alt=""
              />
              <div className="experience__card--right">
                <Heading2 className="experience__card--title">
                  Rose Matric Hr. Sec. School
                </Heading2>
                <Caption className="experience__card--caption">
                  10th - 84.8% | 12th - 71.8%
                </Caption>
              </div>
            </div>
          </div>
          <Heading2 className="mb-2 highlight">Skills</Heading2>
          <Caption className="mb-1">UI/UX Design</Caption>
          <Caption className="mb-1">Java | JavaFX</Caption>
          <Caption className="mb-1">Golang</Caption>
          <Caption className="mb-1">Flutter | Dart</Caption>
          <Caption className="mb-1">HTML | CSS</Caption>
          <Caption className="mb-1">JavaScript</Caption>
          <Caption className="mb-1">ReactJS | EJS</Caption>
          <Caption className="mb-1">Android Studio</Caption>
          <Caption className="mb-1">NodeJS</Caption>
          <Caption className="mb-1">MySQL</Caption>
          <Caption className="mb-1">Firebase</Caption>
        </div>
      </div>
    </div>
  );
}

export default Settings;
