import { useRouter } from 'next/router';
import React from 'react';
import Lottie from 'lottie-react';
import eduAnimation from '../../../../public/animation/lottie.json'
import classnames from 'classnames';
import { routes } from '@/constant/routes';

const Hero: React.FC = () => {
    const router = useRouter()

    const redirectDiscountPage = () => {
        router.push(routes.voucher)
    }

    return (
        <div className="bg-cover bg-gradient bg-center h-[100vh] text-blue-900 flex items-center justify-center">
            <div className="container mx-auto flex flex-col space-x-14 md:flex-row items-center justify-between h-full">
                {/* Left side - Text */}
                <div className="md:w-1/2 text-center md:text-left mx-4">
                    <h4 className="z-10 mb-6 text-[44px] font-bold leading-tight inline-block relative">
                        Nhận Mã Giảm Giá Mới Nhất – Ưu Đãi Hấp Dẫn Từ Hàng Trăm
                        <div
                            className={classnames(
                                'block w-fit relative',
                                'after:absolute after:bg-[#27FFFF]',
                                'after:left-0 after:bottom-1.5 tlg:after:bottom-2',
                                'after:w-full after:h-2 tlg:after:h-3',
                                'tlg:mx-0 tlg:mt-0'
                            )}
                        >
                            <span className="relative z-10">Thương Hiệu</span>
                        </div>
                    </h4>
                    <p className="text-[16px] mb-8">
                        Tìm kiếm và nhận ngay mã giảm giá, khuyến mãi mới nhất từ các thương hiệu uy tín. Tiết kiệm chi phí mua sắm với hàng nghìn mã giảm giá cập nhật liên tục, áp dụng dễ dàng cho các cửa hàng trực tuyến và dịch vụ phổ biến.
                    </p>
                    <button className="px-8 py-3 rounded-3xl bg-blue-500 hover:bg-blue-400 font-bold text-xl text-white" onClick={redirectDiscountPage}>
                        Khám phá ngay
                    </button>
                </div>

                {/* Right side - Image */}
                <div className="md:w-1/2 mt-8 md:mt-0">
                    <Lottie animationData={eduAnimation} />
                    {/* <img src="img/tải xuống.png" alt="Conqueror's Journey Logo" className="w-full h-auto object-contain" /> */}
                </div>
            </div>
        </div>
    );
};

export default Hero;