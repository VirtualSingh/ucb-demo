import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent implements OnInit {
  // @Input() index: number;
  _count: number = 0;
  prevSibling: any;
  nextSibling: any;
  currentElement: any;
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @Input()
  set count(count: number) {
    this._count = count;
    console.log(count);
    this.currentElement = this.elRef.nativeElement.querySelector(
      `.progress__list-step:nth-child(${count})`
    );
    if (count > 1) {
      this.prevSibling = this.currentElement.previousElementSibling;
      this.renderer.removeClass(this.prevSibling, 'active');
      this.renderer.addClass(this.prevSibling, 'success');
    }
    this.renderer.addClass(this.currentElement, 'active');
    if (count <= 3) {
      this.nextSibling = this.currentElement.nextElementSibling;
      this.renderer.removeClass(this.nextSibling, 'active');
      this.renderer.removeClass(this.currentElement, 'success');

      // // this.renderer.removeClass(this.prevSibling, 'success');
      // // if(this.)
      // // console.log(this.currentElement);
      // console.log(this.nextSibling);
    }

    // this.renderer.removeClass(this.prevSibling, 'active');
    // console.log(this.prevSibling);
    // this.renderer.removeClass(this.prevSibling,'active');

    // this.index = this._count;
    // console.log(this.index);
  }
  ngOnInit(): void {
    // console.log(this.index);
    // console.log(this.currentElement);
  }
}
