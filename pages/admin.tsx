import DashboardLayout from "@/components/composite/DashboardLayout";
import Layout from "@/components/composite/Layout";
import { Role } from "@/constant/role";
import { routes } from "@/constant/routes";
import Auth from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Page = () => {
    const { userInfo } = Auth.useContainer();
    const router = useRouter();

    useEffect(() => {
        if (userInfo) {
            const allowedRoles = [Role.ADMIN];
            if (!allowedRoles.includes(userInfo.role)) {
                router.push(routes.notFound);
            }
        }
    }, [userInfo, router])

    return (
        <Layout
            meta={{
                title: 'Blog Giảm Giá - Admin',
                description: 'Description',
            }}>
            <DashboardLayout />
        </Layout>
    )
}

export default Page;
