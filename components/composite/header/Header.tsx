import Logo from "./Logo";
import { useEffect, useState } from "react";
import classNames from "classnames";

export default function Header() {
  const [isAtTop, setIsAtTop] = useState(true);

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

  return (
    <header className={classNames("fixed z-50 w-full h-20 bg-cover flex items-center justify-between px-10", isAtTop ? "bg-gradient-header" : "bg-white shadow-md")}>
      <Logo textColor="text-slate-700"/>

      <div className="grid grid-flow-col items-center space-x-4">
        {/* <Input.Search placeholder="Tìm kiếm" /> */}
          {/* <div className="flex"> */}
            <button className="px-6 py-2 text-slate-600 hover:text-slate-500 font-semibold">Mã giảm giá</button>
            <button className="px-6 py-2 text-slate-600 hover:text-slate-500 font-semibold">Sản phẩm</button>
            <button className="px-5 py-2 text-white font-semibold bg-blue-500 hover:opacity-75 rounded-3xl">Đăng nhập</button>
          {/* </div> */}
      </div>
    </header>
  );
}
