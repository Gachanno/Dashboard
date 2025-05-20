export type TTable = {
    page: number,
    pages: number,
    limit: number,
    sort: TSort
    filter?: TFilter
}

export type TSort = {
    sortBy: TSortBy,
    order: 'asc' | 'desc'
}

export type TFilter = {
    min?: string,
    max?: string,
}

export type TFilterAction = {
    min?: string,
    max?: string,
}

export type TSortBy = 'id' | 'description' | 'type' | 'category' | 'date' | 'amount'