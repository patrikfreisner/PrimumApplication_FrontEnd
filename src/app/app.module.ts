import {BrowserModule} from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {AppComponent} from './app.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PrimumPageComponent} from './primum-portal/primum-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {NavbarComponent} from './dashboard-page/dp-navbar/navbar.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {ModalService} from './dashboard-page/Services/ModalServices/modal.service';
import {NgxMaskModule} from 'ngx-mask';
import {ControlPanelComponent} from './control-panel/control-panel.component';
import {CpDashboardComponent} from './control-panel/cp-dashboard/cp-dashboard.component';
import {CpOrdersComponent} from './control-panel/cp-orders/cp-orders.component';
import {CpPaymentsComponent} from './control-panel/cp-payments/cp-payments.component';
import {CpCustomersComponent} from './control-panel/cp-customers/cp-customers.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HelpersModule} from './Helpers/helpers.module';
import { CustomersComponent } from './dashboard-page/dp-customers/customers.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ServiceOrdersComponent } from './dashboard-page/dp-service-orders/service-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    PrimumPageComponent,
    DashboardPageComponent,
    NavbarComponent,
    ControlPanelComponent,
    CpDashboardComponent,
    CpOrdersComponent,
    CpPaymentsComponent,
    CpCustomersComponent,
    CustomersComponent,
    ServiceOrdersComponent,
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HelpersModule,
    NgxMaskModule.forRoot()
  ],
  providers: [ModalService, NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
