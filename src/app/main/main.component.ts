import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
// import { ApiService } from '../api.service';
// import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private router: Router, private http:HttpClient) {}
  ngOnInit(): void { 
    // this.apiService.login().subscribe(
    //   (data) => console.log(data),
    //   (err) => {
    //     console.log(err)
    //   }
    // )
    this.http.get('assets/token.json')
    .subscribe((res:any)=>{
      console.log('response',res.token);
      AuthInterceptor.accessToken = res.token;
    });

  }
  onClickNavigate() {
    this.router.navigate(['/menu-page']);
  }
}
