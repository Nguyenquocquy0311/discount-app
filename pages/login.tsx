import Layout from "@/components/composite/Layout";
import LoginPage from "@/components/page/LoginPage";

const Page = () => {
  return (
    <Layout
    meta={{
      title: 'Bloggiamgia | Đăng nhập',
      description: 'Description',
     }}>
      <LoginPage/>
    </Layout>
  )
}

export default Page;
