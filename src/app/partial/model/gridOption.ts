export interface GridOption {
    allrecords: boolean;
    search?: string;
    filter?: any;
    sortField?: any;
    sortOrder?: any;
    skip?: number; // = this.pageSize * this.pageNumber;
    limit?: number; // = this.pageSize;
    searchfields?: any;
    pagesize?: number;
}