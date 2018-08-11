import { Component, OnInit, Input } from '@angular/core';
import { LoggingService, Config } from 'loggerservice';
import { Pagination } from '../../models/Pagination';

@Component({
  selector: 'h4r-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() pageSettings:Pagination = null;
  constructor(private logger: LoggingService) { }

  ngOnInit() {
    
  }

  ngOnChanges() {
    this.setup();
  }
  
  setup() {
    if(this.pageSettings == null || this.pageSettings.list == null || this.pageSettings.list.length === 0) {
      this.logger.info(this, "List is empty.");
      return;
    }
    
    this.pageSettings.identifyTotalNumberOfPages();
    
    let json:any = this.pageSettings.buildBoundaryIndexRange(1);  
  }

  /**
   * Click event.
   * @param page 
   */
  pageClicked(page:number): boolean {
    this.logger.info(this, "clicked pageIndex=" + page);
    this.pageSettings.currentPage = page;
    this.pageSettings.buildBoundaryIndexRange(page);
    this.pageSettings.pageChanged.emit(page);
    return false;
  }
}
