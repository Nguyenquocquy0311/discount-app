import React from 'react';
import Logo from '../composite/header/Logo';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-800 py-8 text-sm text-white text-opacity-85">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-5 space-x-16">
            <div>
                <Logo textColor='text-white'/>
                <p className='mt-4 text-[12px]'>Website chia sẻ tài liệu học tập miễn phí, cung cấp các tài liệu hữu ích cho học sinh, sinh viên từ cấp 1 đến đại học. Đăng ký để tải lên, tải xuống tài liệu chất lượng cao và tích lũy điểm thưởng để truy cập tài liệu VIP.</p>
            </div>

          {/* Cột Giới Thiệu */}
          <div>
            <h3 className="font-semibold mb-3">Giới thiệu</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-600">Về chúng tôi</a></li>
              <li><a href="#" className="hover:text-blue-600">Hướng dẫn sử dụng</a></li>
              <li><a href="#" className="hover:text-blue-600">Đăng ký VIP</a></li>
              <li><a href="#" className="hover:text-blue-600">Liên hệ</a></li>
            </ul>
          </div>

          {/* Cột Chính sách */}
          <div>
            <h3 className="font-semibold mb-3">Chính sách</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-600">Chính sách quy định</a></li>
              <li><a href="#" className="hover:text-blue-600">Điều khoản sử dụng</a></li>
              <li><a href="#" className="hover:text-blue-600">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-blue-600">Hướng dẫn thanh toán</a></li>
            </ul>
          </div>

          {/* Cột Theo dõi chúng tôi */}
          <div>
            <h3 className="font-semibold mb-3">Theo dõi chúng tôi</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-700">Facebook</a></li>
              <li><a href="#" className="hover:text-blue-700">Youtube</a></li>
              <li><a href="#" className="hover:text-blue-700">Twitter</a></li>
            </ul>
          </div>

          {/* Cột Đối tác */}
          <div>
            <h3 className="font-semibold mb-3">Đối tác của Google</h3>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png" alt="Google Partner" className="w-24"/>
          </div>
        </div>

        {/* Dòng dưới */}
        <div className="border-t border-gray-500 mt-8 pt-4 text-center text-gray-200">
          <p>Chịu trách nhiệm nội dung: <a href='http://nguyenquocquy.vercel.app' target='_blank' className='text-blue-600 font-semibold'>Nguyen Quoc Quy</a>. ©2024Bloggiamgia. Địa chỉ: Cầu Giấy, Hà Nội. Điện thoại: 0923 488 371. Email: info@gmail.com.vn.</p>
        </div>
      </div>
    </footer>
  );
}
