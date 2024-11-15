import { formatCurrency, formatDayMonthYear } from "@/utils/helper";
import { Button, message } from "antd";
import { ClockCircleOutlined } from '@ant-design/icons';

type VoucherCardProps = {
    platform: string;
    discountAmount: number;
    percentageUsed: number;
    expiredAt: string;
    couponCode: string;
    couponType: string;
    note: string;
    affLink: string;
};

export const VoucherCard: React.FC<VoucherCardProps> = ({
    platform,
    discountAmount,
    percentageUsed,
    expiredAt,
    couponCode,
    couponType,
    note,
    affLink,
}) => {
    const handleCopyVoucherCode = (code: string) => {
        navigator.clipboard
            .writeText(code)
            .then(() => {
                message.success('Đã sao chép mã giảm giá');
            })
            .catch((err) => {
                message.error('Lỗi khi sao chép mã giảm giá');
            });
    };

    return (
        <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <img
                        src={platform === 'Lazada' ? 'https://images.piggi.vn/1720708472672-lazada_bg.webp' : platform === 'Shopee' ? 'https://images.piggi.vn/1720708484611-shopee_bg.webp' : 'https://images.piggi.vn/1720708451347-tiki_bg.webp'}
                        alt={platform}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                </div>
                <div className="flex-grow ml-4">
                    <h4 className="text-lg font-bold text-green-600">Giảm {formatCurrency(discountAmount)}{couponType === 'percent' ? '%' : ''}</h4>
                    <p className="text-sm text-gray-500">Tỉ lệ dùng: {percentageUsed}%</p>
                    <p className="text-sm text-green-600">Lưu ý: {note}</p>
                    <div className="flex items-center mt-2">
                        <ClockCircleOutlined className="text-gray-400 mr-2" />
                        <span className="text-gray-500 text-sm">HSD: {formatDayMonthYear(expiredAt)}</span>
                    </div>
                    <div className="flex justify-between mt-4">
                        <Button className="text-green-600 border-green-600" onClick={() => handleCopyVoucherCode(couponCode)}>#Sao chép mã</Button>
                        <Button type="primary" href={affLink} target="_blank">
                            Đến Banner
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};