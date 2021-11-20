import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subject, Subscription } from 'rxjs';
import { finalize, takeUntil, takeWhile } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OpenBoxModalService } from 'src/app/services/open-box-modal/open-box-modal.service';
import { Box, BoxOpening, BoxOpeningResponse, ItemVariant } from '../../models/boxes.model';
import { OpenBoxModalData } from '../../models/open-box-modal.models';
import { GET_BOX_BY_ID, OPEN_BOX_MUTATION } from '../../queries/boxes-queries';

@Component({
  selector: 'agg-open-box-modal',
  templateUrl: './open-box-modal.component.html',
  styleUrls: ['./open-box-modal.component.scss']
})
export class OpenBoxModalComponent implements OnInit {
  public isOpened: boolean = false;
  public dialogData: OpenBoxModalData;
  public boxData: Box | null = null;
  public isLoading: boolean = false;
  public isMobile: boolean = window.innerWidth > 569 ? false : true;
  public boxOpenings: BoxOpening[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private readonly openBoxModalService: OpenBoxModalService,
    private readonly apollo: Apollo,
    private readonly authService: AuthService,
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth > 569 ? false : true;
  }

  ngOnInit(): void {
    this.openBoxModalService
      .modalData
      .subscribe(({ data, isOpened }) => {
        this.isOpened = isOpened;
        this.dialogData = data;

        if (isOpened) {
          this.getBoxData();
        }
      })
  }

  public close(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.boxData = null;
    this.boxOpenings = [];
    this.openBoxModalService.close();
  }

  public tryAgain(): void {
    this.boxOpenings = [];
  }

  public openCase($event: { quantity: number }): void {
    this.isLoading = true;
    const user = this.authService.getCurrentUserInformation();
    if (!user) {
      return
    }

    this.apollo.mutate({
      mutation: OPEN_BOX_MUTATION,
      variables: {
        input: {
          boxId: this.boxData?.id,
          amount: $event.quantity
        }
      }
    })
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(({ data }: any) => {
        this.boxOpenings = data.openBox.boxOpenings;
        this.isLoading = false;
      }, (err: HttpErrorResponse) => {

      })
  }

  public getBoxData(): void {
    this.isLoading = true;
    this.subscriptions.push(
      this.apollo.watchQuery(
        {
          query: GET_BOX_BY_ID,
          variables: {
            id: this.dialogData.boxId,
          }
        }
      )
        .valueChanges
        .subscribe(({ data }: { data: any }) => {
          this.boxData = data.box;
          this.isLoading = false;
        })
    )
  }
}
