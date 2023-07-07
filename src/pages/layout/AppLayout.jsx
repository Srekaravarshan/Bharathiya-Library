import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./AppLayout.css";
import { ReactComponent as HomeIcon } from "./../../assets/icons/home-5-line.svg";
import { ReactComponent as BookIcon } from "./../../assets/icons/book-line.svg";
import { ReactComponent as BookmarkIcon } from "./../../assets/icons/shopping-cart-line.svg";
import { ReactComponent as SettingsIcon } from "./../../assets/icons/settings-line.svg";
import { ReactComponent as MenuIcon } from "./../../assets/icons/account-circle-line.svg";
import { ReactComponent as HeartIcon } from "./../../assets/icons/hearts-line.svg";
import { ReactComponent as SearchIcon } from "./../../assets/icons/search-2-line.svg";
import { Link, Router, Route, Outlet } from "react-router-dom";
import { gsap } from "gsap";
import Heading2 from "../../components/typography/Heading2";
import { useStateValue } from "../../StateProvider";

function AppLayout({ timeline, ease }) {
  let container = useRef();
  let logo = useRef(null);
  let home = useRef(null);
  let search = useRef(null);
  let book = useRef(null);
  let bookmarks = useRef(null);
  let settings = useRef(null);
  let menu = useRef(null);

  let cursor = useRef();
  let tl = new gsap.timeline();

  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    timeline.to([logo, home, search, book, bookmarks, settings, menu], 0.6, {
      y: "0",
      opacity: 1,
      stagger: 0.1,
      ease: ease,
    });

  }, []);

  useEffect(() => {

    tl.to(cursor, 0.016, {
      css: {
        left: mouseX,
        top: mouseY,
      },
    });
  })

  function handleMouseMove(ev) {
    var x = ev.clientX;
    var y = ev.clientY;
    setMouseX(x);
    setMouseY(y);
  }

  const [{ user }, dispatch] = useStateValue();
  return (
    <>
      <div ref={(el) => (cursor = el)} className="cursor"></div>
      <div
        className="layout"
        ref={(el) => (container = el)}
        onMouseMove={(ev) => handleMouseMove(ev)}
      >
        <nav className="sidebar">
          <Link to="/" className="sidebar__top">
            <HeartIcon
              className="sidebar__icon sidebar__icon--logo"
              ref={(el) => (logo = el)}
            />
          </Link>
          <div className="sidebar__middle">
            <ul>
              <Link to="/" className="nav__link ">
                <HomeIcon
                  ref={(el) => (home = el)}
                  className="sidebar__icon nav__icon"
                />
              </Link>
              <Link to="/search" className="nav__link ">
                <SearchIcon
                  ref={(el) => (search = el)}
                  className="sidebar__icon nav__icon"
                />
              </Link>
              <Link className="nav__link " to="/books">
                <BookIcon
                  ref={(el) => (book = el)}
                  className="sidebar__icon nav__icon "
                />
              </Link>
              <Link className="nav__link " to="/cart">
                <BookmarkIcon
                  ref={(el) => (bookmarks = el)}
                  className="sidebar__icon nav__icon "
                />
              </Link>
              <Link className="nav__link " to="/settings">
                <SettingsIcon
                  ref={(el) => (settings = el)}
                  className="sidebar__icon nav__icon "
                />
              </Link>
            </ul>
          </div>
          <Link to="/login" className="sidebar__bottom">
            <MenuIcon
              ref={(el) => (menu = el)}
              className="sidebar__icon nav__icon sidebar__menu--icon"
            />
          </Link>
        </nav>
        <div className="layout__body">
          <nav className="layout__top-nav">
            <div></div>
            <Link to="/login" className="layout__profile">
              {user && user.profile ? (
                <img
                  src={user.profile}
                  alt=""
                  className="layout__profile--image"
                />
              ): (
                <MenuIcon />
              ) }
              <Heading2 className="layout__profile--name">{user && user.username? user.username: user ? user.email : "Login"}</Heading2>
            </Link>
          </nav>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AppLayout;
