import { Button, Input, Modal, Form, notification } from "antd";
import { useState } from "react";
import VoucherTable, { Voucher } from "../table/VoucherTable";

export default function VoucherTab() {
  // Initial voucher data
  const initialVouchers: Voucher[] = [
    { id: 1, code: 'DISCOUNT10', discount: 10, expiryDate: '2024-12-31', platform: 'Lazada', status: 'Active' },
    { id: 2, code: 'SUMMER20', discount: 20, expiryDate: '2024-09-30', platform: 'Lazada', status: 'Expired' },
    { id: 3, code: 'WELCOME15', discount: 15, expiryDate: '2024-11-30', platform: 'Tiki', status: 'Active' },
    { id: 4, code: 'FALL25', discount: 25, expiryDate: '2024-10-15', platform: 'Shopee', status: 'Expired' },
    { id: 5, code: 'NEWYEAR30', discount: 30, expiryDate: '2025-01-01', platform: 'Tiki', status: 'Active' },
  ];

  const [vouchers, setVouchers] = useState<Voucher[]>(initialVouchers); // Store voucher data
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null); // Store selected voucher for editing
  const [isModalVisible, setIsModalVisible] = useState(false); // Control modal visibility
  const [isEditMode, setIsEditMode] = useState(false); // Track add/edit mode

  // Filter vouchers based on search term
  const filteredVouchers = vouchers.filter(
    (voucher) =>
      voucher.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voucher.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open modal for Add/Edit
  const showModal = (voucher?: Voucher) => {
    if (voucher) {
      setSelectedVoucher(voucher); // Editing
      setIsEditMode(true);
    } else {
      setSelectedVoucher(null); // Adding new voucher
      setIsEditMode(false);
    }
    setIsModalVisible(true);
  };

  // Handle form submission for Add/Edit
  const handleFormSubmit = (values: Voucher) => {
    if (isEditMode && selectedVoucher) {
      // Edit voucher
      setVouchers((prev) =>
        prev.map((voucher) =>
          voucher.id === selectedVoucher.id ? { ...selectedVoucher, ...values } : voucher
        )
      );
      notification.success({ message: "Mã giảm giá đã được chỉnh sửa!" });
    } else {
      // Add new voucher
      const newVoucher = { ...values, id: vouchers.length + 1 };
      setVouchers((prev) => [...prev, newVoucher]);
      notification.success({ message: "Mã giảm giá mới đã được thêm!" });
    }
    setIsModalVisible(false); // Close modal
  };

  // Handle delete voucher
  const handleDelete = (voucherId: number) => {
    setVouchers((prev) => prev.filter((voucher) => voucher.id !== voucherId));
    notification.success({ message: "Mã giảm giá đã được xoá!" });
  };

  return (
    <div className="bg-white px-10 h-full rounded-t-xl">
      {/* Header */}
      <div className="grid grid-flow-col justify-between py-5">
        <h1 className="font-sans mb-4">Có tất cả {filteredVouchers.length} bản ghi</h1>

        {/* Search Input */}
        <Input.Search
          placeholder="Tìm kiếm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 200 }}
        />

        {/* Add Voucher Button */}
        <Button type="primary" onClick={() => showModal()}>
          Thêm mới
        </Button>
      </div>
      
      <VoucherTable
        vouchers={filteredVouchers}
        onView={(voucher) => showModal(voucher)}
        onDelete={(voucherId) => handleDelete(voucherId)}
      />

      <Modal
        title={isEditMode ? "Chỉnh sửa mã giảm giá" : "Thêm mã giảm giá mới"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={selectedVoucher || { code: '', discount: '', expiryDate: '', platform: '', status: '' }}
          onFinish={handleFormSubmit}
        >
          <Form.Item
            label="Mã giảm giá"
            name="code"
            rules={[{ required: true, message: 'Vui lòng nhập mã giảm giá!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giảm giá (%)"
            name="discount"
            rules={[{ required: true, message: 'Vui lòng nhập mức giảm giá!' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Ngày hết hạn"
            name="expiryDate"
            rules={[{ required: true, message: 'Vui lòng nhập ngày hết hạn!' }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            label="Nền tảng"
            name="platform"
            rules={[{ required: true, message: 'Vui lòng nhập nền tảng!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: 'Vui lòng nhập trạng thái!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditMode ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
