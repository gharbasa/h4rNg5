import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'h4r-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss']
})
export class UserRowComponent implements OnInit {

	@Input() user:any;
  	constructor() { 
  		
  	}

  	ngOnInit() {
  		
  	}

}
