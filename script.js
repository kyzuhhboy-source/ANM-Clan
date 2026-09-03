/* =========================================================
   IZUMO CLAN
   INDEX SCRIPT
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

            const isOpen =
                navMenu.classList.toggle(
                    "open"
                );


            menuButton.classList.toggle(
                "active",
                isOpen
            );


            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
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
       CLOSE MENU
    ----------------------------------------- */

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


    /* -----------------------------------------
       CLOSE WHEN LINK CLICKED
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
                    0.1

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
   SMOOTH INTERNAL LINKS
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


                    const targetID =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetID ||
                        targetID === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    const offset =
                        80;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top
                        +
                        window.scrollY
                        -
                        offset;


                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });


                }
            );


        }
    );



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
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".nav-menu a[href^='#']"
    );


if (
    sections.length &&
    navLinks.length &&
    "IntersectionObserver" in window
) {


    const sectionObserver =
        new IntersectionObserver(
            function (entries) {


                entries.forEach(
                    function (entry) {


                        if (
                            entry.isIntersecting
                        ) {


                            navLinks.forEach(
                                function (link) {

                                    link.classList.remove(
                                        "active"
                                    );

                                }
                            );


                            const activeLink =
                                document.querySelector(
                                    `.nav-menu a[href="#${entry.target.id}"]`
                                );


                            if (
                                activeLink
                            ) {

                                activeLink.classList.add(
                                    "active"
                                );

                            }


                        }

                    }
                );


            },
            {

                rootMargin:
                    "-35% 0px -55% 0px",

                threshold:
                    0

            }
        );


    sections.forEach(
        function (section) {

            sectionObserver.observe(
                section
            );

        }
    );

}



/* =========================================================
   BACK TO TOP VISIBILITY
========================================================= */

if (backTop) {


    function updateBackTop() {


        if (
            window.scrollY > 400
        ) {

            backTop.style.opacity =
                "1";

            backTop.style.pointerEvents =
                "auto";


        } else {

            backTop.style.opacity =
                ".5";

            backTop.style.pointerEvents =
                "auto";

        }

    }


    window.addEventListener(
        "scroll",
        updateBackTop,
        {
            passive:
                true
        }
    );


    updateBackTop();

}



/* =========================================================
   PROFILE IMAGE ERROR FALLBACK
========================================================= */

const profileImage =
    document.querySelector(
        ".profile-image img"
    );


if (profileImage) {


    profileImage.addEventListener(
        "error",
        function () {


            this.style.display =
                "none";


            const parent =
                this.parentElement;


            parent.classList.add(
                "image-missing"
            );


            parent.innerHTML +=
                `<span class="fallback-profile">IZ</span>`;


        }
    );

}



/* =========================================================
   PREVENT DOUBLE TAP ZOOM ON BUTTONS
========================================================= */

document
    .querySelectorAll(
        "button, .main-button, .cta-button"
    )
    .forEach(
        function (element) {

            element.addEventListener(
                "touchstart",
                function () {},
                {
                    passive:
                        true
                }
            );

        }
    );



/* =========================================================
   PAGE READY
========================================================= */

window.addEventListener(
    "load",
    function () {

        document.body.classList.add(
            "page-loaded"
        );

    }
);