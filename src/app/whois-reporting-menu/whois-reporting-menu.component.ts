import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-whois-reporting-menu',
  templateUrl: './whois-reporting-menu.component.html',
  styleUrls: ['./whois-reporting-menu.component.scss'],
})
export class WhoisReportingMenuComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  onClickNavigateTo() {
    this.router.navigate(['/reporter-info'], {queryParamsHandling: 'preserve'});
  }
}
