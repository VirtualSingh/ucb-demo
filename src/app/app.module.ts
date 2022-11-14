import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { FollowUpComponent } from './follow-up/follow-up.component';
import { WhoisReportingMenuComponent } from './whois-reporting-menu/whois-reporting-menu.component';
import { ReporterInfoComponent } from './reporter-info/reporter-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { NewPregnancyFormComponent } from './new-pregnancy-form/new-pregnancy-form.component';
import { StepsComponent } from './new-pregnancy-form/steps/steps.component';
import { AEStepsComponent } from './new-ae-form/steps/steps.component';
import { PQCStepsComponent } from './new-pqc-form/steps/steps.component';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { TableModule } from 'primeng/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FollowUpFormComponent } from './follow-up-form/follow-up-form.component';
import {NewAEFormComponent} from './new-ae-form/ae-form.component';
import {NewPQCFormComponent} from './new-pqc-form/pqc-form.component';
import { AeFollowupFormComponent } from './ae-followup-form/ae-followup-form.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FollowUpComponent,
    WhoisReportingMenuComponent,
    ReporterInfoComponent,
    MenuPageComponent,
    NewPregnancyFormComponent,
    NewAEFormComponent,
    StepsComponent,
    AEStepsComponent,
    NewPQCFormComponent,
    PQCStepsComponent,
    GenerateReportComponent,
    FollowUpFormComponent,
    AeFollowupFormComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    TabViewModule,
    DropdownModule,
    TableModule,
    HttpClientModule,
    // CheckboxModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
