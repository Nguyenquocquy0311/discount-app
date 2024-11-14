import React, { useState, useEffect } from 'react';
import { Button, Input, Modal, Form, notification, Descriptions } from "antd";
import VoucherTable from "../table/VoucherTable";
import { deleteCoupon, getAllCoupon } from "@/services/coupon";
import { Voucher } from '@/types/voucher';
import { formatCurrency, formatDayMonthYear } from '@/helper';
import { LinkOutlined } from '@ant-design/icons'
import Link from 'next/link';

export default function VoucherTab() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedVoucherForDetail, setSelectedVoucherForDetail] = useState<Voucher | null>(null);

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async (page = 1) => {
    try {
      setLoading(true);
      const data = await getAllCoupon();
      setVouchers(data);
      setPagination({
        ...pagination,
        current: page,
        total: data.length,
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch vouchers',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (newPagination: any) => {
    fetchVouchers(newPagination.current);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const showModal = (voucher?: Voucher) => {
    setSelectedVoucher(voucher || null);
    setIsModalVisible(true);
  };

  const handleDelete = async (voucherId: number) => {
    console.log('Delete voucher with ID:', voucherId);
    try {
      await deleteCoupon(voucherId);
      notification.success({
        message: 'Success',
        description: 'Xóa voucher thành công',
      });
      fetchVouchers();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete voucher',
      });
    }
  };

  const showDetailModal = (voucher: Voucher) => {
    setSelectedVoucherForDetail(voucher);
    setIsDetailModalVisible(true);
  };

  const handleDetailModalClose = () => {
    setIsDetailModalVisible(false);
    setSelectedVoucherForDetail(null);
  };

  const filteredVouchers = vouchers.filter(
    (voucher) =>
      (voucher.couponCode?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (voucher.platform?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  );

  return (
    <div className="bg-white px-10 h-full rounded-t-xl">
      <div className="grid grid-flow-col justify-between py-5">
        <h1 className="font-sans mb-4">Có tất cả {filteredVouchers.length} bản ghi</h1>
        <Input.Search
          placeholder="Tìm kiếm"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 200 }}
        />
        <Button type="primary" onClick={() => showModal()}>
          Thêm mới
        </Button>
      </div>
      
      <VoucherTable
        vouchers={filteredVouchers}
        loading={loading}
        pagination={pagination}
        onTableChange={handleTableChange}
        onView={showModal}
        onDelete={handleDelete}
        onViewDetail={showDetailModal}
      />

      <Modal
        title="Voucher Details"
        open={isDetailModalVisible}
        onCancel={handleDetailModalClose}
        footer={[
          <Button key="close" onClick={handleDetailModalClose}>
            Close
          </Button>
        ]}
        width={1000}
        centered
      >
        {selectedVoucherForDetail && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="ID">{selectedVoucherForDetail.id}</Descriptions.Item>
            <Descriptions.Item label="Coupon Code">{selectedVoucherForDetail.couponCode}</Descriptions.Item>
            <Descriptions.Item label="Title">{selectedVoucherForDetail.title}</Descriptions.Item>
            <Descriptions.Item label="Platform">{selectedVoucherForDetail.platform}</Descriptions.Item>
            <Descriptions.Item label="Discount Amount">{selectedVoucherForDetail.discountAmount}%</Descriptions.Item>
            <Descriptions.Item label="Discount Reward">{formatCurrency(selectedVoucherForDetail.discountReward)}</Descriptions.Item>
            <Descriptions.Item label="Min Spend">{formatCurrency(selectedVoucherForDetail.minSpend)}</Descriptions.Item>
            <Descriptions.Item label="Total Click">{selectedVoucherForDetail.totalClick}</Descriptions.Item>
            <Descriptions.Item label="Percentage Used">{selectedVoucherForDetail.percentageUsed}%</Descriptions.Item>
            <Descriptions.Item label="Is In Wallet">{selectedVoucherForDetail.isInWallet ? 'Yes' : 'No'}</Descriptions.Item>
            <Descriptions.Item label="Start At">{formatDayMonthYear(selectedVoucherForDetail.startAt)}</Descriptions.Item>
            <Descriptions.Item label="Expired At">{formatDayMonthYear(selectedVoucherForDetail.expiredAt)}</Descriptions.Item>
            <Descriptions.Item label="Created At">{formatDayMonthYear(selectedVoucherForDetail.createdAt)}</Descriptions.Item>
            <Descriptions.Item label="Updated At">{formatDayMonthYear(selectedVoucherForDetail.updatedAt)}</Descriptions.Item>
            <Descriptions.Item label="Affiliate Link" span={2}>
              <Link href={selectedVoucherForDetail.affLink} target="_blank" rel="noopener noreferrer">
                <LinkOutlined /> Link
              </Link>
            </Descriptions.Item>
            <Descriptions.Item label="Note" span={2}>{selectedVoucherForDetail.note}</Descriptions.Item>
            <Descriptions.Item label="Long Description" span={2}>{selectedVoucherForDetail.longDescription}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
}
