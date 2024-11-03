import { Avatar, Dropdown, Menu } from "antd";
import { CloudDownloadOutlined, LogoutOutlined, ProfileOutlined, SnippetsOutlined, TagsOutlined, LineChartOutlined, UserOutlined } from "@ant-design/icons";
import Auth from "@/context/AuthContext";
import { useRouter } from "next/router";
import { routes } from "@/constant/routes";
import { Role } from "@/constant/role";
// import { routes } from "@/constant/routes";

export default function UserMenu() {
    const {
        userInfo,
        logout,
    } = Auth.useContainer();

    const router = useRouter();

    const allowedRoutes = [routes.admin, routes.manager];

    const menuUser = (
        <Menu>
            <div className="mx-4">
                <p className="font-medium text-lg">{userInfo?.name || 'Guest'}</p>
                <p className="text-slate-500">Vai trò: {userInfo?.role}</p>
            </div>
            <Menu.Divider />
            {userInfo?.role && allowedRoutes.includes(router.pathname) && (
                <>
                    <Menu.Item key="1" icon={<ProfileOutlined />} onClick={() => router.push(routes.home)}>
                        Trang chủ
                    </Menu.Item>
                    <Menu.Item key="2" icon={<TagsOutlined />} onClick={() => router.push(routes.voucher)}>
                        Voucher
                    </Menu.Item>
                    <Menu.Item key="3" icon={<SnippetsOutlined />} onClick={() => router.push(routes.product)}>
                        Sản phẩm
                    </Menu.Item>
                </>
            )}
            {userInfo?.role && userInfo.role === Role.ADMIN && (
                <Menu.Item key="4" icon={<LineChartOutlined />} onClick={() => router.push(routes.admin)}>
                    Admin
                </Menu.Item>
            )}
            {userInfo?.role && userInfo.role === Role.MANAGER && (
                <Menu.Item key="5" icon={<LineChartOutlined />} onClick={() => router.push(routes.manager)}>
                    Manager
                </Menu.Item>
            )}
            <Menu.Divider />
            <Menu.Item key="6" icon={<ProfileOutlined />} onClick={() => router.push(routes.profile)}>
                Profile
            </Menu.Item>
            <Menu.Item key="7" icon={<CloudDownloadOutlined />} onClick={() => router.push(routes.productSaved)}>
                Sản phẩm đã lưu
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="8" icon={<LogoutOutlined />} onClick={logout}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menuUser} placement="bottomRight" trigger={['click']} className="text-lg">
            {(!userInfo?.avatar || userInfo?.avatar === '') ? (
                <Avatar size="large" icon={<UserOutlined />} className="cursor-pointer hover:opacity-80" />
            ) : (
                <Avatar size="large" src={userInfo?.avatar} className="cursor-pointer hover:opacity-80" />
            )}
        </Dropdown>
    );
}
