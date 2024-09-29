import React, { useState } from 'react';
import { Button, Radio, Pagination } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';

interface VoucherProps {
  platform: string;
  discount: string;
  minOrder: string;
  expiry: string;
  notice: string;
  bannerUrl: string;
}

const VoucherCard: React.FC<VoucherProps> = ({
  platform,
  discount,
  minOrder,
  expiry,
  notice,
  bannerUrl,
}) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img
            src={platform === 'Lazada' ? 'https://images.piggi.vn/1720708472672-lazada_bg.webp' : platform === 'Shopee' ? 'https://images.piggi.vn/1720708484611-shopee_bg.webp' : 'https://images.piggi.vn/1720708451347-tiki_bg.webp'}
            alt={platform}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div className="flex-grow ml-4">
          <h4 className="text-lg font-bold text-green-600">Giảm {discount}</h4>
          <p className="text-sm text-gray-500">ĐH tối thiểu: {minOrder}</p>
          <p className="text-sm text-green-600">{notice}</p>
          <div className="flex items-center mt-2">
            <ClockCircleOutlined className="text-gray-400 mr-2" />
            <span className="text-gray-500 text-sm">HSD: {expiry}</span>
          </div>
          <div className="flex justify-between mt-4">
            <Button className="text-green-600 border-green-600">#Lưu trên banner</Button>
            <Button type="primary" href={bannerUrl} target="_blank">
              Đến Banner
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const VoucherList = () => {
  const vouchers = [
    { platform: 'Lazada', discount: '30K', minOrder: '150.000đ', expiry: '29/09', notice: 'Lưu ý: Mã lên mỗi ở các khung giờ 0H - 11H', bannerUrl: '#' },
    { platform: 'Shopee', discount: '50K', minOrder: '200.000đ', expiry: '30/09', notice: 'Áp dụng cho đơn hàng trên toàn sàn Shopee', bannerUrl: '#' },
    { platform: 'Tiki', discount: '70K', minOrder: '500.000đ', expiry: '28/09', notice: 'Mã chỉ áp dụng cho TikiNow', bannerUrl: '#' },
    { platform: 'Lazada', discount: '100K', minOrder: '1.000.000đ', expiry: '29/09', notice: 'Lưu ý: Mã có số lượng giới hạn', bannerUrl: '#' },
    { platform: 'Shopee', discount: '20K', minOrder: '100.000đ', expiry: '30/09', notice: 'Chỉ áp dụng vào cuối tuần', bannerUrl: '#' },
    { platform: 'Lazada', discount: '40K', minOrder: '300.000đ', expiry: '28/09', notice: 'Áp dụng cho LazMall', bannerUrl: '#' },
    { platform: 'Shopee', discount: '60K', minOrder: '400.000đ', expiry: '01/10', notice: 'Mã lên từ 0H - 12H hàng ngày', bannerUrl: '#' },
    { platform: 'Tiki', discount: '50K', minOrder: '250.000đ', expiry: '02/10', notice: 'Mã chỉ áp dụng cho TikiNow', bannerUrl: '#' },
    { platform: 'Lazada', discount: '20K', minOrder: '200.000đ', expiry: '29/09', notice: 'Lưu ý: Mã có số lượng giới hạn', bannerUrl: '#' },
    { platform: 'Shopee', discount: '10K', minOrder: '100.000đ', expiry: '30/09', notice: 'Chỉ áp dụng vào cuối tuần', bannerUrl: '#' },
  ];

  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const filteredVouchers = selectedPlatform
    ? vouchers.filter(voucher => voucher.platform === selectedPlatform)
    : vouchers;

  // Phân trang
  const paginatedVouchers = filteredVouchers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="my-4">
      <h1 className="font-bold text-2xl mb-4">Danh sách mã giảm giá</h1>
      <div className="flex">
        {/* Sidebar lọc theo sàn */}
        <div className="w-1/4 p-5 border-r border-gray-300">
          <h3 className="mb-4 pb-2 border-b-2 border-dashed font-bold text-lg">Lọc theo sàn</h3>
          <Radio.Group
            className="flex flex-col space-y-2"
            onChange={(e) => {
              setSelectedPlatform(e.target.value);
              setCurrentPage(1); // Reset lại trang khi lọc
            }}
            value={selectedPlatform}
          >
            <Radio value={null}>Tất cả</Radio>
            <Radio value="Shopee">Shopee</Radio>
            <Radio value="Lazada">Lazada</Radio>
            <Radio value="Tiki">Tiki</Radio>
          </Radio.Group>
        </div>

        {/* Danh sách voucher */}
        <div className="w-3/4 p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedVouchers.length > 0 ? (
              paginatedVouchers.map((voucher, index) => (
                <VoucherCard
                  key={index}
                  platform={voucher.platform}
                  discount={voucher.discount}
                  minOrder={voucher.minOrder}
                  expiry={voucher.expiry}
                  notice={voucher.notice}
                  bannerUrl={voucher.bannerUrl}
                />
              ))
            ) : (
              <p>Không tìm thấy mã giảm giá.</p>
            )}
          </div>

          {/* Phân trang */}
          <div className="mt-6 flex justify-center">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredVouchers.length}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherList;
