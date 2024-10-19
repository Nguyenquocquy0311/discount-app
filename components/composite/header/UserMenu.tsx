import { Avatar, Dropdown, Menu } from "antd";
import { CloudDownloadOutlined, LogoutOutlined, ProfileOutlined, SnippetsOutlined, TagsOutlined, LineChartOutlined, UserOutlined } from "@ant-design/icons";
import Auth from "@/context/AuthContext";
import { useRouter } from "next/router";
import { routes } from "@/constant/routes";
// import { routes } from "@/constant/routes";

export default function UserMenu() {
    const {
        userInfo,
        logout,
    } = Auth.useContainer();

    const router = useRouter()

    const menuUser = (
        <Menu>
            <div className="mx-4">
                <p className="font-medium text-lg">{userInfo?.name || 'Guest'}</p> {/* Thêm fallback khi name không có */}
                <p className="text-slate-500">Vai trò: {userInfo?.role}</p>
            </div>
            <Menu.Divider />
            <Menu.Item key="1" icon={<ProfileOutlined />} onClick={() => router.push(routes.home)}>
                Trang chủ
            </Menu.Item>
            <Menu.Item key="2" icon={<TagsOutlined />} onClick={() => router.push(routes.voucher)}>
                Voucher
            </Menu.Item>
            <Menu.Item key="3" icon={<SnippetsOutlined />}onClick={() => router.push(routes.product)}>
                Sản phẩm
            </Menu.Item>
            <Menu.Item key="4" icon={<LineChartOutlined />}onClick={() => router.push(routes.manager)}>
                Manager
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="5" icon={<ProfileOutlined />} onClick={() => router.push(routes.profile)}>
                Profile
            </Menu.Item>
            <Menu.Item key="6" icon={<CloudDownloadOutlined />}>
                Sản phẩm đã lưu
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="7" icon={<LogoutOutlined />} onClick={logout}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menuUser} placement="bottomRight" trigger={['click']} className="text-lg">
            {(!userInfo?.avatar || userInfo?.avatar=== '') ?  (
                <Avatar size="large" icon={<UserOutlined />} className="cursor-pointer hover:opacity-80" />
            ) : (
                <Avatar size="large" src={userInfo?.avatar} className="cursor-pointer hover:opacity-80" />
            )}
        </Dropdown>
    );
}
