import { EventEmitter } from "@angular/core";

export class Pagination {
    public static readonly LIST_PAGE_SIZE:number = 10; //Number of records to display per page.
    public currentPage: number = 1;
    public startIndex:number = 0;
    public endIndex:number = Pagination.LIST_PAGE_SIZE - 1;
    public originalList:Array<any> = []; //Backup of the actual list
    public list:Array<any> = []; //actual records we are going to display
    //public paginatedList:Array<any> = [];
    public numberOfPages: number = 0;
    public inactiveRecords:boolean = false;
	public activeRecords:boolean = true;
    public pageNumbers:Array<number> = [];
    public pageChanged:EventEmitter<number> = new EventEmitter; //This is used in cloudsearch
    constructor(list:Array<any>, activeRecords:boolean, inactiveRecords:boolean) {
        if(list == null) list = [];
        this.originalList = list;
        this.inactiveRecords = inactiveRecords;
        this.activeRecords = activeRecords;
    }
    
    getPaginatedList():Array<any> {
        if(this.originalList  == null || this.originalList.length == 0)
            return null;

        this.list = this.prepareViewableList();
        let paginatedList:Array<any> = [];
        for(let i:number = this.startIndex; i<=this.endIndex; i++) {
            if(this.list[i] != undefined && this.list[i] != null)
			    paginatedList.push(this.list[i]);
        }
        return paginatedList;
    }

    prepareViewableList():Array<any> {
        let viewList:Array<any> = [];
        let that = this;
        this.originalList.forEach(record => {
            if (that.showRecord(record))
            viewList.push(record);
        });
        return viewList;
    }

    identifyTotalNumberOfPages() {
        this.numberOfPages = this.list.length / Pagination.LIST_PAGE_SIZE;
        let remainder:number = this.list.length % Pagination.LIST_PAGE_SIZE;
        if(remainder > 0)
            this.numberOfPages++; 
        
        this.pageNumbers.length = 0;
        for(let i:number = 1; i<=this.numberOfPages; i++ ) {
            this.pageNumbers.push(i);
        }
    }

    buildBoundaryIndexRange(pageNumber:number) {
        this.currentPage = pageNumber;
        this.startIndex = (pageNumber - 1) * Pagination.LIST_PAGE_SIZE;
        this.endIndex = this.startIndex + (Pagination.LIST_PAGE_SIZE - 1);
        if(this.endIndex >= this.list.length) {
            this.endIndex = this.list.length - 1;
        }
    }

    showRecord(record:any):boolean {
        if(this.showBothActiveAndInactiveRecords()) {
            return true;
        } else if (this.showActiveRecordsOnly()) {
            return record.active;
        } else if (this.showInactiveRecordsOnly()) {
            return !record.active;
        }
    }
    
    showActiveRecordsOnly():boolean {
        return ((this.activeRecords) && (!this.inactiveRecords));
    }

    showInactiveRecordsOnly():boolean {
        return ((this.inactiveRecords) && (!this.activeRecords));
    }

    showBothActiveAndInactiveRecords():boolean {
        return ((this.inactiveRecords) && (this.activeRecords));
    }
}
