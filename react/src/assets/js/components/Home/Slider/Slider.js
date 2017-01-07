import React  from "react";
import Swiper from "swiper";

// SASS
var css = require("./slider.scss");
var $ = require("jquery");

export default class Slider extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    this.initSlider();
  }

  initSlider() {
    new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      preloadImages: true,
      loop: true,
      //autoplay: 2500,
      autoplayDisableOnInteraction: false,
      centeredSlides: true,
    });
  }

  render() {
    return (
      <div class="swiper-container">
          <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="text">The Weeknd</div>
                <img src="assets/img/homeslider/slide_01.jpg" alt="" />
              </div>
              <div class="swiper-slide">
                <div class="text">Beyonce</div>
                <img src="assets/img/homeslider/slide_02.jpg" alt="" />
              </div>
              <div class="swiper-slide">
                <div class="text">Ed Sheeran</div>
                <img src="assets/img/homeslider/slide_03.jpg" alt="" />
              </div>
              <div class="swiper-slide">
                <div class="text">Ariana Grande</div>
                <img src="assets/img/homeslider/slide_04.jpg" alt="" />
              </div>
          </div>
          
          <div class="swiper-pagination"></div>
      </div>
    );
  }
}
