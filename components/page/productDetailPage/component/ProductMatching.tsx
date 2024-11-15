import ProductCard from "@/components/composite/card/ProductCard";
import Auth from "@/context/AuthContext";
import { saveProduct } from "@/services/save_product";
import { IProduct, Product } from "@/types/product";
import { message } from "antd";
import router from "next/router";
import { useState } from "react";

const ProductMatching = ({ products }: { products: IProduct[] }) => {
    const [showAll, setShowAll] = useState(false);

    const displayedProducts = showAll ? products : products.slice(0, 10);
    const { userInfo } = Auth.useContainer();
    const [productsList, setProductsList] = useState<IProduct[]>([]);

    const handleSaveProduct = async (productId: number) => {
        if (!userInfo) {
            message.error('Bạn cần đăng nhập để lưu sản phẩm');
            return;
        }
        try {
            const success = await saveProduct(productId);
            if (success) {
                message.success('Đã lưu sản phẩm !!!');
                setProductsList(productsList.map(product =>
                    product.id === productId ? { ...product, saved: true } : product
                ));
            } else {
                message.error('Lỗi khi lưu sản phẩm !');
            }
        } catch (error) {
            message.error(String(error));
            console.error(error);
        }
    };

    const handleViewProduct = (product: IProduct) => {
        // setSelectedProduct(product);
        router.push(`/san-pham/${product.id}`);
    };

    return (
        <div className="mx-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Sản phẩm tương tự</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {displayedProducts.length > 0 ? displayedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onSave={handleSaveProduct}
                        onView={handleViewProduct}
                    />
                )) : <div className="text-gray-500">Không tìm thấy sản phẩm tương tự</div>}
            </div>

            {products.length > 10 && (
                <div className="text-center mt-6 mb-10">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {showAll ? 'Thu gọn' : 'Hiện thêm'}
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProductMatching;
