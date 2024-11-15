import React, { useState, useEffect, useMemo } from 'react';
import { Input, Button, Card, Pagination, Select, message, notification, Skeleton } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import Auth from '@/context/AuthContext';
import { getAllProducts } from '@/services/product';
import { IProduct, Product } from '@/types/product';
import { useRouter } from 'next/router';
import { useProduct } from '@/context/ProductContext';
import { saveProduct } from '@/services/save_product';
import { getAuthToken } from '@/utils/helper';
import ProductCard from './ProductCard';
const { Option } = Select;

const ProductList: React.FC = () => {
  const router = useRouter();
  const { setSelectedProduct } = useProduct();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState<string | undefined>(undefined);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [savedProducts, setSavedProducts] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  const { userInfo } = Auth.useContainer();

  const pageSize = 12;
  const platforms = ['Tất cả', 'Shopee', 'Lazada', 'Tiki'];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        message.error('Lỗi khi lấy danh sách sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.affLink.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlatform = selectedPlatform === 'Tất cả' || !selectedPlatform ||
        product.productType.category === selectedPlatform;
      return matchesSearch && matchesPlatform;
    });
  }, [products, searchTerm, selectedPlatform]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredProducts.slice(startIndex, startIndex + pageSize);
  }, [filteredProducts, currentPage]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePlatformChange = (value: string) => {
    setSelectedPlatform(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSaveProduct = async (productId: number) => {
    if (!userInfo) {
      message.error('Bạn cần đăng nhập để lưu sản phẩm');
      return;
    }
    try {
      const success = await saveProduct(productId);
      if (success) {
        message.success('Đã lưu sản phẩm !!!');
        setProducts(products.map(product =>
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
    setSelectedProduct(product);
    router.push(`/san-pham/${product.id}`);
  };

  const renderProductSkeleton = () => (
    <Card className="relative rounded-lg overflow-hidden shadow-lg border border-gray-200 flex flex-col h-full">
      <Skeleton.Image className="h-60 w-full" active />
      <div className="flex flex-col h-full p-4">
        <Skeleton active paragraph={{ rows: 2 }} />
        <div className="mt-auto">
          <Skeleton.Button active className="w-full mb-2" />
          <Skeleton.Button active className="w-full" />
        </div>
      </div>
    </Card>
  );

  return (
    <div className="py-10 min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-10">
        <div className="flex items-center mb-4 lg:mb-0">
          <span className="font-semibold mr-4 text-lg">Chọn sàn: </span>
          <Select
            defaultValue="Tất cả"
            onChange={handlePlatformChange}
            style={{ width: 200 }}
            className="shadow-md rounded-md"
          >
            {platforms.map((platform) => (
              <Option key={platform} value={platform}>
                {platform}
              </Option>
            ))}
          </Select>
        </div>
        <Input.Search
          placeholder="Tìm kiếm sản phẩm theo tên hoặc URL"
          onSearch={handleSearch}
          className="w-full lg:w-80 shadow-md"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(12)].map((_, index) => (
            <div key={index}>{renderProductSkeleton()}</div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSave={handleSaveProduct}
              onView={handleViewProduct}
            />
          ))}
        </div>
      )}

      <Pagination
        current={currentPage}
        total={filteredProducts.length}
        pageSize={pageSize}
        onChange={handlePageChange}
        className="mt-8 text-center"
        showSizeChanger={false}
        align='center'
      />
    </div>
  );
};

export default ProductList;
