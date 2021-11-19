import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OpenBoxModalData } from 'src/app/shared/models/open-box-modal.models';

@Injectable({
  providedIn: 'root'
})
export class OpenBoxModalService {

  // public isOpened: Subject<boolean> = new Subject<boolean>();
  public modalData: Subject<any> = new Subject<any>();

  constructor() { }

  public open({ data }: { data: OpenBoxModalData }): void {
    this.modalData.next({ data, isOpened: true });
    // this.isOpened.next(true);
  }

  public close(): void {
    this.modalData.next({isOpened: false});
  }
}
