import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loading = new Subject<boolean>();
  display(value: boolean): void {
    this.loading.next(value);
  }
  constructor() { }
}
