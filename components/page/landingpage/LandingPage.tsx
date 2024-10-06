import Header from "@/components/composite/header/Header";
import Hero from "./layout/Hero";
import Footer from "../../common/Footer";
import Hot from "./layout/Hot";
import FAQ, { FAQItem } from "./layout/FAQ";
import SmoothTop from "@/components/composite/SmoothTop";

export default function LadingPage() {
  const fagTitle = 'Câu hỏi thường gặp';
  const faqItems: FAQItem[] = [
    {
      title: "Làm thế nào để sử dụng mã giảm giá?",
      content: "Để sử dụng mã giảm giá, bạn cần nhập mã vào ô 'Mã giảm giá' khi thanh toán. Mã sẽ tự động được áp dụng và số tiền giảm sẽ hiển thị trên tổng số thanh toán."
    },
    {
      title: "Tôi có thể sử dụng nhiều mã giảm giá cho một đơn hàng không?",
      content: "Không, bạn chỉ có thể sử dụng một mã giảm giá cho mỗi đơn hàng. Hãy chọn mã phù hợp nhất với đơn hàng của bạn để được giảm giá nhiều nhất."
    },
    {
      title: "Mã giảm giá có thời hạn bao lâu?",
      content: "Mỗi mã giảm giá có thời hạn sử dụng khác nhau. Bạn có thể kiểm tra thông tin chi tiết về thời hạn trong phần mô tả của mã giảm giá hoặc trong lịch sử mã đã nhận."
    },
    {
      title: "Tôi có thể tìm mã giảm giá ở đâu?",
      content: "Bạn có thể tìm mã giảm giá trên trang chủ của ứng dụng, trong các mục khuyến mãi hoặc thông qua thông báo từ ứng dụng."
    },
    {
      title: "Tại sao mã giảm giá của tôi không hoạt động?",
      content: "Mã giảm giá có thể không hoạt động do một số lý do như: mã đã hết hạn, không áp dụng cho sản phẩm bạn chọn, hoặc đơn hàng của bạn chưa đạt mức tối thiểu yêu cầu. Hãy kiểm tra lại điều kiện áp dụng mã."
    },
    {
      title: "Làm thế nào để đăng ký tài khoản?",
      content: "Bạn có thể đăng ký tài khoản bằng cách nhấp vào nút 'Đăng ký' trên trang đăng nhập và điền đầy đủ thông tin cá nhân. Hoặc bạn có thể sử dụng tài khoản Google hoặc Facebook để đăng nhập nhanh."
    },
    {
      title: "Tôi có thể thanh toán bằng những phương thức nào?",
      content: "Chúng tôi chấp nhận thanh toán qua thẻ tín dụng, thẻ ghi nợ, ví điện tử và chuyển khoản ngân hàng. Các tùy chọn thanh toán cụ thể sẽ hiển thị khi bạn tiến hành thanh toán."
    },
    {
      title: "Làm thế nào để liên hệ với bộ phận hỗ trợ khách hàng?",
      content: "Bạn có thể liên hệ với bộ phận hỗ trợ khách hàng qua email tại support@app.com hoặc qua mục 'Liên hệ' trong ứng dụng để được trợ giúp nhanh chóng."
    },
    {
      title: "Tôi có thể theo dõi đơn hàng của mình không?",
      content: "Có, bạn có thể theo dõi trạng thái đơn hàng của mình trong mục 'Đơn hàng của tôi'. Tại đây bạn sẽ thấy thông tin chi tiết về tình trạng vận chuyển và thời gian dự kiến giao hàng."
    },
    {
      title: "Làm thế nào để hủy đơn hàng?",
      content: "Bạn có thể hủy đơn hàng trong vòng 24 giờ sau khi đặt hàng bằng cách vào mục 'Đơn hàng của tôi' và chọn 'Hủy đơn hàng'. Sau thời gian này, đơn hàng không thể hủy được."
    }
  ]

  return (
    <>
      <Header/>
      <div className="pt-0">
        <Hero/>
        <Hot />
        <FAQ title={fagTitle} faqs={faqItems}/>
        <Footer/>
      </div>
      <SmoothTop />
    </>
  );
}
