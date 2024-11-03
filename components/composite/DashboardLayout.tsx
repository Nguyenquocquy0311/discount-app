import { useMenuContext } from "@/context/MenuSidebarContext";
import HeaderDashboard from "./header/HeaderDashboard";
import Sidebar from "./sidebar/Sidebar";
import ProductTab from "./tab/ProductTab";
import VoucherTab from "./tab/VoucherTab";
import ChartTab from "./tab/ChartTab";
import UserTab from "./tab/UserTab";
import Auth from "@/context/AuthContext";
import { Role } from "@/constant/role";
import { EmptyData } from "./EmptyData";

export default function DashboardLayout() {
  const { activeMenu } = useMenuContext();
  const { userInfo } = Auth.useContainer();

  const renderAdminTable = () => {
    switch (activeMenu) {
      case 'user':
        return <UserTab />;
      case 'product':
        return <ProductTab />;
      case 'voucher':
        return <VoucherTab />;
      case 'chart':
        return <ChartTab />;
      default:
        return <EmptyData />;
    }
  };

  const renderManagerTable = () => {
    switch (activeMenu) {
      case 'product':
        return <ProductTab />;
      case 'voucher':
        return <VoucherTab />;
      case 'chart':
        return <ChartTab />;
      default:
        return <EmptyData />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full">
        <HeaderDashboard title="Trang quản trị" />
        <div className="pt-4 bg-slate-200">
          {userInfo?.role && userInfo.role === Role.ADMIN ? renderAdminTable() : renderManagerTable()}
        </div>
      </div>
    </div>
  );
}
