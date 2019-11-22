import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg',
  templateUrl: 'svg.component.html'
})
export class AppSvgComponent {
  // 这些如果只是用来绑定给 ngStyle，可以用 @HostBinding，或者写到 css 中。组件类尽量不要关心样式。
  @Input() width = '16px';
  @Input() height = '16px';
  @Input() type: string;
  @Input() top = '0px';
  @Input() right = '0px';
  @Input() bottom = '0px';
  @Input() left = '0px';
  @Input() color = 'inherit';
}
