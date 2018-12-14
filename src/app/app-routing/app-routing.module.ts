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

const routes: Routes = [
  {path: '', redirectTo: 'dash/cust', pathMatch: 'full'},
  {
    path: 'dash', component: DashboardPageComponent,
    children: [
      {path: 'main', component: PrimumPageComponent},
      {path: 'cust', component: CustomersComponent},
      {path: 'orders', component: ServiceOrdersComponent}
    ]
  },
  {
    path: 'control', component: ControlPanelComponent,
    children:
      [
        {path: '', redirectTo: 'dash', pathMatch: 'full'},
        {path: 'dash', component: CpDashboardComponent},
        {path: 'orders', component: CpOrdersComponent},
        {path: 'payments', component: CpPaymentsComponent},
        {path: 'customers', component: CpCustomersComponent}
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
