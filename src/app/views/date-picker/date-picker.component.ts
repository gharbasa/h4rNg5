import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgbDatepickerConfig, NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { LoggingService } from 'loggerservice';

@Component({
  selector: 'h4r-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [NgbDatepickerConfig] // add NgbDatepickerConfig to the component providers
})
export class DatePickerComponent implements OnInit {

  @Input() private value:any;
  @Input() private name:string = ""; //Optional
  @Output() onDateChanged:EventEmitter<string> = new EventEmitter();
  constructor(private config: NgbDatepickerConfig, 
              private dateFormatter:NgbDateParserFormatter,
              private logger: LoggingService) { }

  ngOnInit() {

  }
  
  ngOnChanges() {
    this.logger.info(this, "ngOnChanges calling setValue value=" + this.value);
    this.setValue(this.value);
  }

  dateChanged() {
    //this.dateFormatter.parse(this.date);
    let dateStr:string = this.value.day + "-" + this.value.month + "-" + this.value.year; //{"year":2018,"month":4,"day":1}
    this.onDateChanged.emit(dateStr);
  }

  //dd-mm-yyyy
  setValue(dateParam:string):void {
    //let tokens:string[] = dateParam.split("-");
    this.logger.info(this, "setValue dateParam=" + dateParam);
    this.value = this.dateFormatter.parse(dateParam);
  }

  getValue():any {
    return this.value.day + "-" + this.value.month + "-" + this.value.year;
  }
}
