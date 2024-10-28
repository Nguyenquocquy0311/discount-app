import Logo from "./Logo";
import { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import Auth from "@/context/AuthContext";
import UserMenu from "./UserMenu";
import { routes } from "@/constant/routes";
import { MenuOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function Header() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const { userInfo, openModalLogin, openModalSignup } = Auth.useContainer();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsAtTop(false);
      } else {
        setIsAtTop(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const RedirectVoucher = useCallback(() => {
    router.push(routes.voucher);
  }, [router]);

  const RedirectProduct = useCallback(() => {
    router.push(routes.product);
  }, [router]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={classNames("fixed z-50 w-full h-20 bg-cover flex items-center justify-between px-4 md:px-10", isAtTop ? "bg-gradient-header" : "bg-white shadow-md")}>
      <Logo textColor="text-slate-700" />

      <div className="flex items-center space-x-2">
        {/* <Button className="md:hidden" onClick={toggleMobileMenu}>
          <MenuOutlined />
        </Button> */}
      </div>

      <div className="hidden md:grid md:grid-flow-col md:items-center md:space-x-4">
        <button className="px-6 py-2 text-slate-600 hover:text-slate-500 font-semibold" onClick={RedirectVoucher}>Mã giảm giá</button>
        <button className="px-6 py-2 text-slate-600 hover:text-slate-500 font-semibold" onClick={RedirectProduct}>Sản phẩm</button>
        {userInfo ? (
          <UserMenu />
        ) : (
          <div className="flex space-x-3">
            <button className="px-5 py-2 text-white font-semibold bg-blue-500 hover:opacity-75 rounded-3xl" onClick={openModalLogin}>
              Đăng nhập
            </button>
            <button className="px-5 py-2 text-blue-500 border border-blue-500 font-semibold rounded-3xl hover:text-blue-700 hover:border-blue-700" onClick={openModalSignup}>
              Đăng ký
            </button>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div>
          <div className="absolute top-20 left-0 w-full bg-white shadow-md md:hidden">
            <button className="w-full px-6 py-2 text-slate-600 hover:text-slate-500 font-semibold" onClick={RedirectVoucher}>Mã giảm giá</button>
            <button className="w-full px-6 py-2 text-slate-600 hover:text-slate-500 font-semibold" onClick={RedirectProduct}>Sản phẩm</button>
            {!userInfo && (
              <div className="flex flex-col space-y-2">
                <button className="px-5 py-2 text-white font-semibold bg-blue-500 hover:opacity-75 rounded-3xl" onClick={openModalLogin}>
                  Đăng nhập
                </button>
                <button className="px-5 py-2 text-blue-500 border border-blue-500 font-semibold rounded-3xl hover:text-blue-700 hover:border-blue-700" onClick={openModalSignup}>
                  Đăng ký
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
