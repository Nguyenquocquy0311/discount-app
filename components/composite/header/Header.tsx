import Logo from "./Logo";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import Auth from "@/context/AuthContext";
import UserMenu from "./UserMenu";

export default function Header() {
  const [isAtTop, setIsAtTop] = useState(true);
  const router = useRouter();

  const { userInfo, openModalLogin } = Auth.useContainer();

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

  const RedirectLogin = () => {
    router.push('/ma-giam-gia');
  };

  const RedirectProduct = () => {
    router.push('/san-pham');
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <header className={classNames("fixed z-50 w-full h-20 bg-cover flex items-center justify-between px-10", isAtTop ? "bg-gradient-header" : "bg-white shadow-md")}>
      <Logo textColor="text-slate-700" />

      <div className="grid grid-flow-col items-center space-x-4">
        <button className="px-6 py-2 text-slate-600 hover:text-slate-500 font-semibold" onClick={RedirectLogin}>Mã giảm giá</button>
        <button className="px-6 py-2 text-slate-600 hover:text-slate-500 font-semibold" onClick={RedirectProduct}>Sản phẩm</button>
        {userInfo ? (
          <UserMenu />
        ) : (
          <div className="flex space-x-3">
            <button className="px-5 py-2 text-white font-semibold bg-blue-500 hover:opacity-75 rounded-3xl" onClick={openModalLogin}>
              Đăng nhập
            </button>
            <button className="px-5 py-2 text-blue-500 border border-blue-500 font-semibold rounded-3xl hover:text-blue-700 hover:text-blue-700" onClick={openModalLogin}>
              Đăng ký
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
