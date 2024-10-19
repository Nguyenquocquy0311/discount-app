import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useProduct } from '@/context/ProductContext';
import { Product } from '@/types/product';
import { getProductDetail } from '@/services/product';
import LineChart from '@/components/composite/LineChart';
import { Rate } from 'antd';
import { routes } from '@/constant/routes';

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { selectedProduct, setSelectedProduct } = useProduct();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    if (!selectedProduct) {
      router.push(routes.product);
    }
  }, [selectedProduct, router]);

  if (!selectedProduct) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await getProductDetail(selectedProduct.id);
        setProduct(res);
        // setSelectedProduct(res);
      } catch (e) {
        console.error(e);
      }
    }

    fetchProductDetail();
  }, []);

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
    <div className="mx-auto p-4 my-6 shadow-xl rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{product?.name}</h1>
      <div className='flex space-x-4 items-center'>
        <img src={product?.image} alt={product?.name} className="w-full max-w-md mb-4 rounded-lg" />
        <div className="mt-6 w-full">
          <div className='flex'>
            <Rate defaultValue={product?.ratingCount} />
            <span>{product?.ratingAvg} lượt đánh giá</span>
          </div>
        <h2 className="text-lg font-bold">Lịch sử giá:</h2>
        <LineChart data={chartData} /> {/* Pass chartData to LineChart */}
      </div>
      </div>
      <p className="text-xl font-semibold mb-2">Giá: {product?.currentPrice.toLocaleString()} VND</p>
      <a href={product?.affLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
        Xem trên sàn
        {/* {selectedProduct.productType.category} */}
      </a>
    </div>
  );
};

export default ProductDetail;