import React from "react";
import Slider from "react-slick";
import images from "../../../assets/images";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function SimpleSlider() {
  var settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings} className="homeSilder">
      <div className="slide item">
        <div className="carousel-bg clearfix"></div>
        <img src={images.banner1} className="d-block w-100" alt="..." />
        <div className="carousel-content">
          <a href="#A" className="order-now">
            {" "}
            Đặt hàng ngay{" "}
          </a>
          <div className="scroll-icon"></div>
          <div className="btn-scroll">Cuộn xuống</div>
        </div>
      </div>
      <div className="slide item">
        <div className="carousel-bg clearfix"></div>
        <img src={images.banner2} className="d-block w-100" alt="..." />
        <div className="carousel-content">
          <a href="#A" className="order-now">
            {" "}
            Đặt hàng ngay{" "}
          </a>
          <div className="scroll-icon"></div>
          <div className="btn-scroll">Cuộn xuống</div>
        </div>
      </div>
      <div className="slide item">
        <div className="carousel-bg clearfix"></div>
        <img src={images.banner3} className="d-block w-100" alt="..." />
        <div className="carousel-content">
          <a href="#A" className="order-now">
            {" "}
            Đặt hàng ngay{" "}
          </a>
          <div className="scroll-icon"></div>
          <div className="btn-scroll">Cuộn xuống</div>
        </div>
      </div>
    </Slider>
  );
}
