import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './carousel.module.scss';

import carousel1 from '../../assets/images/carousel1.png';
import carousel2 from '../../assets/images/carousel2.png';
import carousel3 from '../../assets/images/carousel3.jpg';

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <section className={styles.root}>
            <Slider {...settings}>
                <div>
                    <div
                        className={styles.slides}
                        style={{ backgroundImage: `url('${carousel3}')` }}
                    />
                </div>
                <div>
                    <div
                        className={styles.slides}
                        style={{ backgroundImage: `url('${carousel1}')` }}
                    />
                </div>
                <div>
                    <div
                        className={styles.slides}
                        style={{ backgroundImage: `url('${carousel2}')` }}
                    />
                </div>
            </Slider>
        </section>
    );
};

export default Carousel;
