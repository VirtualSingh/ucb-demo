import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { ApiService } from '../api.service';
// import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})

export class MainComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void { 
    // this.apiService.login().subscribe(
    //   (data) => console.log(data),
    //   (err) => {
    //     console.log(err)
    //   }
    // )
  }
  onClickNavigate() {
    this.router.navigate(['/menu-page']);
  }
}
