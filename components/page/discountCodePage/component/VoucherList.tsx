import React, { useEffect, useState } from 'react';
import { Button, Radio, Pagination, message, Skeleton } from 'antd';
import { Voucher } from '@/types/voucher';
import { getValidCoupon } from '@/services/coupon';
import { VoucherCard } from '@/components/composite/card/VoucherCard';

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

  const paginatedVouchers = filteredVouchers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const VoucherSkeleton = () => (
    <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-200">
      <Skeleton avatar active paragraph={{ rows: 3 }} />
    </div>
  );

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
            {loading ? (
              // Show skeletons while loading
              Array(6).fill(null).map((_, index) => (
                <VoucherSkeleton key={index} />
              ))
            ) : paginatedVouchers.length > 0 ? (
              paginatedVouchers.map((voucher, index) => (
                <VoucherCard
                  key={voucher.id}
                  platform={voucher.platform}
                  discountAmount={voucher.discountAmount}
                  percentageUsed={voucher.percentageUsed}
                  couponType={voucher.couponType}
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
