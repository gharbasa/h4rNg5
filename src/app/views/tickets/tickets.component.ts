import { Component, OnInit } from '@angular/core';
import { H4rbaseComponent } from '../h4rbase/h4rbase.component';
import { Pagination } from '../../models/Pagination';
import { LoggingService } from 'loggerservice';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/User';
import { TicketService } from '../../services/TicketService';
import { Ticket } from '../../models/Ticket';

@Component({
  selector: 'h4r-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent extends H4rbaseComponent {

  private pageSettings:Pagination = new Pagination(null);
  private errorMessage:string = "";
  private users:Array<User> = [];
  private filter:any = {status:0};

	constructor(private logger: LoggingService, public loginService: LoginService, private ticketService: TicketService) {
				super(loginService);
	}

  ngOnInit() {
    this.users = this.loginService.getUsers();
    this.fetchTickets();
  }

  fetchTickets():void {
		let that = this;
		this.ticketService.list(this.filter.status).subscribe(res => {
			that.pageSettings = new Pagination(res); //We have to build a new instance of pagination, existing instance will not refresh the view.
			//this.logger.log(this,"notificationTypes =" + JSON.stringify(res));
		}, err=> {
			that.pageSettings = new Pagination(null);
			this.logger.error(this,"error fetching communities, err=" + JSON.stringify(err));
		});
  }
  
  updateStatus(ticket:Ticket):void {
    let that = this;
    this.ticketService.update(ticket).subscribe(res => {
			that.fetchTickets();
			that.logger.log(this,"Ok, ticket is updated successfully.");
		}, err=> {
      that.errorMessage = "Error updating the ticket status";
      this.logger.error(this,"error fetching communities, err=" + JSON.stringify(err));
		});
  }

  canChangeStatus():boolean {
    return (this.isAdminUser());
  }

  getTicketStatus(ticket:Ticket):string {
    let statusStr = "";
    this.TicketStatuses.forEach(status => {
        if(ticket.status == status.id) statusStr = status.name;
    });
    return statusStr;
  }
}
