import Layout from "@/components/composite/Layout";
import ProductSavedPage from "@/components/page/productSavedPage/productSavedPage";

const Page = () => {
    return (
        <Layout
            meta={{
                title: 'Blog Giảm Giá - Săn Hàng Giảm Giá, Mua Sắm Thông Minh',
                description: 'Description',
            }}>
            <ProductSavedPage />
        </Layout>
    )
}

export default Page;
