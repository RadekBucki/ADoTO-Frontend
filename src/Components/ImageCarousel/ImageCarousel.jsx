import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import classes from './ImageCarousel.module.css';

const ImageCarousel = () => {
  const images = [
    'src/assets/map_example_img.png',
    'src/assets/get_data_img.png',
    'src/assets/outlined_image.png'
  ];


  const customPaging = () => {
    return (
      <div className={`${classes.carousel_dot} bg-black`} ></div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <ul className={classes.carousel_dots}>{dots}</ul>
    ),
    customPaging: customPaging,
  };

  return (
    <div className={classes.carousel_container}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className={classes.carousel_image} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;

