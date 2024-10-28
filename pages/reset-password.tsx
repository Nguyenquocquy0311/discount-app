import Layout from "@/components/composite/Layout";
import ResetPasswordPage from "@/components/page/ResetPasswordPage";

const Page = () => {
    return (
        <Layout
            meta={{
                title: 'Đặt lại mật khẩu',
                description: 'Đặt lại mật khẩu',
            }}>
            <ResetPasswordPage />
        </Layout>
    )
}

export default Page;
