type DiscountLabel = {
    title : string;
    cliff: string;
    vesting: string;
    yearly: string;
}

export const DISCOUNT_LIST: DiscountLabel[] = [
    {
        title : '25% OFF',
        cliff: '6 Month Cliff',
        vesting: '24 Month Vesting',
        yearly: ''
    },
    {
        title : '55% OFF',
        cliff: '12 Month Cliff',
        vesting: '24 Month Vesting',
        yearly: '25% Yearly'
    },
    {
        title : '65% OFF',
        cliff: '18 Month Cliff',
        vesting: '24 Month Vesting',
        yearly: '25% Yearly'
    },
    {
        title : '75% OFF',
        cliff: '24 Month Cliff',
        vesting: '24 Month Vesting',
        yearly: '25% Yearly'
    }
]