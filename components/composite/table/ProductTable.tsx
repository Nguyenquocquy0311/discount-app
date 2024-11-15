import { Button, Table, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { IProduct } from "@/types/product";

interface ProductTableProps {
  products: IProduct[];
  onView: (product: IProduct) => void;
  onDelete: (productId: number) => void;
}

export default function ProductTable({ products, onView, onDelete }: ProductTableProps) {
  const columns = [
    // { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name', width: 400 },
    { title: 'Giá', dataIndex: 'currentPrice', key: 'currentPrice', render: (text: number) => `${text} VND`, width: 200 },
    { title: 'Danh mục', dataIndex: 'productType', key: 'productType', width: 100 },
    { title: 'Link', dataIndex: 'affLink', key: 'affLink', render: (text: string) => <a href={text} target="_blank" rel="noopener noreferrer">Xem</a> },
    { title: 'Rating', dataIndex: 'ratingAvg', key: 'ratingAvg', width: 100 },
    // { title: 'Số lượng đánh giá', dataIndex: 'ratingCount', key: 'ratingCount' },
    { title: 'Ảnh', dataIndex: 'image', key: 'image', render: (text: string) => <img src={text} alt="Product" style={{ width: '40px', height: '40px' }} /> },
    {
      title: 'Hành động',
      key: 'actions',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (text: any, product: IProduct) => (
        <>
          <Button onClick={() => onView(product)} className="border-none">
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa sản phẩm này không?"
            onConfirm={() => onDelete(product.id)}
            okText="Có"
            cancelText="Không"
            className="border-none"
          >
            <Button danger><DeleteOutlined /></Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return <Table columns={columns} dataSource={products} rowKey="id" pagination={{ pageSize: 6, showSizeChanger: false }} />;
}
