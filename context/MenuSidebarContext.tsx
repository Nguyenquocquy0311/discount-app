import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Role } from '@/constant/role';
import Auth from './AuthContext';

interface MenuContextType {
    activeMenu: string;
    setActiveMenu: (menu: string) => void;
}

const MenuSidebarContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: ReactNode;}> = ({ children}) => {
    const { userInfo } = Auth.useContainer();
    const role = userInfo?.role ?? Role.USER;
    const defaultMenu = role === Role.ADMIN ? 'user' : role === Role.MANAGER ? 'product' : 'default';
    const [activeMenu, setActiveMenu] = useState<string>(defaultMenu);

    useEffect(() => {
        setActiveMenu(defaultMenu);
    }, [defaultMenu]);

    return (
        <MenuSidebarContext.Provider value={{ activeMenu, setActiveMenu }}>
            {children}
        </MenuSidebarContext.Provider>
    );
};

export const useMenuContext = () => {
    const context = useContext(MenuSidebarContext);
    if (!context) {
        throw new Error('useMenuContext must be used within a MenuProvider');
    }
    return context;
};