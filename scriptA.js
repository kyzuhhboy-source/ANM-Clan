/* =========================================================
   IZUMO CLAN
   ANGGOTA SCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const menuButton =
    document.getElementById(
        "menuButton"
    );


const navMenu =
    document.getElementById(
        "navMenu"
    );


const backTop =
    document.getElementById(
        "backTop"
    );



/* =========================================================
   MENU
========================================================= */

if (
    menuButton &&
    navMenu
) {


    menuButton.addEventListener(
        "click",
        function () {


            const open =
                navMenu.classList.toggle(
                    "open"
                );


            menuButton.classList.toggle(
                "active",
                open
            );


            menuButton.setAttribute(
                "aria-expanded",
                String(open)
            );


        }
    );


    /* -----------------------------------------
       CLOSE OUTSIDE
    ----------------------------------------- */

    document.addEventListener(
        "click",
        function (event) {


            if (
                !event.target.closest(
                    ".navbar"
                )
            ) {

                closeMenu();

            }


        }
    );


    /* -----------------------------------------
       CLOSE LINK
    ----------------------------------------- */

    navMenu
        .querySelectorAll("a")
        .forEach(
            function (link) {


                link.addEventListener(
                    "click",
                    function () {

                        closeMenu();

                    }
                );


            }
        );


    /* -----------------------------------------
       ESCAPE
    ----------------------------------------- */

    document.addEventListener(
        "keydown",
        function (event) {


            if (
                event.key === "Escape"
            ) {

                closeMenu();

            }


        }
    );


    function closeMenu() {


        navMenu.classList.remove(
            "open"
        );


        menuButton.classList.remove(
            "active"
        );


        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );


    }


}



/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (
    "IntersectionObserver"
    in window
) {


    const revealObserver =
        new IntersectionObserver(
            function (
                entries,
                observer
            ) {


                entries.forEach(
                    function (entry) {


                        if (
                            entry.isIntersecting
                        ) {


                            entry.target.classList.add(
                                "visible"
                            );


                            observer.unobserve(
                                entry.target
                            );


                        }


                    }
                );


            },
            {

                threshold:
                    0.08

            }
        );


    revealElements.forEach(
        function (element) {

            revealObserver.observe(
                element
            );

        }
    );


} else {


    revealElements.forEach(
        function (element) {

            element.classList.add(
                "visible"
            );

        }
    );


}



/* =========================================================
   BACK TO TOP
========================================================= */

if (backTop) {


    backTop.addEventListener(
        "click",
        function () {


            window.scrollTo({

                top:
                    0,

                behavior:
                    "smooth"

            });


        }
    );


}



/* =========================================================
   IMAGE FALLBACK
========================================================= */

document
    .querySelectorAll(
        "img"
    )
    .forEach(
        function (image) {


            image.addEventListener(
                "error",
                function () {


                    this.style.opacity =
                        "0";


                    this.style.background =
                        "#24102d";


                    this.setAttribute(
                        "alt",
                        "IZUMO"
                    );


                }
            );


        }
    );



/* =========================================================
   INTERNAL ANCHOR
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        function (link) {


            link.addEventListener(
                "click",
                function (event) {


                    const id =
                        this.getAttribute(
                            "href"
                        );


                    if (
                        id === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            id
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    const offset =
                        75;


                    const position =
                        target.getBoundingClientRect()
                            .top
                        +
                        window.scrollY
                        -
                        offset;


                    window.scrollTo({

                        top:
                            position,

                        behavior:
                            "smooth"

                    });


                }
            );


        }
    );



/* =========================================================
   PAGE LOADED
========================================================= */

window.addEventListener(
    "load",
    function () {

        document.body.classList.add(
            "page-loaded"
        );

    }
);