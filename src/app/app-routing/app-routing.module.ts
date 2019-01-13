import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardPageComponent} from '../dashboard-page/dashboard-page.component';
import {PrimumPageComponent} from '../primum-portal/primum-page.component';
import {ControlPanelComponent} from '../control-panel/control-panel.component';
import {CpDashboardComponent} from '../control-panel/cp-dashboard/cp-dashboard.component';
import {CpOrdersComponent} from '../control-panel/cp-orders/cp-orders.component';
import {CpPaymentsComponent} from '../control-panel/cp-payments/cp-payments.component';
import {CpCustomersComponent} from '../control-panel/cp-customers/cp-customers.component';
import {CustomersComponent} from '../dashboard-page/dp-customers/customers.component';
import {ServiceOrdersComponent} from '../dashboard-page/dp-service-orders/service-orders.component';
import {LoginPageComponent} from '../primum-portal/login-page/login-page.component';
import {SignUpPageComponent} from '../primum-portal/sign-up-page/sign-up-page.component';
import {AdminAuthenticatedGuard} from '../Guards/admin-authenticated.guard';
import {CpUserManagementComponent} from '../control-panel/cp-user-management/cp-user-management.component';

import {AuthGuard} from '../Guards/auth.guard';
import {NotAuthenticatedGuard} from '../Guards/not-authenticated.guard';
import {SpCompanyComponent} from '../primum-portal/sign-up-page/sp-company/sp-company.component';
import {SpUserComponent} from '../primum-portal/sign-up-page/sp-user/sp-user.component';
import {WaitingForRegisterComponent} from '../primum-portal/SharedPages/waiting-for-register/waiting-for-register.component';
import {UnregisteredCompanyGuard} from '../Guards/unregistered-company.guard';
import {RegisteredWithoutMoipIDGuard} from '../Guards/registered-without-moip-id.guard';
import {WelcomePageComponent} from '../primum-portal/welcome-page/welcome-page.component';
import {ContactPageComponent} from '../primum-portal/contact-page/contact-page.component';
import {ProductsPageComponent} from '../primum-portal/products-page/products-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'portal', pathMatch: 'full'},
  {
    path: 'portal', component: PrimumPageComponent, canActivate: [NotAuthenticatedGuard],
    children:
      [
        {path: '*', redirectTo: '', pathMatch: 'full'},
        {path: '', component: WelcomePageComponent},
        {path: 'products', component: ProductsPageComponent},
        {path: 'signin', component: LoginPageComponent},
        {
          path: 'signup', component: SignUpPageComponent, children: [
            {path: '', component: SpUserComponent}
          ]
        }
      ]
  },
  {
    path: 'portal', component: SignUpPageComponent, children: [
      {path: 'signup/company', component: SpCompanyComponent, canActivate: [UnregisteredCompanyGuard]},
      {path: 'signin/waiting', component: WaitingForRegisterComponent, canActivate: [RegisteredWithoutMoipIDGuard]}
    ]
  },
  {
    path: 'dash', component: DashboardPageComponent, canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'cust', pathMatch: 'full'},
      {path: 'cust', component: CustomersComponent},
      {path: 'orders', component: ServiceOrdersComponent}
    ]
  },
  {
    path: 'control', component: ControlPanelComponent, canActivate: [AdminAuthenticatedGuard],
    children:
      [
        {path: '*', redirectTo: 'customers', pathMatch: 'full'},
        {path: 'dash', component: CpDashboardComponent},
        {path: 'orders', component: CpOrdersComponent},
        {path: 'payments', component: CpPaymentsComponent},
        {path: 'customers', component: CpCustomersComponent},
        {path: 'user_management', component: CpUserManagementComponent}
      ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
