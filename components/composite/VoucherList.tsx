import React, { useEffect, useState } from 'react';
import { Button, Radio, Pagination, message } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Voucher } from '@/types/voucher';
import { getValidCoupon } from '@/services/coupon';
import { formatDayMonthYear } from '@/helper';

type VoucherCardProps = {
  platform: string;
  discountAmount: number;
  percentageUsed: number;
  expiredAt: string;
  couponCode: string;
  note: string;
  affLink: string;
};

const VoucherCard: React.FC<VoucherCardProps> = ({
  platform,
  discountAmount,
  percentageUsed,
  expiredAt,
  couponCode,
  note,
  affLink,
}) => {
  const handleCopyVoucherCode = (code: string) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        message.success('Đã sao chép mã giảm giá');
      })
      .catch((err) => {
        message.error('Lỗi khi sao chép mã giảm giá');
      });
  };

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
          <h4 className="text-lg font-bold text-green-600">Giảm {discountAmount}K</h4>
          <p className="text-sm text-gray-500">Tỉ lệ dùng: {percentageUsed}%</p>
          <p className="text-sm text-green-600">Lưu ý: {note}</p>
          <div className="flex items-center mt-2">
            <ClockCircleOutlined className="text-gray-400 mr-2" />
            <span className="text-gray-500 text-sm">HSD: {formatDayMonthYear(expiredAt)}</span>
          </div>
          <div className="flex justify-between mt-4">
            <Button className="text-green-600 border-green-600" onClick={() => handleCopyVoucherCode(couponCode)}>#Lưu trên banner</Button>
            <Button type="primary" href={affLink} target="_blank">
              Đến Banner
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const VoucherList = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const pageSize = 6;

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        setLoading(true);
        const data = await getValidCoupon();
        setVouchers(data);
      } catch (error) {
        console.error('Error fetching vouchers:', error);
        message.error('Lỗi tải dữ liệu voucher');
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {paginatedVouchers.length > 0 ? (
              paginatedVouchers.map((voucher, index) => (
                <VoucherCard
                  key={index}
                  platform={voucher.platform}
                  discountAmount={voucher.discountAmount}
                  percentageUsed={voucher.percentageUsed}
                  expiredAt={voucher.expiredAt}
                  couponCode={voucher.couponCode}
                  note={voucher.note}
                  affLink={voucher.affLink}
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
              showSizeChanger={false}
              align='center'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherList;
