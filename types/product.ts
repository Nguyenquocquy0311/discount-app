export interface IProduct {
    id: number;
    name: string;
    image: string;
    affLink: string;
    currentPrice: number;
    productType: {
        id: number;
        category: string;
    };
    ratingAvg: number | null;
    ratingCount: number;
    historyPrice: {
        date: string;
        price: number;
    }[];
    saved: boolean;
}

export interface Product {
    id: number;
    shop: {
        id: number;
        shopName: string;
        createdAt: string;
    };
    name: string;
    image: string;
    affLink: string;
    currentPrice: number;
    productType: {
        id: number;
        category: string;
    };
    isOfficialShop: boolean | null;
    ratingAvg: number | null;
    sold: number;
    ratingCount: number;
    createdAt: string;
    updatedAt: string;
    historyPrice: {
        date: string;
        price: number;
    }[];
    vouchersFound: {
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
        createdAt: string;
        isInWallet: boolean;
        title: string;
        longDescription: string;
    }[];
}

