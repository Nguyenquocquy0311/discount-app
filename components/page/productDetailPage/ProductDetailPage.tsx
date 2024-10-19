import Header from "@/components/composite/header/Header";
import Footer from "@/components/common/Footer";
import { Breadcrumb } from "antd";
import SmoothTop from "../../composite/SmoothTop";
import ProductDetail from "./ProductDetail";
import { useProduct } from "@/context/ProductContext";
import { truncateString } from "@/helper";
import { routes } from "@/constant/routes";

export default function ProductDetailPage() {
  const { selectedProduct } = useProduct();

  if (!selectedProduct) return <div>Product not found !!!</div>

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
              href: routes.home,
              title: (
                <>
                  <span>Trang chủ</span>
                </>
              ),
            },
            {
              href: routes.product,
              title: (
                <>
                  <span>Sản phẩm</span>
                </>
              ),
            },
            {
              title: (
                <>
                  <span>{truncateString(selectedProduct.name)}</span>
                </>
              ),
            }
            ]} />
          <ProductDetail />
        </div>
        <Footer />
      </div>
      <SmoothTop />
    </>
  );
}
