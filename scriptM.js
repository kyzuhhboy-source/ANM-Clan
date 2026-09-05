/* =========================================================
   IZUMO CLAN — MASUK SCRIPT
========================================================= */


/* =========================================================
   ELEMENT
========================================================= */

const menuButton =
    document.getElementById("menuButton");

const navMenu =
    document.getElementById("navMenu");

const joinForm =
    document.getElementById("joinForm");

const submitButton =
    document.getElementById("submitButton");

const backTop =
    document.getElementById("backTop");


/* =========================================================
   MENU NAVIGATION
========================================================= */

function closeMenu() {

    if (!menuButton || !navMenu) {
        return;
    }

    menuButton.classList.remove(
        "active"
    );

    navMenu.classList.remove(
        "open"
    );

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

}


if (menuButton && navMenu) {

    menuButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            const opened =
                navMenu.classList.toggle(
                    "open"
                );

            menuButton.classList.toggle(
                "active",
                opened
            );

            menuButton.setAttribute(
                "aria-expanded",
                String(opened)
            );

        }
    );


    navMenu
        .querySelectorAll("a")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                closeMenu
            );

        });


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
   BUILD PENDAFTARAN
========================================================= */

function buildWhatsAppMessage() {

    const namaElement =
        document.getElementById("nama");

    const nomorElement =
        document.getElementById("nomor");

    const apkElement =
        document.getElementById("apk");

    const levelElement =
        document.querySelector(
            'input[name="level"]:checked'
        );


    const nama =
        namaElement.value.trim();

    const nomor =
        nomorElement.value.trim();

    const apk =
        apkElement.value.trim();

    const level =
        levelElement
            ? levelElement.value
            : "-";


    return `*PENDAFTARAN ANM CLAN*

━━━━━━━━━━━━━━━━━━

*IDENTITAS*

Nama:
${nama}

Nomor WhatsApp:
${nomor}

━━━━━━━━━━━━━━━━━━

*KEMAMPUAN*

Level Editing:
${level}

APK / Software:
${apk}

━━━━━━━━━━━━━━━━━━

Saya menyatakan bahwa data yang saya berikan benar dan bersedia mengikuti aturan A.N.M Clan.

Terima kasih.`;

}


/* =========================================================
   FORM SUBMIT
========================================================= */

if (joinForm) {

    joinForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const nama =
                document
                    .getElementById("nama")
                    .value
                    .trim();


            const nomor =
                document
                    .getElementById("nomor")
                    .value
                    .trim();


            const apk =
                document
                    .getElementById("apk")
                    .value
                    .trim();


            const level =
                document.querySelector(
                    'input[name="level"]:checked'
                );


            const agreement =
                document.getElementById(
                    "agreement"
                );


            /* =============================================
               VALIDASI NAMA
            ============================================== */

            if (!nama) {

                alert(
                    "Nama belum diisi."
                );

                document
                    .getElementById("nama")
                    .focus();

                return;
            }


            /* =============================================
               VALIDASI NOMOR
            ============================================== */

            if (!nomor) {

                alert(
                    "Nomor WhatsApp belum diisi."
                );

                document
                    .getElementById("nomor")
                    .focus();

                return;
            }


            /* =============================================
               VALIDASI LEVEL
            ============================================== */

            if (!level) {

                alert(
                    "Silakan pilih level editing."
                );

                return;
            }


            /* =============================================
               VALIDASI APK
            ============================================== */

            if (!apk) {

                alert(
                    "APK / Software belum diisi."
                );

                document
                    .getElementById("apk")
                    .focus();

                return;
            }


            /* =============================================
               VALIDASI PERSETUJUAN
            ============================================== */

            if (!agreement.checked) {

                alert(
                    "Centang persetujuan terlebih dahulu."
                );

                return;
            }


            /* =============================================
               BUTTON LOADING
            ============================================== */

            submitButton.classList.add(
                "loading"
            );

            submitButton
                .querySelector("span")
                .textContent =
                "MENYALIN DATA...";


            /* =============================================
               BUILD FORMAT PENDAFTARAN
            ============================================== */

            const message =
                buildWhatsAppMessage();


            /* =============================================
               COPY CLIPBOARD
            ============================================== */

            try {

                /*
                 * Cara utama
                 */

                if (
                    navigator.clipboard &&
                    window.isSecureContext
                ) {

                    await navigator.clipboard.writeText(
                        message
                    );

                }

                /*
                 * Fallback untuk file lokal
                 */

                else {

                    const textarea =
                        document.createElement(
                            "textarea"
                        );

                    textarea.value =
                        message;

                    textarea.style.position =
                        "fixed";

                    textarea.style.left =
                        "-9999px";

                    textarea.style.top =
                        "0";

                    textarea.style.width =
                        "1px";

                    textarea.style.height =
                        "1px";

                    textarea.style.opacity =
                        "0";

                    textarea.setAttribute(
                        "readonly",
                        ""
                    );

                    document.body.appendChild(
                        textarea
                    );

                    textarea.focus();

                    textarea.select();

                    textarea.setSelectionRange(
                        0,
                        textarea.value.length
                    );


                    const copied =
                        document.execCommand(
                            "copy"
                        );


                    document.body.removeChild(
                        textarea
                    );


                    if (!copied) {

                        throw new Error(
                            "Clipboard gagal"
                        );

                    }

                }


                /* =============================================
                   BUKA GRUP WHATSAPP
                ============================================== */

                submitButton
                    .querySelector("span")
                    .textContent =
                    "MEMBUKA GRUP...";


                window.location.href =
                    "https://chat.whatsapp.com/DfkzP844gwsHEFX3Sl2I8h";


            } catch (error) {

                console.error(
                    "Gagal menyalin data:",
                    error
                );


                submitButton.classList.remove(
                    "loading"
                );


                submitButton
                    .querySelector("span")
                    .textContent =
                    "KIRIM PENDAFTARAN";


                alert(
                    "Data gagal disalin ke clipboard. Coba jalankan website melalui HTTPS atau server lokal."
                );


                return;

            }

        }
    );

}


/* =========================================================
   PHONE INPUT
========================================================= */

const phoneInput =
    document.getElementById("nomor");


if (phoneInput) {

    phoneInput.addEventListener(
        "input",
        function () {

            this.value =
                this.value.replace(
                    /[^0-9+]/g,
                    ""
                );

        }
    );

}


/* =========================================================
   BACK TO TOP
========================================================= */

if (backTop) {

    window.addEventListener(
        "scroll",
        function () {

            if (
                window.scrollY > 500
            ) {

                backTop.classList.add(
                    "show"
                );

            } else {

                backTop.classList.remove(
                    "show"
                );

            }

        },
        {
            passive: true
        }
    );


    backTop.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   PREVENT ENTER SUBMIT
   EXCEPT TEXTAREA
========================================================= */

if (joinForm) {

    joinForm.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" &&
                event.target.tagName !==
                "TEXTAREA"
            ) {

                event.preventDefault();

            }

        }
    );

}
