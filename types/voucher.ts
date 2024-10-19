export interface Voucher {
    id: number;
    admin: string | null;
    adminId: number | null;
    platform: string;
    affLink: string;
    targetUser: string | null;
    status: string | null;
    startAt: string; // ISO date string
    expiredAt: string; // Date with time format
    couponType: string | null;
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
    voucherShop: string | null;
    note: string;
    updatedAt: string;
    createdAt: string;
    isInWallet: boolean;
    title: string;
    longDescription: string;
}
