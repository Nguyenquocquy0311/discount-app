import Layout from "@/components/composite/Layout";
import LadingPage from "@/components/page/landingpage/LandingPage";

const Page = () => {
  return (
    <Layout
    meta={{
      title: 'Blog Giảm Giá - Săn Hàng Giảm Giá, Mua Sắm Thông Minh',
      description: 'Description',
     }}>
      <LadingPage/>
    </Layout>
  )
}

export default Page;
