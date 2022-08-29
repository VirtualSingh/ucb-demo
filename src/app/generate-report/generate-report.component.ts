import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss'],
})
export class GenerateReportComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  onClick() {
    this.router.navigate(['/new-follow-up']);
  }
}
