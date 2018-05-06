import { Component, OnInit } from '@angular/core';
import { H4rbaseComponent } from '../h4rbase/h4rbase.component';
import { LoggingService } from 'loggerservice';
import { LoginService } from '../../services/login.service';
import { TicketService } from '../../services/TicketService';
import { Router, ActivatedRoute } from '@angular/router';
import { Ticket } from '../../models/Ticket';

@Component({
  selector: 'h4r-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent extends H4rbaseComponent {

  private ticket:Ticket = new Ticket();
  private editticket:boolean = true;
  private createNewTicket:boolean = false;
  constructor(private logger: LoggingService, public loginService: LoginService, private ticketService: TicketService
                , private router: Router
                , private route: ActivatedRoute) {
    super(loginService);
  }

  ngOnInit() {
    let that = this;
      let user = this.loginService.getCurrentUser();
  		this.route.params.subscribe(res => {
  			if(res.id == -1) {
  				this.logger.log(this,"User wants to create a new ticket");
  				that.editticket = false;
  				that.ticket.message = "";
  				that.ticket.errorMessage = "";
				  that.createNewTicket = true;
  			} else if(res.id > 0) {
  				//if not -1, then it is a id
  				this.logger.log(this,"User wants to edit community, id=" + res.id);
  				this.ticketService.get(res.id).subscribe(res => {
  					that.ticket = res;
  					that.ticket.message = "";
	  				that.ticket.errorMessage = "";
  				},
  				err => {
  					that.ticket.message = "";
	  				that.ticket.errorMessage = "Problem retrieving community.";
  				});
  			}
  		});
    }

    saveRecord() {
      if(this.ticket.id !== 0) {
        this.update();
      } else {
        this.create();
      }
    }

    create() {
      this.logger.log(this,"Creating a new ticket");
      this.ticketService.create(this.ticket).subscribe(res => {
        this.logger.log(this,"ticket is successfully created");
        this.ticket.message = "Successfully created ticket.";
        this.router.navigate(['postupdate']);
      },
      err => {
        this.logger.log(this,"problem creating the ticket: " + JSON.stringify(err));
        this.ticket.errorMessage = (err.error && err.error.errorMessage)?err.error.errorMessage:"Problem creating the ticket";
      });
    }
    
    update() {
      this.logger.log(this,"Udpating the ticket id=" + this.ticket.id);
      this.ticketService.update(this.ticket).subscribe(res => {
        this.logger.log(this,"Successfully updated");
        this.ticket.message = "Successfully updated the ticket.";
        this.router.navigate(['postupdate']);
      },
      err => {
        this.logger.log(this,"Problem updating the ticket: " + JSON.stringify(err));
        this.ticket.errorMessage = (err.error && err.error.errorMessage)?err.error.errorMessage[0]:"Problem updating the ticket";
      });
    }

    canChangeStatus():boolean {
      return (this.isAdminUser());
    }

    getTicketStatus():string {
      let statusStr = "";
      let that = this;
      this.TicketStatuses.forEach(status => {
          if(this.ticket.status == status.id) statusStr = status.name;
      });
      return statusStr;
    }

}
