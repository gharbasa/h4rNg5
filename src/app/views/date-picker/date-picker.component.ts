import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {NgbDatepickerConfig, NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { LoggingService } from 'loggerservice';

@Component({
  selector: 'h4r-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [NgbDatepickerConfig] // add NgbDatepickerConfig to the component providers
})
export class DatePickerComponent implements OnInit {

  private date:any; //{"year":2018,"month":4,"day":1}
  @Output() onDateChanged:EventEmitter<string> = new EventEmitter();
  constructor(private config: NgbDatepickerConfig, 
              private dateFormatter:NgbDateParserFormatter,
              private logger: LoggingService) { }

  ngOnInit() {
  }

  dateChanged() {
    //this.dateFormatter.parse(this.date);
    this.onDateChanged.emit(this.date);
  }

  //dd-mm-yyyy
  setDate(dateParam:string):void {
    let tokens:string[] = dateParam.split("-");
    this.logger.info(this, "dateParam=" + dateParam);
    this.date = this.dateFormatter.parse(dateParam);
  }

  getDate():any {
    return this.date.day + "-" + this.date.month + "-" + this.date.year;
  }

}
