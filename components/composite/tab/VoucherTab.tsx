import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Modal,
  Form,
  notification,
  Descriptions,
  Select,
} from "antd";
import VoucherTable from "../table/VoucherTable";
import {
  createCoupon,
  deleteCoupon,
  getAllCoupon,
  getCouponCategory,
  updateCoupon,
} from "@/services/coupon";
import { Voucher } from "@/types/voucher";
import { formatCurrency, formatDayMonthYear } from "@/utils/helper";
import { LinkOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function VoucherTab() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [couponCategories, setCouponCategories] = useState<
    { id: number; categoryName: string }[]
  >([]);
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
  const [selectedVoucherForDetail, setSelectedVoucherForDetail] =
    useState<Voucher | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchVouchers();
    fetchCouponCategory();
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
        message: "Error",
        description: "Failed to fetch vouchers",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCouponCategory = async () => {
    try {
      const data = await getCouponCategory();
      setCouponCategories(data);
    } catch (error) {
      console.error("Error fetching coupon categories:", error);
    }
  };

  const handleTableChange = (newPagination: any) => {
    fetchVouchers(newPagination.current);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const showModal = (voucher?: Voucher) => {
    if (voucher) {
      setSelectedVoucher(voucher);
      console.log(voucher);
      
      setIsEditMode(true);
      form.setFieldsValue(voucher);
    } else {
      setSelectedVoucher(null);
      setIsEditMode(false);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleFormSubmit = async (values: Voucher) => {
    values.couponCategoryId = Number(values.couponCategoryId);
    values.startAt = new Date(values.startAt).toISOString();
    values.expiredAt = new Date(values.expiredAt).toISOString();
    values.discountReward = Number(values.discountReward);
    values.minSpend = Number(values.minSpend);
    values.discountAmount = Number(values.discountAmount);

    console.log(values);
    try {
      if (isEditMode && selectedVoucher) {
        try {
          
          await updateCoupon(selectedVoucher.id, values);
          notification.success({ message: "Voucher updated successfully" });
          setIsModalVisible(false);
          fetchVouchers();
        } catch (error) {
          console.error("Error updating coupon:", error);
          notification.error({ message: "Failed to update voucher" });
        }
      } else {
        try {
          await createCoupon(values);
          notification.success({ message: "Voucher mới đã được thêm!" });
          setIsModalVisible(false);
          fetchVouchers();
        } catch (error) {
          console.error("Error creating coupon:", error);
          notification.error({ message: "Failed to add voucher" });
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      notification.error({ message: "Failed to submit form" });
    }
  };

  const handleDelete = async (voucherId: number) => {
    try {
      await deleteCoupon(voucherId);
      notification.success({
        message: "Success",
        description: "Xóa voucher thành công",
      });
      fetchVouchers();
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to delete voucher",
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
      (voucher.couponCode?.toLowerCase().includes(searchTerm.toLowerCase()) ??
        false) ||
      (voucher.platform?.toLowerCase().includes(searchTerm.toLowerCase()) ??
        false)
  );

  return (
    <div className="bg-white px-10 h-full rounded-t-xl">
      <div className="grid grid-flow-col justify-between py-5">
        <h1 className="font-sans mb-4">
          Có tất cả {filteredVouchers.length} bản ghi
        </h1>
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
          </Button>,
        ]}
        width={1000}
        centered
      >
        {selectedVoucherForDetail && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="ID">
              {selectedVoucherForDetail.id}
            </Descriptions.Item>
            <Descriptions.Item label="Coupon Code">
              {selectedVoucherForDetail.couponCode}
            </Descriptions.Item>
            <Descriptions.Item label="Title">
              {selectedVoucherForDetail.title}
            </Descriptions.Item>
            <Descriptions.Item label="Platform">
              {selectedVoucherForDetail.platform}
            </Descriptions.Item>
            <Descriptions.Item label="Discount Amount">
              {selectedVoucherForDetail.discountAmount}%
            </Descriptions.Item>
            <Descriptions.Item label="Discount Reward">
              {formatCurrency(selectedVoucherForDetail.discountReward)}
            </Descriptions.Item>
            <Descriptions.Item label="Min Spend">
              {formatCurrency(selectedVoucherForDetail.minSpend)}
            </Descriptions.Item>
            <Descriptions.Item label="Total Click">
              {selectedVoucherForDetail.totalClick}
            </Descriptions.Item>
            <Descriptions.Item label="Percentage Used">
              {selectedVoucherForDetail.percentageUsed}%
            </Descriptions.Item>
            <Descriptions.Item label="Is In Wallet">
              {selectedVoucherForDetail.isInWallet ? "Yes" : "No"}
            </Descriptions.Item>
            <Descriptions.Item label="Start At">
              {formatDayMonthYear(selectedVoucherForDetail.startAt)}
            </Descriptions.Item>
            <Descriptions.Item label="Expired At">
              {formatDayMonthYear(selectedVoucherForDetail.expiredAt)}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {formatDayMonthYear(selectedVoucherForDetail.createdAt)}
            </Descriptions.Item>
            <Descriptions.Item label="Updated At">
              {formatDayMonthYear(selectedVoucherForDetail.updatedAt)}
            </Descriptions.Item>
            <Descriptions.Item label="Affiliate Link" span={2}>
              <Link
                href={selectedVoucherForDetail.affLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkOutlined /> Link
              </Link>
            </Descriptions.Item>
            <Descriptions.Item label="Note" span={2}>
              {selectedVoucherForDetail.note}
            </Descriptions.Item>
            <Descriptions.Item label="Long Description" span={2}>
              {selectedVoucherForDetail.longDescription}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* Add/Edit Modal */}
      <Modal
        title={isEditMode ? "Chỉnh sửa voucher" : "Thêm voucher mới"}
        open={isModalVisible}
        style={{ top: 20 }}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          onFinish={handleFormSubmit}
          layout="vertical"
          initialValues={{
            discountAmount: 0,
            discountReward: 0,
            minSpend: 0,
          }}
        >
          <div className="max-h-[50vh] overflow-y-auto">
            <Form.Item
              label="Mã voucher"
              name="couponCode"
              rules={[{ required: true, message: "Vui lòng nhập mã voucher!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Tiêu đề"
              name="title"
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Nền tảng"
              name="platform"
              rules={[{ required: true, message: "Vui lòng nhập nền tảng!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phần trăm giảm giá"
              name="discountAmount"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập phần trăm giảm giá!",
                },
              ]}
            >
              <Input type="number" suffix="%" />
            </Form.Item>

            <Form.Item
              label="Số tiền giảm"
              name="discountReward"
              rules={[
                { required: true, message: "Vui lòng nhập số tiền giảm!" },
              ]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label="Số tiền tối thiểu"
              name="minSpend"
              rules={[
                { required: true, message: "Vui lòng nhập số tiền tối thiểu!" },
              ]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label="Link tiếp thị liên kết"
              name="affLink"
              rules={[
                { required: true, message: "Vui lòng nhập link tiếp thị!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Ngày bắt đầu"
              name="startAt"
              rules={[
                { required: true, message: "Vui lòng chọn ngày bắt đầu!" },
              ]}
            >
              <Input type="datetime" />
            </Form.Item>

            <Form.Item
              label="Ngày hết hạn"
              name="expiredAt"
              rules={[
                { required: true, message: "Vui lòng chọn ngày hết hạn!" },
              ]}
            >
              <Input type="datetime" />
            </Form.Item>

            <Form.Item label="Status" name="status">
              <Input />
            </Form.Item>

            <Form.Item label="Ghi chú" name="note">
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="Danh mục"
              name="couponCategoryId"
              rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
            >
              <Select
                options={couponCategories.map((category) => ({
                  label: category.categoryName,
                  value: category.id,
                }))}
              />
            </Form.Item>

            <Form.Item label="Mô tả chi tiết" name="longDescription">
              <Input.TextArea rows={4} />
            </Form.Item>
          </div>
          <div className="py-5">
            <Button type="primary" htmlType="submit">
              {isEditMode ? "Cập nhật" : "Thêm mới"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
