import { Button, Table, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

export interface Voucher {
    id: number;
    code: string;
    discount: number;
    expiryDate: string;
    platform: string;
    status: string;
}

interface VoucherTableProps {
  vouchers: Voucher[];
  onView: (voucher: Voucher) => void;
  onDelete: (voucherId: number) => void;
}

export default function VoucherTable({ vouchers, onView, onDelete }: VoucherTableProps) {
  const columns = [
    { title: 'Mã giảm giá', dataIndex: 'code', key: 'code' },
    { title: 'Giảm giá (%)', dataIndex: 'discount', key: 'discount' },
    { title: 'Ngày hết hạn', dataIndex: 'expiryDate', key: 'expiryDate' },
    { title: 'Nền tảng', dataIndex: 'platform', key: 'platform' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
    {
      title: 'Hành động',
      key: 'actions',
      render: (text: any, voucher: Voucher) => (
        <>
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
        </>
      ),
    },
  ];

  return <Table columns={columns} dataSource={vouchers} rowKey="id" />;
}
