import { Pagination } from "./Pagination";


export class CloudSearchPagination extends Pagination {
    
    private found:number = 0; //number of total records found
	constructor(data:any, activeRecords:boolean, inactiveRecords:boolean) {
        super(data.results, activeRecords, inactiveRecords);
        this.found = data.found;
    }

    identifyTotalNumberOfPages() {
        this.numberOfPages = this.found / Pagination.LIST_PAGE_SIZE;
        let remainder:number = this.found % Pagination.LIST_PAGE_SIZE;
        if(remainder > 0)
            this.numberOfPages++; 
        
        this.pageNumbers.length = 0;
        for(let i:number = 1; i<=this.numberOfPages; i++ ) {
            this.pageNumbers.push(i);
        }
    }

    buildBoundaryIndexRange(pageNumber:number) {
        this.currentPage = pageNumber;
        //this.pageChanged.emit(pageNumber);
        /*
        this.startIndex = (pageNumber - 1) * Pagination.LIST_PAGE_SIZE;
        this.endIndex = this.startIndex + (Pagination.LIST_PAGE_SIZE - 1);
        if(this.endIndex >= this.list.length) {
            this.endIndex = this.list.length - 1;
        }*/
    }

}
