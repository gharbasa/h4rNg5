import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggingService, Config } from 'loggerservice';

@Component({
  selector: 'h4r-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

	constructor(private route: ActivatedRoute, 
			private router: Router, 
			private logger: LoggingService) {
		//this.route.params.subscribe(res => this.logger.log(this,res.id));
	}

	ngOnInit() {
	}
  
	sendMeHome() {
	    this.router.navigate(['']);
	    return false;
	}

}
