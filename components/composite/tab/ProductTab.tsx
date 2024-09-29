import { Button, Input, Modal, Form, notification } from "antd";
import { useState } from "react";
import ProductTable, { Product } from "../table/ProductTable";

export default function ProductTab() {
  // Initial product data
  const initialProducts: Product[] = [
    { id: 1, name: 'Product 1', price: 100000, category: 'Category A', stock: 20 },
    { id: 2, name: 'Product 2', price: 200000, category: 'Category B', stock: 15 },
    { id: 3, name: 'Product 3', price: 150000, category: 'Category C', stock: 10 },
    { id: 4, name: 'Product 4', price: 300000, category: 'Category D', stock: 5 },
    { id: 5, name: 'Product 5', price: 250000, category: 'Category E', stock: 8 },
  ];

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState(""); // Store search term
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Store selected product for viewing/editing
  const [isModalVisible, setIsModalVisible] = useState(false); // Control modal visibility
  const [isEditMode, setIsEditMode] = useState(false); // Determine if it's edit or add mode

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle opening the modal for Add/Edit
  const showModal = (product?: Product) => {
    if (product) {
      setSelectedProduct(product); // Set product for editing
      setIsEditMode(true);
    } else {
      setSelectedProduct(null); // Clear form for adding new product
      setIsEditMode(false);
    }
    setIsModalVisible(true);
  };

  // Handle form submission for Add/Edit
  const handleFormSubmit = (values: Product) => {
    if (isEditMode && selectedProduct) {
      // Edit product
      setProducts((prev) =>
        prev.map((product) =>
          product.id === selectedProduct.id ? { ...selectedProduct, ...values } : product
        )
      );
      notification.success({ message: "Sản phẩm đã được chỉnh sửa!" });
    } else {
      // Add new product
      const newProduct = { ...values, id: products.length + 1 }; // Create new product with incremented ID
      setProducts((prev) => [...prev, newProduct]);
      notification.success({ message: "Sản phẩm mới đã được thêm!" });
    }
    setIsModalVisible(false); // Close modal after submission
  };

  // Handle product deletion
  const handleDelete = (productId: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
    notification.success({ message: "Sản phẩm đã được xoá!" });
  };

  return (
    <div className="bg-white px-10 h-full rounded-t-xl">
      {/* Header */}
      <div className="grid grid-flow-col justify-between py-5">
        <h1 className="font-sans mb-4">Có tất cả {filteredProducts.length} bản ghi</h1>

        {/* Search Input */}
        <Input.Search
          placeholder="Tìm kiếm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 200 }}
        />

        {/* Add Product Button */}
        <Button type="primary" onClick={() => showModal()}>
          Thêm mới
        </Button>
      </div>

      {/* Product Table with View, Edit, Delete options */}
      <ProductTable
        products={filteredProducts}
        onView={(product) => showModal(product)} // View/Edit product
        onDelete={(productId) => handleDelete(productId)} // Delete product
      />

      {/* Add/Edit Modal */}
      <Modal
        title={isEditMode ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={selectedProduct || { name: '', price: '', category: '', stock: '' }}
          onFinish={handleFormSubmit}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Danh mục"
            name="category"
            rules={[{ required: true, message: 'Vui lòng nhập danh mục!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số lượng tồn kho"
            name="stock"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng tồn kho!' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditMode ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
