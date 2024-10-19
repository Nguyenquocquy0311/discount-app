import Layout from "@/components/composite/Layout";
import ProductPage from "@/components/page/productPage/ProductPage";

const Page = () => {
  return (
    <Layout
      meta={{
        title: 'Blog Giảm Giá - Săn Hàng Giảm Giá, Mua Sắm Thông Minh',
        description: 'Description',
      }}>
      <ProductPage />
    </Layout>
  )
}

export default Page;
