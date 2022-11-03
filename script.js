'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// navigation smooth scrolling

const navLinks = document.querySelector('.nav__links');

navLinks.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// const h1 = document.querySelector('h1');
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// const headerTitle = document.querySelector('.header__title');
// console.log(headerTitle.children);
// const test = [...headerTitle.children].forEach(el => console.log(el));

//Tabbed content

const operationsContainer = document.querySelector(
  '.operations__tab-container'
);

const operationsTab = document.querySelectorAll('.operations__tab');

const operationsContent = document.querySelectorAll('.operations__content');

operationsContainer.addEventListener('click', e => {
  const button = e.target.closest('.operations__tab');
  console.log(button);
  const tabActive = button.dataset.tab;

  //remove active from all
  operationsTab.forEach(el => el.classList.remove('operations__tab--active'));

  //add active to the clicked button
  button.classList.add('operations__tab--active');

  //Remove active class from all of the operations Content
  operationsContent.forEach(el =>
    el.classList.remove('operations__content--active')
  );
  //Show the respective content
  document
    .querySelector(`.operations__content--${tabActive}`)
    .classList.add('operations__content--active');
});

//Menu opacity change on hover

const nav = document.querySelector('.nav');

nav.addEventListener('mouseover', e => {
  const navLink = e.target.closest('.nav').querySelectorAll('.nav__link');
  if (e.target.closest('.nav__link')) {
    const link = e.target;
    navLink.forEach(el =>
      el !== link ? (el.style.opacity = 0.5) : (el.style.opacity = 1)
    );
  }
});

//slider

const slide = document.querySelectorAll('.slide');
const sliderBtnLeft = document.querySelector('.slider__btn--left');
const sliderBtnRight = document.querySelector('.slider__btn--right');

slide.forEach((s, i) => (s.style.transform = `translateX(${i * 100}%)`));

let currSlide = 0;
let maxSlide = slide.length - 1;

sliderBtnRight.addEventListener('click', () => {
  // go to next slide
  if (currSlide === maxSlide) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  slide.forEach(
    (s, i) => (s.style.transform = `translateX(${(i - currSlide) * 100}%)`)
  );
});

sliderBtnLeft.addEventListener('click', () => {
  //go to prev slide

  currSlide--;
  if (currSlide < 0) {
    currSlide = maxSlide;
  }

  slide.forEach(
    (s, i) => (s.style.transform = `translateX(${(i - currSlide) * 100}%)`)
  );
});

//sticky nav

const section1 =
  window.pageYOffset +
  document.getElementById('section--1').getBoundingClientRect().top;

window.addEventListener('scroll', () => {
  window.scrollY > section1
    ? nav.classList.add('sticky')
    : nav.classList.remove('sticky');
});
