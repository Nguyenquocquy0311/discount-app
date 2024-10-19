import { LoginModal } from "@/components/composite/modal/LoginModal";
import { RegisterModal } from "@/components/composite/modal/RegisterModal";
import Auth from "@/context/AuthContext";
import { MenuProvider } from "@/context/MenuSidebarContext";
import { ProductProvider } from "@/context/ProductContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Auth.Provider>
      <MenuProvider>
        <ProductProvider>
          <Component {...pageProps} />
          <LoginModal />
          <RegisterModal />
        </ProductProvider>
      </MenuProvider>
    </Auth.Provider>
  );
}
