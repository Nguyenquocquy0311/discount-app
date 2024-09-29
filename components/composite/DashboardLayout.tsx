import { useMenuContext } from "@/context/MenuSidebarContext";
import HeaderDashboard from "./header/HeaderDashboard";
import Sidebar from "./sidebar/Sidebar";
import ProductTab from "./tab/ProductTab";
import VoucherTab from "./tab/VoucherTab";
import ChartTab from "./tab/ChartTab";
import UserTab from "./tab/UserTab";

export default function DashboardLayout() {
  const { activeMenu } = useMenuContext();

  const renderTable = () => {
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
        return <h1>Hello World</h1>;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full">
        <HeaderDashboard title="Trang quản trị" />
        <div className="pt-4 bg-slate-200">
          {renderTable()}
        </div>
      </div>
    </div>
  );
}
