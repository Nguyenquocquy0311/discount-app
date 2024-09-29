import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

const adsCode = [
    {
        url: 'https://s.lazada.vn/l.PwtQ',
        src: 'https://images.bloggiamgia.vn/full/11-04-2023/7baca235-2357-45ee-bf9b-a0bb7db57a72-1681202288352.jpg'
    },
    {
        url: 'https://s.lazada.vn/l.PwtQ',
        src: 'https://images.bloggiamgia.vn/full/11-04-2023/7baca235-2357-45ee-bf9b-a0bb7db57a72-1681202288352.jpg'
    },
    {
        url: 'https://s.lazada.vn/l.PwtQ',
        src: 'https://images.bloggiamgia.vn/full/11-04-2023/7baca235-2357-45ee-bf9b-a0bb7db57a72-1681202288352.jpg'
    },
    {
        url: 'https://s.lazada.vn/l.PwtQ',
        src: 'https://images.bloggiamgia.vn/full/11-04-2023/7baca235-2357-45ee-bf9b-a0bb7db57a72-1681202288352.jpg'
    },
];

const AdsBanner: React.FC = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000, 
    };

    return (
        <div className="ads-banner">
            <Slider {...settings}>
                {adsCode.map((ad, index) => (
                    <div key={index}>
                        <a href={ad.url} target="_blank" rel="nofollow">
                            <img src={ad.src} alt={`Ad ${index}`} className='rounded-b-[30px] md:rounded-b-[70px] w-full' />
                        </a>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default AdsBanner;
