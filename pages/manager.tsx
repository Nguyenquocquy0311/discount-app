import DashboardLayout from "@/components/composite/DashboardLayout";
import Layout from "@/components/composite/Layout";
import { routes } from "@/constant/routes";
import Auth from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Page = () => {
  const { userInfo } = Auth.useContainer();
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.push(routes.notFound)
    }
  }, [userInfo])

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
