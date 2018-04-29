import { Routes, RouterModule } from '@angular/router';

//d3
import { H4rbaseComponent } from './views/h4rbase/h4rbase.component';

import { ImportComponent } from './import/import.component';
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
    ];
    
    static componentDeclarations = [
        AppComponent,
        LoginComponent,
        NavBarComponent,
        ImportComponent,
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
        PaginationComponent
      ]

      static modalDialogEntryPoints = [
        UserIdleWarningDialogComponent,
        ZoomPicAlbumComponent
      ];
}


