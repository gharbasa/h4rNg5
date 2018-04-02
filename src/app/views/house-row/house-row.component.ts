import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'h4r-house-row',
  templateUrl: './house-row.component.html',
  styleUrls: ['./house-row.component.scss']
})
export class HouseRowComponent implements OnInit {

	@Input() house:any;
	constructor() { }

	ngOnInit() {
	}

}
