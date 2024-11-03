import Header from "@/components/composite/header/Header";
import Footer from "@/components/common/Footer";
import { Breadcrumb } from "antd";
import SmoothTop from "../../composite/SmoothTop";
import { routes } from "@/constant/routes";
import { ProductSavedList } from "@/components/composite/ProductSavedList";

export default function ProductSavedPage() {

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
                    <ProductSavedList />
                </div>
                <Footer />
            </div>
            <SmoothTop />
        </>
    );
}
