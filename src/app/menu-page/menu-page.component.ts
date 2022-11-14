import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
})
export class MenuPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  onClickNavigateTo() {
    this.router.navigate(['/whois-reporting'], {queryParams:{ form: 'pregnancy'}});
  }
  navigateToFollowUp() {
    this.router.navigate(['/follow-up']);
  }
  navigateToAE(){
    this.router.navigate(['/whois-reporting'], {queryParams: { form: 'ae'}});
  }

  navigateToPQC(){
    this.router.navigate(['/whois-reporting'], {queryParams: { form: 'pqc'}});
  }
  aeFollowupForm(){
    this.router.navigate(['/ae-followup-form']);
  }
}
