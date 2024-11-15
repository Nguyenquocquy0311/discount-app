import { VoucherCard } from "@/components/composite/card/VoucherCard";
import { Voucher } from "@/types/voucher";
import { useState } from "react";

export interface VoucherMatchingProps {
    id: string;
    admin: null;
    adminId: null;
    platform: string;
    affLink: string;
    targetUser: null;
    status: null;
    startAt: string;
    expiredAt: string;
    couponType: string;
    couponCode: string;
    couponCategoryEntity: {
        id: number;
        categoryName: string;
        avatarUrl: string;
    };
    couponCategoryId: number;
    discountAmount: number;
    discountReward: number;
    totalClick: number;
    minSpend: number;
    percentageUsed: number;
    voucherShop: null;
    note: string;
    updatedAt: string;
    createdAt: string;
    isInWallet: boolean;
    title: string;
    longDescription: string;
}

const VoucherMatching = ({ vouchers }: { vouchers: VoucherMatchingProps[] }) => {
    const [showAll, setShowAll] = useState(false);

    const displayedVouchers = showAll ? vouchers : vouchers.slice(0, 10);

    return (
        <div className="mx-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Mã giảm giá tương ứng</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {displayedVouchers.length > 0 ? displayedVouchers.map((voucher) => (
                    <VoucherCard
                        key={voucher.id}
                        platform={voucher.platform}
                        discountAmount={voucher.discountAmount}
                        percentageUsed={voucher.percentageUsed}
                        couponType={voucher.couponType}
                        expiredAt={voucher.expiredAt}
                        couponCode={voucher.couponCode}
                        note={voucher.note}
                        affLink={voucher.affLink}
                    />
                )) : <div className="text-gray-500">Không tìm thấy mã giảm giá tương ứng</div>}
            </div>

            {vouchers.length > 10 && (
                <div className="text-center mt-6 mb-10">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {showAll ? 'Thu gọn' : 'Hiện thêm'}
                    </button>
                </div>
            )}
        </div>
    )
}

export default VoucherMatching;