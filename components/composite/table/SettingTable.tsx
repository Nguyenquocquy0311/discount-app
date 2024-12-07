import { Button, Table, Select, Modal, Form } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { IProduct } from "@/types/product";
import { Voucher } from "@/types/voucher";

interface SettingTableProps {
    vouchers: Voucher[];
    products: IProduct[];
    loading: boolean;
    isModalOpen: boolean;
    onOpenModal: () => void;
    onCloseModal: () => void;
    onSubmit: (values: { productId: number; voucherId: number }) => void;
    mappings: Array<{
        id: string;
        productName: string;
        voucherName: string;
    }>;
}

export default function SettingTable({
    vouchers,
    products,
    loading,
    isModalOpen,
    onOpenModal,
    onCloseModal,
    onSubmit,
    mappings
}: SettingTableProps) {
    console.log('Table props:', { vouchers, products, mappings });

    const [form] = Form.useForm();

    const columns = [
        {
            title: 'STT',
            key: 'index',
            width: 80,
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Voucher áp dụng',
            dataIndex: 'voucherName',
            key: 'voucherName',
        }
    ];

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            onSubmit(values);
            form.resetFields();
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    return (
        <div>
            <Table columns={columns} dataSource={mappings} rowKey="id" loading={loading} pagination={{ pageSize: 8, showSizeChanger: false }} />

            <Modal
                title="Thêm Voucher cho Sản phẩm"
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={() => {
                    onCloseModal();
                    form.resetFields();
                }}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="productId"
                        label="Chọn sản phẩm"
                        rules={[{ required: true, message: 'Vui lòng chọn sản phẩm!' }]}
                    >
                        <Select placeholder="Chọn sản phẩm">
                            {products.map(product => (
                                <Select.Option key={product.id} value={product.id}>
                                    {product.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="voucherId"
                        label="Chọn voucher"
                        rules={[{ required: true, message: 'Vui lòng chọn voucher!' }]}
                    >
                        <Select placeholder="Chọn voucher">
                            {vouchers.map(voucher => (
                                <Select.Option key={voucher.id} value={voucher.id}>
                                    {voucher.couponCode}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
