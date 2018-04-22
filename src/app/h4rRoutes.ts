import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { AboutComponent } from './views/about/about.component';
import { HomeComponent } from './views/home/home.component';
import { NewuserComponent } from './views/newuser/newuser.component';
import { AdminComponent } from './views/admin/admin.component';
import { UsersComponent } from './views/users/users.component';
import { NotificationTypeComponent } from './views/notification-type/notification-type.component';
import { NotificationTypeListComponent } from './views/notification-type-list/notification-type-list.component';
import { HouseComponent } from './views/house/house.component';
import { HouseListComponent } from './views/house-list/house-list.component';
import { NotificationsComponent } from './views/notifications/notifications.component';
import { UserHouseLinksComponent } from './views/user-house-links/user-house-links.component';
import { HouseContractsComponent } from './views/house-contracts/house-contracts.component';
import { HouseContractComponent } from './views/house-contract/house-contract.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { PerformanceChartsComponent } from './views/performance-charts/performance-charts.component'; 
import { ReceivablesComponent } from './views/receivables/receivables.component';

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
    
}



