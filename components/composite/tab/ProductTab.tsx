import { Button, Input, Modal, Form, notification, Select } from "antd";
import { useState, useEffect } from "react";
import ProductTable from "../table/ProductTable";
import { createProduct, deleteProduct, getAllProducts, getProductType, updateProduct } from "@/services/product";
import { IProduct } from "@/types/product";

export default function ProductTab() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productTypes, setProductTypes] = useState<{ id: number, category: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Hook for form instance

  useEffect(() => {
    fetchProducts();
    fetchProductTypes();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      // When selectedProduct changes, update the form values
      form.setFieldsValue({
        name: selectedProduct.name,
        currentPrice: selectedProduct.currentPrice,
        productType: selectedProduct.productType.id,
        affLink: selectedProduct.affLink,
        image: selectedProduct.image
      });
    } else {
      // If no product is selected, reset form
      form.resetFields();
    }
  }, [selectedProduct, form]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch products',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProductTypes = async () => {
    try {
      const data = await getProductType();
      setProductTypes(data);
    } catch (error) {
      console.error('Error fetching product types:', error);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.productType.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle opening the modal for Add/Edit
  const showModal = (product?: IProduct) => {
    if (product) {
      setSelectedProduct(product); // Set product for editing
      setIsEditMode(true);
    } else {
      setSelectedProduct(null); // Clear form for adding new product
      setIsEditMode(false);
    }
    setIsModalVisible(true);
  };

  const handleFormSubmit = async (values: { name: string; currentPrice: number; productType: number; affLink: string; image: string }) => {
    if (isEditMode && selectedProduct) {
      try {
        await updateProduct(selectedProduct.id, values);
        notification.success({ message: "Sản phẩm đã được chỉnh sửa!" });
      } catch (error) {
        notification.error({ message: "Failed to update product" });
      }
    } else {
      try {
        await createProduct(values);
        notification.success({ message: "Sản phẩm mới đã được thêm!" });
      } catch (error) {
        notification.error({ message: "Failed to add product" });
      }
    }
    setIsModalVisible(false);
    setSelectedProduct(null); // Reset selected product after submission
  };

  const handleDelete = async (productId: number) => {
    try {
      await deleteProduct(productId);
      notification.success({
        message: 'Success',
        description: 'Xóa sản phẩm thành công',
      });
      fetchProducts();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete product',
      });
    }
  };

  return (
    <div className="bg-white px-10 h-full rounded-t-xl">
      {/* Header */}
      <div className="grid grid-flow-col justify-between py-5">
        <h1 className="font-sans mb-4">Có tất cả {filteredProducts.length} bản ghi</h1>

        <Input.Search
          placeholder="Tìm kiếm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 200 }}
        />

        <Button type="primary" onClick={() => showModal()}>
          Thêm mới
        </Button>
      </div>

      <ProductTable
        products={filteredProducts}
        onView={(product) => showModal(product)}
        onDelete={(productId) => handleDelete(productId)}
      />

      <Modal
        title={isEditMode ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
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
            name="currentPrice"
            rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Danh mục"
            name="productType"
            rules={[{ required: true, message: 'Vui lòng nhập danh mục!' }]}
          >
            <Select options={productTypes.map((type) => ({ label: type.category, value: type.id }))} />
          </Form.Item>

          <Form.Item
            label="Link"
            name="affLink"
            rules={[{ required: true, message: 'Vui lòng nhập link!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ảnh"
            name="image"
            rules={[{ required: true, message: 'Vui lòng nhập ảnh!' }]}
          >
            <Input />
          </Form.Item>

          <div className="flex justify-end gap-3">
            <Button type="default" onClick={() => setIsModalVisible(false)}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              {isEditMode ? "Lưu thay đổi" : "Thêm mới"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
