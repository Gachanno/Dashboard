export type TLimitOption = {
    value: number,
    label: string
};

export type TSort = {
    sortBy: string,
    order: 'asc' | 'desc'
}

export type TFilter = {
    min?: string,
    max?: string,
}

export type TSortBy = 'id' | 'description' | 'type' | 'category' | 'date' | 'amount'
