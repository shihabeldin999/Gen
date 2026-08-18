"use strict";


/*
    ==============================
    ELEMENTS
    ==============================
*/

const form =
    document.getElementById("downloadForm");

const videoUrl =
    document.getElementById("videoUrl");

const pasteButton =
    document.getElementById("pasteButton");

const downloadButton =
    document.getElementById("downloadButton");

const resultSection =
    document.getElementById("resultSection");

const downloadAd =
    document.getElementById("downloadAd");

const realDownloadButton =
    document.getElementById("realDownloadButton");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");

const themeButton =
    document.getElementById("themeButton");


/*
    ==============================
    TOAST
    ==============================
*/

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/*
    ==============================
    PASTE BUTTON
    ==============================
*/

pasteButton.addEventListener("click", async () => {

    try {

        const text =
            await navigator.clipboard.readText();

        if (!text) {

            showToast("الحافظة فارغة.");

            return;

        }

        videoUrl.value = text;

        showToast("تم لصق الرابط بنجاح.");

    } catch (error) {

        showToast(
            "لا يمكن الوصول إلى الحافظة. ألصق الرابط يدوياً."
        );

    }

});


/*
    ==============================
    URL VALIDATION
    ==============================
*/

function isTikTokUrl(value) {

    try {

        const url = new URL(value);

        const host =
            url.hostname.toLowerCase();

        return (
            host.includes("tiktok.com") ||
            host.includes("vm.tiktok.com") ||
            host.includes("vt.tiktok.com")
        );

    } catch {

        return false;

    }

}


/*
    ==============================
    DOWNLOAD FORM
    ==============================
*/

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const url =
        videoUrl.value.trim();


    if (!url) {

        showToast("أدخل رابط فيديو TikTok أولاً.");

        videoUrl.focus();

        return;

    }


    if (!isTikTokUrl(url)) {

        showToast(
            "يرجى إدخال رابط TikTok صحيح."
        );

        videoUrl.focus();

        return;

    }


    /*
        Start loading
    */

    downloadButton.classList.add("loading");


    /*
        إظهار إعلان الصفحة المخصص لهذه المرحلة.

        مهم:
        هذا مجرد مكان للإعلان.
        يجب استخدام كود Google AdSense
        الرسمي الذي تحصل عليه من حسابك.
    */

    downloadAd.classList.add("show");


    /*
        هنا يتم إرسال الرابط إلى Backend.

        مثال:

        POST /api/download

        body:
        {
            "url": url
        }

        ثم يرجع الـ API رابط الفيديو
        النهائي.

        لا يمكن تنفيذ عملية استخراج
        الفيديو الحقيقية من JavaScript
        في المتصفح وحده.
    */


    try {

        /*
            DEMO DELAY

            استبدل هذا الجزء بطلب API الحقيقي.

            مثال:

            const response = await fetch(
                "/api/download",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        url: url
                    })
                }
            );

            const data =
                await response.json();

            realDownloadButton.href =
                data.downloadUrl;
        */


        await new Promise(resolve => {

            setTimeout(resolve, 1400);

        });


        /*
            Demo result
        */

        resultSection.classList.add("show");

        resultSection.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });


        /*
            رابط تجريبي.

            يجب استبداله بالرابط الذي يرجعه
            الـ Backend الخاص بك.
        */

        realDownloadButton.href = "#";

        showToast(
            "تمت معالجة الرابط بنجاح."
        );


    } catch (error) {

        console.error(error);

        showToast(
            "حدث خطأ أثناء معالجة الفيديو."
        );

    } finally {

        downloadButton.classList.remove(
            "loading"
        );

    }

});


/*
    ==============================
    DOWNLOAD BUTTON
    ==============================
*/

realDownloadButton.addEventListener(
    "click",
    (event) => {

        /*
            في المشروع الحقيقي:

            إذا كان href يحتوي على رابط
            حقيقي من الـ Backend،
            سيبدأ التنزيل.

            حالياً نمنع التنزيل الوهمي.
        */

        if (
            !realDownloadButton.href ||
            realDownloadButton.getAttribute("href") === "#"
        ) {

            event.preventDefault();

            showToast(
                "اربط الزر مع API التنزيل في الـ Backend."
            );

        }

    }
);


/*
    ==============================
    THEME
    ==============================
*/

themeButton.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light-mode"
        );

        const icon =
            themeButton.querySelector("i");

        if (
            document.body.classList.contains(
                "light-mode"
            )
        ) {

            icon.className =
                "fa-solid fa-sun";

        } else {

            icon.className =
                "fa-solid fa-moon";

        }

    }
);


/*
    ==============================
    KEYBOARD UX
    ==============================
*/

videoUrl.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            form.requestSubmit();

        }

    }
);
