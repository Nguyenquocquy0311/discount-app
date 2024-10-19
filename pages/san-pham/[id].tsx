import Layout from "@/components/composite/Layout";
import ProductDetail from "@/components/page/productDetailPage/ProductDetail";
import ProductDetailPage from "@/components/page/productDetailPage/ProductDetailPage";
import ProductPage from "@/components/page/productPage/ProductPage";

const Page = () => {
  return (
    <Layout
      meta={{
        title: 'Blog Giảm Giá - Săn Hàng Giảm Giá, Mua Sắm Thông Minh',
        description: 'Description',
      }}>
      <ProductDetailPage />
    </Layout>
  )
}

export default Page;
