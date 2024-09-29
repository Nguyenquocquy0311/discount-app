import DashboardLayout from "@/components/composite/DashboardLayout";
import Layout from "@/components/composite/Layout";

const Page = () => {
  return (
    <Layout
    meta={{
      title: 'Blog Giảm Giá - Săn Hàng Giảm Giá, Mua Sắm Thông Minh',
      description: 'Description',
     }}>
      <DashboardLayout />
    </Layout>
  )
}

export default Page;
