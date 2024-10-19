import Layout from "@/components/composite/Layout";
import NotFoundPage from "@/components/page/NotFoundPage";

const Page = () => {
  return (
    <Layout
        meta={{
        title: 'Not Found',
        description: 'Description',
        }}>
      <NotFoundPage />
    </Layout>
  )
}

export default Page;
