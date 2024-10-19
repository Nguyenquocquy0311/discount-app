import Layout from "@/components/composite/Layout";
import DiscountCodePage from "@/components/page/discountCodePage/DiscountCodePage";

const Page = () => {
  return (
    <Layout
    meta={{
      title: 'Blog Giảm Giá - Săn Hàng Giảm Giá, Mua Sắm Thông Minh',
      description: 'Description',
     }}>
      <DiscountCodePage />
    </Layout>
  )
}

export default Page;
