'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabscontainer = document.querySelector('.operations__tab-container');
const operationcontent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const btnleft = document.querySelector('.slider__btn--left');
const btnright = document.querySelector('.slider__btn--right');

// click the btn to open model
const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// click the btn to close model
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// To open and close the modal add event listeners
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// scrolling
btnScrollTo.addEventListener('click', e => {
  // scrolling to section1
  section1.scrollIntoView({ behavior: 'smooth' });
});

// page navigation using event deligation
document.querySelector('.nav__links').addEventListener('click', e => {
  // console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    // checking the class names
    // checking the
    const id = e.target.getAttribute('href'); // getting the all link ids
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    //console.log(id)
  }
});

// tabbed component
tabscontainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  if (clicked) {
    // in this line if its already cliked then remove styles
    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    // when we clicked newly then add style
    clicked.classList.add('operations__tab--active');

    // remove content area if its active
    operationcontent.forEach(content =>
      content.classList.remove('operations__content--active')
    );

    //activate content area when clicked
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add('operations__content--active');
    console.log(clicked.dataset.tab);
  }
});

// Menu fade animation using event deligation
const handleover = (e, opacity) => {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');

    siblings.forEach(ele => {
      if (ele !== link) ele.style.opacity = opacity;
    });
    logo.style.opacity = opacity;

    console.log(link);
  }
};

nav.addEventListener('mouseover', e => {
  handleover(e, 0.5);
});

nav.addEventListener('mouseout', e => {
  handleover(e, 1);
});

// reveal sections

const allsections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section-hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allsections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section-hidden');
});

// lazy loading images

const imaTargets = document.querySelectorAll('img[data-src]');

const loading = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  //replace src attribute to data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imaTargets.forEach(img => imgObserver.observe(img));

//slider
const slides = document.querySelectorAll('.slide');

let currentSlide = 0;
const maxSlide = slides.length;

const dotContainer = document.querySelector('.dots');

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      ` <button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

//createDots();

// highlight
const activateDot = function (slide) {
  document
    .querySelectorAll('.dots')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

activateDot(0);

const goToSlide = function (slide) {
  slides.forEach(
    (slide, index) =>
      (slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`)
  );
};

goToSlide(0);

// next slide
const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  }
  currentSlide++;

  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }

  goToSlide(currentSlide);
  activateDot(currentSlide);
};

btnright.addEventListener('click', nextSlide);
btnleft.addEventListener('click', prevSlide);

// this fun is used to enter the left & right keys to slide images
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
  console.log(e);
});

//dot slider

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    //console.log('dot');
    goToSlide(slide);
    activateDot(currentSlide);
  }
});
