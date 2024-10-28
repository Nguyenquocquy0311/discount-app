import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Product } from '@/types/product';
import { getProductDetail } from '@/services/product';
import LineChart from '@/components/composite/LineChart';
import { Rate, Tag, Tooltip } from 'antd';

interface ProductDetailProps {
  id: number;
  product: Product | null;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ id, product }) => {
  if (!product) return <div className="text-center text-2xl text-red-600 mt-10">Product not found!</div>

  const chartData = product?.historyPrice
    ? {
      labels: product.historyPrice.map((entry: any) => entry.date),
      datasets: [
        {
          label: 'Price History',
          data: product.historyPrice.map((entry: any) => entry.price),
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
        },
      ],
    }
    : { labels: [], datasets: [] };

  return (
    <div className="container mx-auto p-8 my-12 bg-white shadow-2xl rounded-xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">{product?.name}</h1>
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/2">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-auto object-cover rounded-xl shadow-lg"
          />
          <div className="mt-6 flex items-center justify-between">
            <p className="text-3xl font-bold text-indigo-600">
              {product?.currentPrice.toLocaleString()} VND
            </p>
            <a
              href={product?.affLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Xem trên sàn
            </a>
          </div>
        </div>
        <div className="lg:w-1/2 space-y-6">
          <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Lịch sử giá</h2>
            <LineChart data={chartData} />
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Mã giảm giá</h2>
            <div className='flex flex-wrap gap-3'>
              {product?.vouchersFound.slice(0, 2).map((voucher: any) => (
                <Tag color='blue' key={voucher.id} className="text-lg px-3 py-1">{voucher?.couponCode}</Tag>
              ))}
              {product?.vouchersFound?.length && product?.vouchersFound?.length > 2 && (
                <Tooltip title={<ul>{product?.vouchersFound.slice(2).map((voucher: any) => <li key={voucher.id}>{voucher?.couponCode}</li>)}</ul>}>
                  <Tag color='blue' className="text-lg px-3 py-1">+ {product?.vouchersFound?.length - 2}</Tag>
                </Tooltip>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Đánh giá</h2>
            <div className="flex items-center space-x-4">
              <Rate defaultValue={product.ratingAvg || 4} disabled allowHalf />
              <span className="text-xl text-gray-600">{product?.ratingCount} lượt đánh giá</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
