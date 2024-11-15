import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from "@/components/composite/header/Header";
import Footer from "@/components/common/Footer";
import { Breadcrumb } from "antd";
import SmoothTop from "../../composite/SmoothTop";
import ProductDetail from "./ProductDetail";
import { truncateString } from "@/utils/helper";
import { routes } from "@/constant/routes";
import { getProductDetail } from '@/services/product';
import { Product } from '@/types/product';
import VoucherMatching from './VoucherMatching';
import ProductMatching from './ProductMatching';

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const productData = await getProductDetail(Number(id));
          setProduct(productData);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  if (!id || typeof id !== 'string') return <div>Product not found !!!</div>

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
                title: <span>Trang chủ</span>,
              },
              {
                href: routes.product,
                title: <span>Sản phẩm</span>,
              },
              {
                title: <span>{product ? truncateString(product.name, 30) : 'Đang tải...'}</span>,
              }
            ]} />
          <div className='p-4 pb-16 mb-16 rounded-xl'>
            <ProductDetail id={Number(id)} product={product} />
            <VoucherMatching vouchers={product?.vouchersFound.map(voucher => ({ ...voucher, updatedAt: '' })) || []} />
            <ProductMatching products={product?.similarProducts || []} />
          </div>
        </div>
        <Footer />
      </div>
      <SmoothTop />
    </>
  );
}
