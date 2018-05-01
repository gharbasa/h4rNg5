export class Pagination {
    public static readonly LIST_PAGE_SIZE:number = 10; //Number of records to display per page.
    public currentPage: number = 1;
    public startIndex:number = 0;
    public endIndex:number = Pagination.LIST_PAGE_SIZE - 1;
    public list:Array<any> = [];
    public paginatedList:Array<any> = [];
    public numberOfPages: number = 0;

    constructor(list:Array<any>) {
        if(list == null) list = [];
        this.list = list;
    }

    getPaginatedList():Array<any> {
        this.paginatedList.length = 0;
        if(this.list  == null || this.list.length == 0)
            return null;
            
        for(let i:number = this.startIndex; i<=this.endIndex; i++) {
			this.paginatedList.push(this.list[i]);
        }
        return this.paginatedList;
    }

    identifyTotalNumberOfPages() {
        this.numberOfPages = this.list.length / Pagination.LIST_PAGE_SIZE;
        let remainder:number = this.list.length % Pagination.LIST_PAGE_SIZE;
        if(remainder > 0)
            this.numberOfPages++; 
    }

    buildBoundaryIndexRange(pageNumber:number) {
        this.currentPage = pageNumber;
        this.startIndex = (pageNumber - 1) * Pagination.LIST_PAGE_SIZE;
        this.endIndex = this.startIndex + (Pagination.LIST_PAGE_SIZE - 1);
        if(this.endIndex >= this.list.length) {
            this.endIndex = this.list.length - 1;
        }
    }
}