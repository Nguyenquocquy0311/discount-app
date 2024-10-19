import React from 'react';
import { Button, Table, Popconfirm, Space } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { Voucher } from '@/types/voucher';
import { formatCurrency, formatDayMonthYear, truncateString } from "@/helper";

interface VoucherTableProps {
  vouchers: Voucher[];
  loading: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  onTableChange: (pagination: any) => void;
  onView: (voucher: Voucher) => void;
  onDelete: (voucherId: number) => void;
  onViewDetail: (voucher: Voucher) => void; // New prop for view detail action
}

export default function VoucherTable({ 
  vouchers, 
  loading, 
  pagination, 
  onTableChange, 
  onView, 
  onDelete,
  onViewDetail 
}: VoucherTableProps) {
  const columns = [
    { 
      title: 'Mã giảm giá', 
      dataIndex: 'couponCode', 
      key: 'couponCode',
      render: (text: string) => truncateString(text, 20)
    },
    { 
      title: 'Tiêu đề', 
      dataIndex: 'title', 
      key: 'title',
      render: (text: string) => truncateString(text, 30)
    },
    { 
      title: 'Giảm giá (%)', 
      dataIndex: 'discountAmount', 
      key: 'discountAmount',
      render: (value: number) => `${value}%`
    },
    { 
      title: 'Giảm tối đa', 
      dataIndex: 'discountReward', 
      key: 'discountReward',
      render: (value: number) => formatCurrency(value)
    },
    { 
      title: 'Đơn tối thiểu', 
      dataIndex: 'minSpend', 
      key: 'minSpend',
      render: (value: number) => formatCurrency(value)
    },
    { title: 'Nền tảng', dataIndex: 'platform', key: 'platform' },
    { 
      title: 'Ngày hết hạn', 
      dataIndex: 'expiredAt', 
      key: 'expiredAt',
      render: (date: string) => formatDayMonthYear(date)
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (text: any, voucher: Voucher) => (
        <Space size="small">
          <Button onClick={() => onViewDetail(voucher)} className="border-none">
            <EyeOutlined />
          </Button>
          <Button onClick={() => onView(voucher)} className="border-none">
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa mã giảm giá này không?"
            onConfirm={() => onDelete(voucher.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger className="border-none"><DeleteOutlined/></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={vouchers} 
      rowKey="id" 
      loading={loading}
      pagination={{
        ...pagination,
        showSizeChanger: false,
        // showQuickJumper: true,
        // showTotal: (total) => `Total ${total} items`,
      }}
      onChange={onTableChange}
    />
  );
}
