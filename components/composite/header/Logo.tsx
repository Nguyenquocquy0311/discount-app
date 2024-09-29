import classNames from "classnames";
import Link from "next/link"

interface LogoProps {
  textColor: string;
}

const Logo: React.FC<LogoProps> = ({ textColor }) => {
  return (
    <Link className="flex space-x-4 items-center logo-font" href="/">
        <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" draggable="false" alt="logo" width={36} />
        <span className={classNames("font-bold text-xl", textColor)}>BLOGGIAMGIA</span>
    </Link>
  )
}

export default Logo;
