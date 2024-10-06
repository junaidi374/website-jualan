import ProductCard from "./ProductCard.js";
import TrendingCard from "./TrendingCard.js";

const navBar = document.querySelector(".header"),
    navBtn = document.querySelector(".header__btn"),
    sections = document.querySelectorAll("section[id]"),
    newContent = document.querySelector(".new__products"),
    shopContent = document.querySelector(".shop__products"),
    trendingContent = document.querySelector(".trending__products"),
    shopCategories = document.querySelectorAll(".shop__category"),
    circleBtn = document.querySelector(".go-down-btn"),
    scrollUpBtn = document.querySelector(".scroll-up");

const API_URL = "../assets/apis/products.json";

// initialize Scroll Reveal
const sr = ScrollReveal({ origin: "top", distance: "100px", duration: 2000, delay: 300 });

/* ============== Header ============== */

// toggle menu saat toombol ditekan
navBtn.addEventListener("click", () => document.body.classList.toggle("menu-toggled"));

// tutup menu jika klik diluar header atau tombol
document.addEventListener("click", (Event) => {
    const klikLuarmenu = navBar.contains(Event.target);
    const klikluartombol = navBtn.contains(Event.target);

    // jika klik diluar menu dan tombol maka tutup menu

    if(!klikLuarmenu && !klikluartombol) {
        document.body.classList.remove("menu-toggled")
    }
});


function changeHeaderBg() {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
        navBar.style.backgroundColor = "var(--white-100-opcty-212)";
    } else {
        navBar.style.backgroundColor = "transparent";
    }
}
// tombol beli
// document.querySelectorAll(".rowexplore-more btn").forEach((item) => {
//     item.addEventListener("click", (e) => {




/* ============== Home Section ============== */

/* Swiper JS */

const homeSwiper = new Swiper(".home__content", {
    loop: true,
    effect: "fade",
    speed: 2000,
    allowTouchMove: false,
    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
    },
});

homeSwiper.on("slideChange", () => {
    const activeSlide = homeSwiper.slides[homeSwiper.activeIndex];
    activeSlide.classList.add("reveal");
});

homeSwiper.on("slideChangeTransitionEnd", () => {
    const prevSlide = homeSwiper.slides[homeSwiper.previousIndex];
    prevSlide.classList.remove("reveal");
});

/* Circle Btn */

let circleText = circleBtn.querySelector(".circle-text");
circleText.innerHTML = circleText.textContent
    .split("")
    .map((char, index) => `<span style="transform: rotate(${index * 28.3}deg)">${char}</span>`)
    .join("");

/* ============== New Section ============== */

async function renderNewProducts() {
    const respone = await fetch(API_URL);
    const data = await respone.json();
    data.map((product) => {
        if (product.isNew) {
            newContent.innerHTML += ProductCard(product);
        }
    });
    const productCards = newContent.querySelectorAll(".product-card");
    productCards.forEach((product) => {
        product.classList.add("new__product");
        const image = product.querySelector("img");
        product.addEventListener("mouseover", () => {
            if (product.dataset.image2 != "undefined") {
                image.src = product.dataset.image2;
            }
        });
        product.addEventListener("mouseleave", () => {
            image.src = product.dataset.image1;
        });
    });
    /* Swiper JS */
    const newSwiper = new Swiper(".new__content", {
        slidesPerView: 4,
        spaceBetween: 20,
        loop: true,
        grabCursor: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        },
    });

    /* ScrollReveal JS */
    sr.reveal(newContent);
}

/* ============== Shop Section ============== */

async function renderShopProducts() {
    const respone = await fetch(API_URL);
    const data = await respone.json();
    data.map((product) => {
        shopContent.innerHTML += ProductCard(product);
    });
    const productCards = shopContent.querySelectorAll(".product-card");
    productCards.forEach((product) => {
        product.classList.add("shop__product");
        const image = product.querySelector("img");
        product.addEventListener("mouseover", () => {
            if (product.dataset.image2 != "undefined") {
                image.src = product.dataset.image2;
            }
        });
        product.addEventListener("mouseleave", () => {
            image.src = product.dataset.image1;
        });
    });

    /* ScrollReveal JS */
    sr.reveal(".shop__product", { interval: 100 });
}

/* Shop categories */
shopCategories.forEach((category) => {
    category.addEventListener("click", () => {
        shopCategories.forEach((category) => category.classList.remove("selected"));
        category.classList.add("selected");
        let categoryType = category.dataset.category;
        const shopProducts = document.querySelectorAll(".shop__product");
        shopProducts.forEach((product) => {
            product.classList.add("hide");
            if (product.dataset.category === categoryType || categoryType === "all") {
                product.classList.remove("hide");
            }
        });
    });
});

/* ============== Trending Section ============== */

async function renderTrendingProducts() {
    const respone = await fetch(API_URL);
    const data = await respone.json();
    data.map((product) => {
        if (product.isTrending) {
            trendingContent.innerHTML += TrendingCard(product);
        }
    });
    /* Swiper JS */
    const trendingSectionSwiper = new Swiper(".trending__content", {
        loop: true,
        effect: "fade",
        speed: 600,
        allowTouchMove: false,
        autoplay: {
            delay: 6000,
        },
    });
    /* ScrollReveal JS */
    sr.reveal(trendingContent);
}

/* ============== Brands Section ============== */

/* ScrollReveal JS */
sr.reveal(".brands__logo", { interval: 100 });

/* ============== Footer ============== */

/* ScrollReveal JS */
sr.reveal(".footer__col", { interval: 100 });


/* ============== Active Scroll ============== */

function activeScroll() {
    const scrollY = window.scrollY;
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 16,
            sectionHeight = section.offsetHeight,
            link = document.querySelector(`.header__link a[href='#${section.id}'`);
        if (scrollY >= sectionTop && scrollY <= sectionHeight + sectionTop) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

/* ============== Scroll Up ============== */

function showScrollUpBtn() {
    if (window.scrollY > 300) {
        scrollUpBtn.classList.add("show");
    } else {
        scrollUpBtn.classList.remove("show");
    }
}

scrollUpBtn.addEventListener("click", () => window.scrollTo({ behavior: "smooth", top: 0, left: 0 }));

/* ============== Call functions ============== */

window.addEventListener("scroll", () => {
    activeScroll();
    changeHeaderBg();
    showScrollUpBtn();
});

window.addEventListener("load", () => {
    activeScroll();
    renderNewProducts();
    renderShopProducts();
    renderTrendingProducts();
    document.querySelector(".home__slide").classList.add("reveal");
});



function openProductDetailPage(id, title, description, price, image) {
    const url = `product-detail.html?id=${encodeURIComponent(id)}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(image)}`;
    window.location.href = url;
}

// clik modal
document.body.addEventListener('click', (event) => {
    const button = event.target.closest('.explore-more.btn');
    if (button) {
        const productCard = button.closest('.product-card');
        const id = productCard.dataset.id;
        const title = productCard.querySelector('.product-card__title').textContent;
        const description = productCard.querySelector('.product-card__description.hidden').textContent;
        const price = productCard.querySelector('.product-card__price').textContent;
        const image = productCard.querySelector('img').src;

        // Arahkan ke halaman detail produk dengan parameter query
        window.location.href = `product-detail.html?id=${id}&title=${title}&description=${description}&price=${price}&image=${image}`;
    }
});
