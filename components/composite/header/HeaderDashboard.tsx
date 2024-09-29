import Logo from "./Logo";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import Auth from "@/context/AuthContext";
import UserMenu from "./UserMenu";

interface HeaderProps {
    title: string;
}

const HeaderDashboard:React.FC<HeaderProps> = ({title}) => {
  const [isAtTop, setIsAtTop] = useState(true);
  const router = useRouter();

  const { userInfo, openModal } = Auth.useContainer()


  return (
    <header className={classNames("fixed z-50 bg-white w-full h-16 flex items-center px-10")}>
      <h2 className="font-bold text-lg">{title}</h2>

      <div className="absolute right-32"><UserMenu /></div>
    </header>
  );
}

export default HeaderDashboard;
