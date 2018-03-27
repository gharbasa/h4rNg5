import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'h4r-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

	constructor(private route: ActivatedRoute, private router: Router) {
		this.route.params.subscribe(res => console.log(res.id));
	}

	ngOnInit() {
	}
  
	sendMeHome() {
	    this.router.navigate(['']);
	    return false;
	}

}
