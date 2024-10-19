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
}

