export interface Product {
    id: number;
    shop: object;
    name: string;
    image: string;
    affLink: string;
    currentPrice: number;
    productType: object;
    isOfficialShop?: boolean
    ratingAvg?: number;
    sold: number;
    ratingCount: number;
}