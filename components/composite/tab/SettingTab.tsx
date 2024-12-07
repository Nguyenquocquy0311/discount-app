import { Button, Input, Modal, Form, notification, Select } from "antd";
import { useState, useEffect } from "react";
import ProductTable from "../table/ProductTable";
import { createProduct, deleteProduct, getAllProducts, getProductType, updateProduct } from "@/services/product";
import { IProduct } from "@/types/product";
import SettingTable from "../table/SettingTable";
import { Voucher } from "@/types/voucher";
import { getAllCoupon } from "@/services/coupon";
import { PlusOutlined } from '@ant-design/icons';

interface Mapping {
    id: string;
    productName: string;
    voucherName: string;
    productId: number;
    voucherId: number;
}

export default function SettingTab() {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 6,
        total: 0,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mappings, setMappings] = useState<Mapping[]>([]);

    useEffect(() => {
        fetchVouchers();
        fetchProducts();
    }, []);

    useEffect(() => {
        if (products.length > 0 && vouchers.length > 0) {
            const sampleMappings: Mapping[] = products.map((product, index) => ({
                id: (index + 1).toString(),
                productId: product.id,
                voucherId: vouchers[Math.min(index, vouchers.length - 1)].id,
                productName: product.name,
                voucherName: vouchers[Math.min(index, vouchers.length - 1)].couponCode
            }));
            setMappings(sampleMappings);
        }
    }, [products, vouchers]);

    useEffect(() => {
        console.log('Current mappings:', mappings);
        console.log('Current products:', products);
        console.log('Current vouchers:', vouchers);
    }, [mappings, products, vouchers]);

    const fetchVouchers = async (page = 1) => {
        try {
            setLoading(true);
            const data = await getAllCoupon();
            console.log('Vouchers:', data);
            setVouchers(data);
            setPagination({
                ...pagination,
                current: page,
                total: data.length,
            });
        } catch (error) {
            console.error('Error fetching vouchers:', error);
            notification.error({
                message: 'Error',
                description: 'Failed to fetch vouchers',
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await getAllProducts();
            console.log('Products:', data);
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            notification.error({
                message: 'Error',
                description: 'Failed to fetch products',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (values: { productId: number; voucherId: number }) => {
        const selectedProduct = products.find(p => p.id === values.productId);
        const selectedVoucher = vouchers.find(v => v.id === values.voucherId);

        if (selectedProduct && selectedVoucher) {
            const newMapping: Mapping = {
                id: (mappings.length + 1).toString(),
                productId: values.productId,
                voucherId: values.voucherId,
                productName: selectedProduct.name,
                voucherName: selectedVoucher.couponCode
            };

            setMappings(prev => [...prev, newMapping]);
            setIsModalOpen(false);
        }
    };

    return (
        <div className="bg-white px-10 h-full rounded-t-xl">
            {/* Header */}
            <div className="grid grid-flow-col justify-between py-5">
                <h1 className="font-sans mb-4">Có tất cả {mappings.length} bản ghi</h1>

                <Input.Search
                    placeholder="Tìm kiếm"
                    style={{ width: 200 }}
                />

                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalOpen(true)}
                    className="mb-4"
                >
                    Thêm mới
                </Button>
            </div>
            <SettingTable
                vouchers={vouchers}
                products={products}
                loading={loading}
                isModalOpen={isModalOpen}
                onOpenModal={() => setIsModalOpen(true)}
                onCloseModal={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                mappings={mappings}
            />
        </div>
    );
}
