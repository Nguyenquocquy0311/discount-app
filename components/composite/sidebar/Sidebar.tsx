import { useMenuContext } from '@/context/MenuSidebarContext';
import { LineChartOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SnippetsOutlined, TagsOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import Logo from '../header/Logo';
import { Role } from '@/constant/role';

interface SidebarProps {
    role: Role;
}

export default function Sidebar({ role }: SidebarProps) {
    const [scaleSidebar, setScaleSidebar] = useState(false);
    const { activeMenu, setActiveMenu } = useMenuContext();

    const menu = [
        ...(role === Role.ADMIN ? [{
            icon: <UsergroupDeleteOutlined />,
            title: 'Người dùng',
            key: 'user'
        }] : []),
        {
            icon: <SnippetsOutlined />,
            title: 'Sản phẩm',
            key: 'product'
        },
        {
            icon: <TagsOutlined />,
            title: 'Voucher',
            key: 'voucher'
        },
        ...(role === Role.ADMIN ? [{
            icon: <LineChartOutlined />,
            title: 'Doanh thu',
            key: 'revenue'
        }] : [])
    ];

    const handleScaleSidebar = () => {
        setScaleSidebar(!scaleSidebar);
    };

    const handleMenuClick = (key: string) => {
        setActiveMenu(key); // Update active menu state
    };

    return (
        <div
            className={classNames(
                "h-full shadow-md transition-all duration-300 ease-in-out", // Smooth transition effect
                scaleSidebar ? "w-80 border-r border-gray-200" : "w-24 bg-slate-200"
            )}
        >
            <div className="py-4 px-2">
                {/* Smooth opacity transition for logo */}
                <div className={classNames("transition-opacity duration-300", scaleSidebar ? "opacity-100" : "opacity-0")}>
                    {scaleSidebar && <Logo textColor='text-black' />}
                </div>
                <ul className="list-none font-sans mt-2">
                    {menu.map((item) => (
                        <li
                            key={item.key}
                            className={classNames(
                                "my-1 py-3 hover:bg-blue-400 hover:text-white rounded-md cursor-pointer",
                                activeMenu === item.key && 'bg-blue-400 text-white',
                                scaleSidebar ? 'flex px-4' : 'grid grid-flow-row'
                            )}
                            onClick={() => handleMenuClick(item.key)}
                        >
                            <div className={classNames(!scaleSidebar && 'mx-auto')}>
                                {item.icon}
                            </div>
                            <span
                                className={classNames(
                                    // "transition-all duration-300", // Transition for text
                                    scaleSidebar ? 'mx-4 opacity-100' : 'mx-auto text-[12px]'
                                )}
                            >
                                {item.title}
                            </span>
                        </li>
                    ))}
                    <li className='w-full border-b-[3px]'></li>
                    <li className="fixed bottom-6 ml-8 cursor-pointer" onClick={handleScaleSidebar}>
                        {scaleSidebar ? (
                            <>
                                <MenuFoldOutlined />
                                <span className='mx-4'>Thu gọn</span>
                            </>
                        ) : (
                            <Tooltip title='Mở rộng'>
                                <MenuUnfoldOutlined />
                            </Tooltip>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
}
