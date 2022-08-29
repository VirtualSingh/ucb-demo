import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { NewPregnancyFormComponent } from './new-pregnancy-form/new-pregnancy-form.component';
import { NewAEFormComponent } from './new-ae-form/ae-form.component';
import { WhoisReportingMenuComponent } from './whois-reporting-menu/whois-reporting-menu.component';
import { FollowUpComponent } from './follow-up/follow-up.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { MainComponent } from './main/main.component';
import { ReporterInfoComponent } from './reporter-info/reporter-info.component';
import { FollowUpFormComponent } from './follow-up-form/follow-up-form.component';
import { AeFollowupFormComponent } from './ae-followup-form/ae-followup-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'menu-page', component: MenuPageComponent },
  { path: 'follow-up', component: FollowUpComponent },
  { path: 'whois-reporting', component: WhoisReportingMenuComponent },
  { path: 'reporter-info', component: ReporterInfoComponent },
  { path: 'pregnancy-form', component: NewPregnancyFormComponent },
  { path: 'ae-form', component: NewAEFormComponent },
  { path: 'generate-report', component: GenerateReportComponent },
  { path: 'new-follow-up', component: FollowUpFormComponent },
  { path: 'ae-followup-form', component: AeFollowupFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
