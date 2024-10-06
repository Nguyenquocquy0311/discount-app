import React, { useState, useEffect } from 'react';
import { Input, Button, Card, Pagination, Select, notification } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import Auth from '@/context/AuthContext';
import { getAllProducts } from '@/services/product';
import { Product } from '@/types/product';
const { Option } = Select;

const ProductList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState<string | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [savedProducts, setSavedProducts] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const platforms = ['Tất cả', 'Shopee', 'Lazada', 'Tiki'];
  const pageSize = 12;

  const { userInfo } = Auth.useContainer();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const products = await getAllProducts();
        setProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        notification.error({ message: 'Lỗi khi lấy danh sách sản phẩm' });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle saving products
  const handleSaveProduct = (productId: number) => {
    if (!userInfo) {
      notification.error({ message: 'Bạn cần đăng nhập để lưu sản phẩm' });
      return;
    }
    setSavedProducts([...savedProducts, productId]);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Get the products for the current page
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="py-10 min-h-screen bg-gray-50">
      {/* Search and select */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-10">
        <div className="flex items-center mb-4 lg:mb-0">
          <span className="font-semibold mr-4 text-lg">Chọn sàn: </span>
          <Select
            defaultValue="Tất cả"
            onChange={(value) => setSelectedPlatform(value)}
            style={{ width: 200 }}
            className="shadow-md rounded-md"
          >
            {platforms.map((platform, index) => (
              <Option key={index} value={platform}>
                {platform}
              </Option>
            ))}
          </Select>
        </div>
        <Input.Search
          placeholder="Tìm kiếm sản phẩm theo tên hoặc URL"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-lg w-80 shadow-md"
        />
      </div>

      {/* Product list */}
      {loading ? (
        <div className="flex justify-center items-center h-80">
          <span>Đang tải dữ liệu...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {paginatedProducts.map((product) => (
            <Card
              key={product.id}
              hoverable
              className="relative rounded-lg overflow-hidden shadow-lg border border-gray-200"
              cover={<img alt={product.name} src={product.image} className="h-60 w-full object-cover" />}
            >
              <h2 className="font-bold text-lg text-gray-800 mb-2">{product.name}</h2>
              <p className="text-green-600 font-semibold mb-2">
                Giá: {product.currentPrice.toLocaleString()} VND
              </p>
              <Button
                type="link"
                href={product.affLink}
                target="_blank"
                className="w-full bg-blue-500 text-white font-semibold hover:bg-blue-600 mt-2"
              >
                Xem sản phẩm
              </Button>
              <div className="absolute right-0 top-0 p-2 text-white bg-blue-400 font-bold rounded-bl-lg">
                {product.ratingAvg ? product.ratingAvg.toFixed(1) : '0'} ⭐
              </div>
              <div className="w-full border-t border-gray-200 pt-4 flex justify-between items-center mt-4">
                <Button
                  key={product.id}
                  icon={<SaveOutlined />}
                  onClick={() => handleSaveProduct(product.id)}
                  disabled={savedProducts.includes(product.id)}
                  className={`${
                    savedProducts.includes(product.id)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  } w-full hover:bg-green-400`}
                >
                  {savedProducts.includes(product.id) ? 'Đã lưu' : 'Lưu sản phẩm'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        current={currentPage}
        total={products.length}
        pageSize={pageSize}
        onChange={handlePageChange}
        className="mt-8 text-center"
      />
    </div>
  );
};

export default ProductList;
