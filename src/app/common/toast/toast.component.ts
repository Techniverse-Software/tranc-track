import { ChangeDetectorRef, Component, ElementRef, forwardRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ToastComponent, ToasterService } from '@coreui/angular';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  providers: [{ provide: ToastComponent, useExisting: forwardRef(() => ToastrComponent) }],
})
export class ToastrComponent extends ToastComponent {

  @Input() autohide = true;
  @Input() color;
  @Input() delay = 1000;
  @Input() show;
  @Input() fade = true;
  @Input() closeButton = true;
  @Input() title = '';

  index: number;

  constructor(
    public hostElement: ElementRef,
    public renderer: Renderer2,
    public ref: ChangeDetectorRef,
    public toasterService: ToasterService
  ) {
    super(hostElement, renderer, ref, toasterService);
  }

  doShow(): void {
    this.show = true;
  }
  doHide(): void {
    this.show = false;
  }

}
