

export type TransactionType = {
    merchant_name: string,
    amount: number,
    date: string,
    category: string[],
    location: {
        region: string
    },
    
}