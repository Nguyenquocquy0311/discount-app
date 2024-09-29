import Header from "@/components/composite/header/Header";
import Footer from "@/components/common/Footer";
import { Breadcrumb } from "antd";
import ProductList from "../ProductList";
import SmoothTop from "../SmoothTop";
import GiftBanner from "./GiftBanner";

export default function ProductPage() {

  return (
    <>
      <Header/>
      <div className="pt-16">
        <div className="container">
          <Breadcrumb
            style={{
              fontSize: '16px'
            }}
            className="my-6"
            items={[
            {
              href: '/',
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
