import React from 'react';

const Hero: React.FC = () => {

    return (
        <div className="bg-cover bg-gradient bg-center h-[100vh] text-blue-900 flex items-center justify-center">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between h-full">
                {/* Left side - Text */}
                <div className="md:w-1/2 text-center md:text-left mx-4">
                    <h4 className="text-[44px] font-bold mb-5 leading-tight">Chia Sẻ Tài Liệu Học Tập Miễn Phí | Tài Liệu Đa Dạng Từ Cấp 1 Đến Đại Học</h4>
                    <p className="text-[16px] mb-8">
                        Ứng dụng chia sẻ tài liệu học tập lớn nhất, nơi cung cấp hàng ngàn tài liệu học tập miễn phí từ mọi cấp học như tiểu học, trung học, cao đẳng, và đại học. Với chức năng tìm kiếm thông minh, bạn có thể dễ dàng tìm kiếm và tải về tài liệu theo thể loại, môn học, hoặc cấp độ giáo dục. Đăng ký tài khoản miễn phí để tải tài liệu, chia sẻ kiến thức, và tích lũy điểm thưởng khi đóng góp tài liệu cho cộng đồng. Nền tảng đơn giản, dễ sử dụng với giao diện trực quan, thân thiện với người dùng. Tham gia ngay hôm nay và trở thành một phần của cộng đồng học tập lớn mạnh!
                    </p>
                    <button className='px-8 py-3 rounded-3xl bg-blue-500 hover:bg-blue-400 font-bold text-xl text-white'>Khám phá ngay</button>
                </div>

                {/* Right side - Image */}
                {/* <div className="md:w-1/2 mt-8 md:mt-0">
                    <Lottie animationData={eduAnimation}/>
                    {/* <img src="img/tải xuống.png" alt="Conqueror's Journey Logo" className="w-full h-auto object-contain" /> 
                </div> */}
            </div>
        </div>
    );
};

export default Hero;