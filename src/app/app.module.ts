import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';

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
import {HelpersModule} from './helpers/helpers.module';
import {CustomersComponent} from './dashboard-page/dp-customers/customers.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {ServiceOrdersComponent} from './dashboard-page/dp-service-orders/service-orders.component';
import {LoginPageComponent} from './primum-portal/login-page/login-page.component';
import {SignUpPageComponent} from './primum-portal/sign-up-page/sign-up-page.component';


// Angular Token
import {Angular2TokenService} from 'angular2-token';
import {AuthGuard} from './Guards/auth.guard';
import {NotAuthenticatedGuard} from './Guards/not-authenticated.guard';
import { CpClientIntegrationComponent } from './control-panel/cp-client-integration/cp-client-integration.component';
import { DpLoadingComponent } from './dashboard-page/dp-loading/dp-loading.component';
import { CpUserManagementComponent } from './control-panel/cp-user-management/cp-user-management.component';
import { SpCompanyComponent } from './primum-portal/sign-up-page/sp-company/sp-company.component';
import { SpUserComponent } from './primum-portal/sign-up-page/sp-user/sp-user.component';
import { WaitingForRegisterComponent } from './primum-portal/SharedPages/waiting-for-register/waiting-for-register.component';

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
    LoginPageComponent,
    SignUpPageComponent,
    CpClientIntegrationComponent,
    DpLoadingComponent,
    CpUserManagementComponent,
    SpCompanyComponent,
    SpUserComponent,
    WaitingForRegisterComponent,
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    HelpersModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    Angular2TokenService,
    AuthGuard,
    NotAuthenticatedGuard,
    ModalService,
    NgbActiveModal,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
