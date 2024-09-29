import { Button, Table, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    stock: number
}

interface ProductTableProps {
  products: Product[];
  onView: (product: Product) => void;
  onDelete: (productId: number) => void;
}

export default function ProductTable({ products, onView, onDelete }: ProductTableProps) {
  const columns = [
    { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name' },
    { title: 'Giá', dataIndex: 'price', key: 'price', render: (text: number) => `${text} VND` },
    { title: 'Danh mục', dataIndex: 'category', key: 'category' },
    { title: 'Số lượng tồn kho', dataIndex: 'stock', key: 'stock' },
    {
      title: 'Hành động',
      key: 'actions',
      render: (text: any, product: Product) => (
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
            <Button danger><DeleteOutlined/></Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return <Table columns={columns} dataSource={products} rowKey="id" />;
}
