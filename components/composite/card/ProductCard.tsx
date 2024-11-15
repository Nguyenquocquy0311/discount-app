import React from 'react';
import { Button, Card } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { IProduct } from '@/types/product';

interface ProductCardProps {
    product: IProduct;
    onSave: (productId: number) => void;
    onView: (product: IProduct) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSave, onView }) => {
    return (
        <Card
            hoverable
            className="relative rounded-lg overflow-hidden shadow-lg border border-gray-200 flex flex-col h-full"
            cover={<img alt={product.name} src={product.image} className="h-60 w-full object-cover" />}
        >
            <div className="flex flex-col h-full p-4">
                <div className="flex-grow">
                    <h2 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 h-14">
                        {product.name}
                    </h2>
                    <p className="text-green-600 font-semibold mb-2">
                        Giá: {product.currentPrice.toLocaleString()} VND
                    </p>
                </div>
                <div className="mt-auto">
                    <Button
                        type="primary"
                        onClick={() => onView(product)}
                        className="w-full bg-blue-500 text-white font-semibold hover:bg-blue-600 mb-2"
                    >
                        Xem sản phẩm
                    </Button>
                    <Button
                        key={product.id}
                        icon={<SaveOutlined />}
                        onClick={() => onSave(product.id)}
                        disabled={product.saved}
                        className={`w-full ${product.saved ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                        {product.saved ? 'Đã lưu' : 'Lưu sản phẩm'}
                    </Button>
                </div>
            </div>
            <div className="absolute right-0 top-0 p-2 text-white bg-blue-400 font-bold rounded-bl-lg">
                {product.ratingAvg ? product.ratingAvg.toFixed(1) : '0'} ⭐
            </div>
        </Card>
    );
};

export default ProductCard; 