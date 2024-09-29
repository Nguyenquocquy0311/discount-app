import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MenuContextType {
    activeMenu: string;
    setActiveMenu: (menu: string) => void;
}

const MenuSidebarContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState<string>('user');

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
