let words = [
  { text: "Designer", stop: 2 },   // يسيب "De"
  { text: "Developer", stop: 0 },  // يمسح كله بعد كده
  { text: "Freelancer", stop: 0 }
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let sections = document.querySelectorAll("section");
let navItems = document.querySelectorAll(".nav-item");
let navLinks = document.querySelectorAll(".nav-link");
let navbarCollapse = document.querySelector(".navbar-collapse");

function typeEffect() {
  let element = document.getElementById("typing");
  let current = words[wordIndex];
  let next = words[(wordIndex + 1) % words.length];

  if (!isDeleting) {
    element.innerHTML = current.text.substring(0, charIndex++);
    
    if (charIndex > current.text.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1000);
      return;
    }
  } else {
    // نمسح لحد النقطة المطلوبة بس
    if (charIndex > current.stop) {
      element.innerHTML = current.text.substring(0, charIndex--);
    } else {
      // نبدأ الكلمة الجديدة من نفس الحروف المشتركة
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      charIndex = current.stop;
    }
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();


window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    let sectionTop = section.offsetTop - 100;
    let sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((li) => {
    li.classList.remove("active");

    let link = li.querySelector("a");
    if (link.getAttribute("href") === "#" + current) {
      li.classList.add("active");
    }
  });
  if (scrollY < 100) {
    navItems.forEach(li => li.classList.remove("active"));
    navItems[0].classList.add("active"); // HOME
  }
});

// fixed navbar
let navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// قفل القائمه في navbar لما يعمل click علي nav-link
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    let bsCollapse = new bootstrap.Collapse(navbarCollapse, {
      toggle: false
    });
    bsCollapse.hide();
  });
});



new Swiper(".card-wrapper", {
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
