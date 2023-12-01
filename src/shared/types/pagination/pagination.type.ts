export interface PaginationType {
    page?: number
    limit?: number
    categories?: string
}

export interface PaginationResponseType<T> {
    results: T
    totalItems: number
    totalPages: number
    previousPage: number | null
    currentPage: number
    nextPage: number | null
}
