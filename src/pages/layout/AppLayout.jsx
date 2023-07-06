import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./AppLayout.css";
import { ReactComponent as HomeIcon } from "./../../assets/icons/home-5-line.svg";
import { ReactComponent as BookIcon } from "./../../assets/icons/book-line.svg";
import { ReactComponent as BookmarkIcon } from "./../../assets/icons/bookmark-line.svg";
import { ReactComponent as SettingsIcon } from "./../../assets/icons/settings-line.svg";
import { ReactComponent as MenuIcon } from "./../../assets/icons/menu-4-line.svg";
import { ReactComponent as HeartIcon } from "./../../assets/icons/hearts-line.svg";
import { Link, Router, Route, Outlet } from "react-router-dom";
import { gsap } from "gsap";
import { TweenLite } from "gsap/gsap-core";

function AppLayout({ timeline, ease }) {
  let container = useRef();
  let logo = useRef(null);
  let home = useRef(null);
  let book = useRef(null);
  let bookmarks = useRef(null);
  let settings = useRef(null);
  let menu = useRef(null);

  let cursor = useRef();
  let tl = new gsap.timeline()

  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  // useEffect(() => {
  //   console.log('hhhh')
  //   timeline.to(cursor, 0.019, {
  //     // css: {
  //       left: 100,
  //       top: 100,
  //     // }
  //   })
  // },[MousePosition] )

  useEffect(() => {
    
// let cursorScale = document.querySelectorAll('.'); 

    // cursorScale.forEach((link) => {
    //   // console.log(link)
    //   link.addEventListener("mousemove", () => {
    //     cursor.class+=(" grow");
    //     if (link.class.contains("small")) {
    //       cursor.class.replace(/grow/g, '');
    //       cursor.class+=(" grow-small");
    //     }
    //   });

    //   link.addEventListener("mouseleave", () => {
    //     cursor.class.replace(/grow/g, '');
    //     cursor.class.replace(/grow-small/g,'');
    //   });
    // });
    // const x = gsap.quickTo("#id_element_to_move", "x", {
    //   duration: 0.5,
    //   ease: "power2",
    // });
    // const y = gsap.quickTo("#id_element_to_move", "y", {
    //   duration: 0.5,
    //   ease: "power2",
    // });
    // window.addEventListener("mousemove", (e) => {
    //   x(e.clientX);
    //   y(e.clientY);
    // });
    timeline.to([logo, home, book, bookmarks, settings, menu], 0.6, {
      y: "0",
      opacity: 1,
      stagger: 0.1,
      ease: ease
    });
    
    // if (cursor != null){
    // gsap.to({}, 0.000001, {
    //   repeat: -1,
    //   onRepeat: function () {
    //     gsap.set(cursor, {
    //       css: {
    //       left: MousePosition.x,
    //       top: MousePosition.y,
    //       },

    //     });
    //   },
    // });}
    
    tl.to(cursor, 0.016, {

      css: {
        left: mouseX,
        top: mouseY,
      }
    })
  });

  function handleMouseMove(ev) {
    var x = ev.clientX;
    var y = ev.clientY;
    setMouseX(x)
    setMouseY(y)
  }

  return (
    <>
      <div ref={(el) => (cursor = el)} className="cursor" ></div>
      {/* <div class="page">
        <h1 class="word" id="repeater">
          now refresh
        </h1>
      </div>
      <div id="app">
        <div class="overlay">
          <div class="title">
            <h2>
              Vue.js <span>&</span> Gsap
            </h2>
            <h3 class="txt-small">photo preloader</h3>
          </div>

          <div class="images">
            <div
              v-for="img in images"
              class="img"
              // :class="img.class"
            ></div>
          </div>

          <div class="copy txt-small">&copy; photo source: unsplash</div>
        </div>
      </div> */}
      <div
        className="layout"
        ref={(el) => (container = el)}
        onMouseMove={(ev) => handleMouseMove(ev)}
      >
        <nav className="sidebar">
          <div className="sidebar__top">
            <HeartIcon
              className="sidebar__icon sidebar__icon--logo"
              ref={(el) => (logo = el)}
            />
          </div>
          <div className="sidebar__middle">
            <ul>
              <Link to="/" className="nav__link ">
                <HomeIcon 
                  ref={(el) => (home = el)}
                  className="sidebar__icon nav__icon nav__icon--selected"
                />
              </Link>
              <Link className="nav__link " to="/books">
                <BookIcon
                  ref={(el) => (book = el)}
                  className="sidebar__icon nav__icon "
                />
              </Link>
              <Link className="nav__link " to="/bookmarks">
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
          <div className="sidebar__bottom">
            <MenuIcon
              ref={(el) => (menu = el)}
              className="sidebar__icon nav__icon sidebar__menu--icon"
            />
          </div>
        </nav>
        <Outlet />
      </div>
    </>
  );
}

export default AppLayout;
