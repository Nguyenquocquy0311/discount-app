import { LoginModal } from "@/components/composite/modal/LoginModal";
import Auth from "@/context/AuthContext";
import { MenuProvider } from "@/context/MenuSidebarContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Auth.Provider>
      <MenuProvider>
        <Component {...pageProps} />
        <LoginModal/>
      </MenuProvider>
    </Auth.Provider>
  );
}
