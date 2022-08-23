import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.scss'],
})
export class FollowUpComponent implements OnInit {
  followUpForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    mobileNumber: new FormControl(''),
  });
  otpCard: any;
  showProceedBtn = false;
  showOverlay = false;
  constructor(
    private router: Router,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    console.log(`
  Email: ${this.followUpForm.get('email')!.value}
mobile: ${this.followUpForm.get('mobileNumber')!.value}
  `);

    this.otpCard = this.elRef.nativeElement.querySelector('.card.card--flex');
  }

  onClickVerify() {
    this.renderer.removeClass(this.otpCard, 'toggle-visibility');
    this.showProceedBtn = true;
  }
  onClickProceed() {
    console.log('proceed');
    this.showOverlay = true;
  }
  navigateBackTo() {
    this.router.navigate(['/add-follow-up']);
  }
  onClickCancel() {
    this.showOverlay = false;
  }
  onClickSubmit() {
    this.router.navigate(['/generate-report']);
  }
  // onOtpChange($event: any) {}
}
