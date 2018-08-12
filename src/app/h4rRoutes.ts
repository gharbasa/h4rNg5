import { Routes, RouterModule } from '@angular/router';

import { H4rbaseComponent } from './views/h4rbase/h4rbase.component';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { NavBarComponent } from './views/nav-bar/nav-bar.component';
import { AboutComponent } from './views/about/about.component';
import { HomeComponent } from './views/home/home.component';
import { NewuserComponent } from './views/newuser/newuser.component';
import { AdminComponent } from './views/admin/admin.component';
import { UsersComponent } from './views/users/users.component';
import { UserRowComponent } from './views/user-row/user-row.component';
import { NotificationTypeComponent } from './views/notification-type/notification-type.component';
import { NotificationTypeListComponent } from './views/notification-type-list/notification-type-list.component';
import { NotificationTypeRowComponent } from './views/notification-type-row/notification-type-row.component';
import { HouseComponent } from './views/house/house.component';
import { HouseRowComponent } from './views/house-row/house-row.component';
import { HouseListComponent } from './views/house-list/house-list.component';
import { HousePicsComponent } from './views/house-pics/house-pics.component';
import { PicAlbumComponent } from './views/pic-album/pic-album.component';
import { HouseNotesComponent } from './views/house-notes/house-notes.component';
import { HouseNoteComponent } from './views/house-note/house-note.component';
import { NotificationsComponent } from './views/notifications/notifications.component';
import { NotificationComponent } from './views/notification/notification.component';
import { UserHouseLinksComponent } from './views/user-house-links/user-house-links.component';
import { HouseContractsComponent } from './views/house-contracts/house-contracts.component';
import { HouseContractComponent } from './views/house-contract/house-contract.component';
import { HouseContractNotesComponent } from './views/house-contract-notes/house-contract-notes.component';
import { HouseContractNoteComponent } from './views/house-contract-note/house-contract-note.component';
import { HouseContractPicsComponent } from './views/house-contract-pics/house-contract-pics.component';
import { UserIdleWarningDialogComponent } from './views/user-idle-warning-dialog/user-idle-warning-dialog.component';
import { ZoomPicAlbumComponent } from './views/zoom-pic-album/zoom-pic-album.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { PerformanceChartsComponent } from './views/performance-charts/performance-charts.component'; 
import { ReceivablesComponent } from './views/receivables/receivables.component';
import { ReceivedPaymentsComponent } from './views/received-payments/received-payments.component';
import { PaginationComponent } from './views/pagination/pagination.component';
import { DatePickerComponent } from './views/date-picker/date-picker.component';
import { HouseSearchResultsComponent } from './views/house-search-results/house-search-results.component';
import { CommunitiesComponent } from './views/communities/communities.component';
import { CommunityComponent } from './views/community/community.component';
import { TicketsComponent } from './views/tickets/tickets.component';
import { TicketComponent } from './views/ticket/ticket.component';
import { TicketNoteComponent } from './views/ticket-note/ticket-note.component';
import { TicketNotesComponent } from './views/ticket-notes/ticket-notes.component';
import { AutofocusDirective } from './directives/Autofocus';
import { AccountsComponent } from './views/accounts/accounts.component'
import { AccountComponent } from './views/account/account.component'
import { AwsHouseSearchResultsComponent } from './views/house-search-results/aws-house-search-results.component';
import { UserHouseLinksDropdownComponent } from './views/user-house-links/user-house-links-dropdown.component';
import { UserEntitlementComponent } from './views/user-entitlement/user-entitlement.component';
import { TabHouseContractsComponent} from './views/house-contracts/tab-house-contracts';

export class h4rRoutes {
    static routes: Routes = [
        {
            path: 'about',
            component: AboutComponent
        },
        {
            path: 'login',
            component: LoginComponent
        },
        {
            path: '',
            component: HomeComponent
        }
        ,
        {
            path: 'postlogin',
            component: HomeComponent
        }
        ,
        {
            path: 'postlogout',
            component: HomeComponent
        }
        ,
        {
            path: 'newUser',
            component: NewuserComponent
        }
        ,
        {
            path: 'editUser/:feature',
            component: NewuserComponent
        }
        ,
        {
            path: 'userentitlement/:id',
            component: UserEntitlementComponent
        }
        ,
        {
            path: 'postupdate',
            component: HomeComponent
        }
        ,
        {
            path: 'admin',
            component: AdminComponent
        },
        {
            path: 'users',
            component: UsersComponent
        }
        ,
        {
            path: 'notificationTypes',
            component: NotificationTypeListComponent
        }
        ,
        {
            path: 'houses',
            component: HouseListComponent
        }
        ,
        {
            path: 'house/:id',
            component: HouseComponent
        }
        ,
        {
            path: 'notificationType/:id',
            component: NotificationTypeComponent
        }
        ,
        {
            path: 'notifications',
            component: NotificationsComponent
        }
        ,
        {
            path: 'houses_users',
            component: UserHouseLinksComponent
        }
        ,
        {
            path: 'communities',
            component: CommunitiesComponent
        }
        ,
        {
            path: 'community/:id',
            component: CommunityComponent
        }
        ,
        {
            path: 'account/:id',
            component: AccountComponent
        }
        
        ,
        {
            path: 'accounts',
            component: AccountsComponent
        }
        ,
        {
            path: 'house_contracts',
            component: HouseContractsComponent
        }
        ,
        {
            path: 'house_contract/:id',
            component: HouseContractComponent
        }
        ,
        {
            path: 'reset-password',
            component: ForgotPasswordComponent
        }
        ,
        {
            path: 'performance',
            component: PerformanceChartsComponent
        }
        ,
        {
            path: 'receivables/:id',
            component: ReceivablesComponent
        }
        ,
        {
            path: 'hsearch',
            component: HouseSearchResultsComponent
        }
        ,
        {
            path: 'hsearch2',
            component: HouseSearchResultsComponent
        }
        ,
        {
            path: 'cloudsearch',
            component: AwsHouseSearchResultsComponent
        }
        ,
        {
            path: 'cloudsearch2',
            component: AwsHouseSearchResultsComponent
        }
        ,
        {
            path: 'tickets',
            component: TicketsComponent
        }
        ,
        {
            path: 'ticket/:id',
            component: TicketComponent
        }
    ];
    
    static componentDeclarations = [
        AppComponent,
        LoginComponent,
        NavBarComponent,
        AboutComponent,
        HomeComponent,
        NewuserComponent,
        AdminComponent,
        UsersComponent,
        UserRowComponent,
        NotificationTypeComponent,
        NotificationTypeListComponent,
        NotificationTypeRowComponent,
        HouseComponent,
        HouseRowComponent,
        HouseListComponent,
        HousePicsComponent,
        PicAlbumComponent,
        HouseNotesComponent,
        HouseNoteComponent,
        NotificationsComponent,
        NotificationComponent,
        UserHouseLinksComponent,
        HouseContractsComponent,
        HouseContractComponent,
        HouseContractNotesComponent,
        HouseContractNoteComponent,
        HouseContractPicsComponent,
        UserIdleWarningDialogComponent,
        ZoomPicAlbumComponent,
        ForgotPasswordComponent,
        PerformanceChartsComponent, ReceivablesComponent
        , ReceivedPaymentsComponent, H4rbaseComponent,
        PaginationComponent, DatePickerComponent, HouseSearchResultsComponent,
        CommunitiesComponent, CommunityComponent,
        TicketsComponent, TicketComponent, TicketNoteComponent, TicketNotesComponent,
        AutofocusDirective, AccountComponent, AccountsComponent,
        AwsHouseSearchResultsComponent,
        UserHouseLinksDropdownComponent, UserEntitlementComponent,
        TabHouseContractsComponent
      ]

      static modalDialogEntryPoints = [
        UserIdleWarningDialogComponent,
        ZoomPicAlbumComponent
      ];
}


