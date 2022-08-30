import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ae-followup-form',
  templateUrl: './ae-followup-form.component.html',
  styleUrls: ['./ae-followup-form.component.scss'],
})
export class AeFollowupFormComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  onClickSubmit() {
    this.router.navigate(['/ae-form'], { queryParams: { step: 4 } });
  }
}
