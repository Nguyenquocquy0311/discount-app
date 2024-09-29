import { useRouter } from 'next/router';
import React from 'react';

const Hero: React.FC = () => {
    const router = useRouter()

    const redirectDiscountPage = () => {
        router.push('ma-giam-gia')
    }

    return (
        <div className="bg-cover bg-gradient bg-center h-[100vh] text-blue-900 flex items-center justify-center">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between h-full">
                {/* Left side - Text */}
                <div className="md:w-1/2 text-center md:text-left mx-4">
                    <h4 className="text-[44px] font-bold mb-5 leading-tight">Nhận Mã Giảm Giá Mới Nhất – Ưu Đãi Hấp Dẫn Từ Hàng Trăm Thương Hiệu</h4>
                    <p className="text-[16px] mb-8">
                        Tìm kiếm và nhận ngay mã giảm giá, khuyến mãi mới nhất từ các thương hiệu uy tín. Tiết kiệm chi phí mua sắm với hàng nghìn mã giảm giá cập nhật liên tục, áp dụng dễ dàng cho các cửa hàng trực tuyến và dịch vụ phổ biến.
                    </p>
                    <button className='px-8 py-3 rounded-3xl bg-blue-500 hover:bg-blue-400 font-bold text-xl text-white' onClick={redirectDiscountPage}>Khám phá ngay</button>
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