import classNames from "classnames";
import UserMenu from "./UserMenu";

interface HeaderProps {
  title: string;
}

const HeaderDashboard: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className={classNames("bg-white w-full h-16 flex items-center px-10")}>
      <h2 className="font-bold text-lg flex-grow">{title}</h2> {/* Thêm flex-grow vào đây */}

      <div className="ml-auto flex space-x-4"> {/* Sử dụng ml-auto để đẩy UserMenu sang bên phải */}
        <UserMenu />
      </div>
    </header>
  );
}

export default HeaderDashboard;
