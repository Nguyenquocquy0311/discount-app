import Header from "@/components/composite/header/Header";
import Footer from "@/components/common/Footer";
import { Breadcrumb } from "antd";
import ProductList from "../../composite/ProductList";
import SmoothTop from "../../composite/SmoothTop";
import GiftBanner from "./components/GiftBanner";
import { routes } from "@/constant/routes";

export default function ProductPage() {

  return (
    <>
      <Header />
      <div className="pt-16">
        <div className="container pt-4">
          <Breadcrumb
            style={{
              fontSize: '16px'
            }}
            className="my-6"
            items={[
              {
                href: routes.home,
                title: (
                  <>
                    <span>Trang chủ</span>
                  </>
                ),
              },
              {
                title: (
                  <>
                    <span>Sản phẩm</span>
                  </>
                ),
              }
            ]} />
          <GiftBanner />
          <ProductList />
        </div>
        <Footer />
      </div>
      <SmoothTop />
    </>
  );
}
