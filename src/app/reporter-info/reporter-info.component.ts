import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-reporter-info',
  templateUrl: './reporter-info.component.html',
  styleUrls: ['./reporter-info.component.scss'],
})
export class ReporterInfoComponent implements OnInit {
  reactiveForm: FormGroup;
  navigateTo: String = '';

  constructor(private router: Router, private route:ActivatedRoute) {}

  ngOnInit(): void {
    
    this.reactiveForm = new FormGroup({
      reporterFullname: new FormControl(null),
      email: new FormControl(null),
      mobile: new FormControl(null),
      consent__checkbox: new FormControl(null),
    });

    this.route.queryParams.subscribe(params => {
      // console.log(params['form']); 
      this.navigateTo = params['form'];
    });

  }
  onSubmit() {
    // console.log(this.reactiveForm);
    if(this.navigateTo === 'pregnancy') this.router.navigate(['/pregnancy-form']);
    else if(this.navigateTo === 'ae') this.router.navigate(['/ae-form']);
  }
}
