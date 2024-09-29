import Header from "@/components/composite/header/Header";
import AdsBanner from "../AdsBanner";
import Footer from "@/components/common/Footer";
import { Breadcrumb } from "antd";
import VoucherList from "../VoucherList";
import SmoothTop from "../SmoothTop";

export default function DiscountCodePage() {

  return (
    <>
      <Header/>
      <div className="pt-16 bg-slate-100">
        <AdsBanner />
        <div className="container">
          <Breadcrumb
            style={{
              fontSize: '16px'
            }}
            className="my-4"
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
                  <span>Mã giảm giá</span>
                </>
              ),
            }
          ]} />
          <VoucherList />
        </div>
        <Footer />
      </div>
      <SmoothTop/>
    </>
  );
}
