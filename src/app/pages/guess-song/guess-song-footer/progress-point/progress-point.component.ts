import { Component, OnDestroy, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { Subject, Subscription, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-progress-point',
  templateUrl: './progress-point.component.html',
  styleUrls: ['./progress-point.component.scss']
})
export class AppProgressPointComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private subscription: Subscription;

  @Output() resize = new EventEmitter<number>();
  @Output() resizeEnd = new EventEmitter<void>();

  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent): void {
    event.preventDefault();
    const initWidth = this.elementRef.nativeElement.parentElement.offsetWidth;
    const initClientX = event.clientX;
    const mouseup = fromEvent(document, 'mouseup');
    this.subscription = mouseup
      .subscribe((e: MouseEvent) => {
        if (this.subscription && !this.subscription.closed) {
          this.resizeEnd.emit();
          this.unsubscribeSubs();
        }
      });
    const mouseMoveSub = fromEvent(document, 'mousemove')
      .pipe(takeUntil(mouseup))
      .subscribe((e: MouseEvent) => {
        this.onMove(e, initWidth, initClientX);
      });
    this.subscription.add(mouseMoveSub);
  }

  private onMove(event: MouseEvent, initWidth: number, initClientX: number): void {
    const movementX = event.clientX - initClientX;
    const newWidth = initWidth + movementX;
    const totalBarWidth = this.elementRef.nativeElement.parentElement.parentElement.offsetWidth;
    // 防止超出总的进度范围
    if (newWidth >= 0 && newWidth < totalBarWidth) {
      this.resize.emit(newWidth);
    }
  }

  private unsubscribeSubs(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

  // 建议进行成员排序，把构造函数排到最前面，以便一眼看出依赖关系
  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
