import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hot: React.FC = () => {
  // const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true, 
    infinite: true,
    speed: 100,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: true,
    // beforeChange: (oldIndex: number, newIndex: number) => setCurrentSlide(newIndex),
  };

  const items = [
    {
      title: "Tối ưu hóa game hơn",
      content: "Tối ưu hóa game hơn giúp cải thiện trải nghiệm người chơi và giảm thiểu các lỗi có thể gặp phải.",
      image: "https://images.bloggiamgia.vn/full/18-03-2024/Viettel-1710730322736.jpg",
    },
    {
      title: "Tạo thêm nhiều màn chơi nữa",
      content: "Thêm nhiều màn chơi mới để người chơi có thêm trải nghiệm mới và thử thách hơn.",
      image: "https://images.bloggiamgia.vn/full/15-04-2024/SliderBUY2LGETST4-1713157851806.jpg",
    },
    {
      title: "Thêm nhiều item giúp có game hấp dẫn hơn",
      content: "Các item mới sẽ làm cho trò chơi thêm phần thú vị và cung cấp cho người chơi nhiều tùy chọn chiến thuật.",
      image: "https://images.bloggiamgia.vn/full/18-03-2024/HA-ng-quac-tao-1710736302684.jpg",
    },
    {
      title: "Có thể lưu lại lịch sử các lần chơi",
      content: "Tính năng lưu lại lịch sử chơi giúp người chơi có thể theo dõi tiến trình của mình.",
      image: "https://images.bloggiamgia.vn/full/17-04-2024/LAFFLAS-1713391436432.jpg",
    },
    {
      title: "Chế độ chơi nhiều người",
      content: "Thêm chế độ chơi nhiều người để cùng bạn bè thử thách và vui chơi.",
      image: "https://images.bloggiamgia.vn/full/17-04-2024/Choice-1713333063456.jpg",
    },
    {
      title: "Chế độ chơi nhiều người",
      content: "Thêm chế độ chơi nhiều người để cùng bạn bè thử thách và vui chơi.",
      image: "https://images.bloggiamgia.vn/full/17-04-2024/Mua-nhieu-giam-sau-18-1713391084536.jpg",
    },
  ];

  return (
    <section id="plan" className="pt-20 pb-32 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">
          Các mã giảm giá <span className="text-blue-500 font-bold animate-rainbow">Đang HOT !!!</span>
        </h2>
        <p className="text-lg leading-relaxed w-3/4 mx-auto mb-12">
          Dưới đây là các mã giảm giá cực kỳ hấp dẫn từ nhiều thương hiệu khác nhau. Đừng bỏ lỡ những ưu đãi này để tiết kiệm và mua sắm thông minh hơn!
        </p>

        <div className="flex justify-center items-start">
          <div className="w-full">
            <Slider {...settings}>
              {items.map((item, index) => (
                <div key={index} className="px-2">
                  <div className="flex justify-center items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="rounded-lg w-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hot;
