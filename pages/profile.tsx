import Layout from "@/components/composite/Layout";
import ProfileUpdatePage from "@/components/page/ProfileUpdatePage";

const Page = () => {
  return (
    <Layout
    meta={{
      title: 'Blog Giảm Giá - Chỉnh sửa thông tin cá nhân',
      description: 'Description',
     }}>
      <ProfileUpdatePage />
    </Layout>
  )
}

export default Page;
