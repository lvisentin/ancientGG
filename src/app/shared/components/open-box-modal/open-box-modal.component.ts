import { Box, BoxOpening } from '../../models/boxes.model';
import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { GET_BOX_BY_ID, OPEN_BOX_MUTATION } from '../../queries/boxes-queries';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize, takeUntil } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenBoxModalData } from '../../models/open-box-modal.models';
import { Subject } from 'rxjs';

@Component({
  selector: 'agg-open-box-modal',
  templateUrl: './open-box-modal.component.html',
  styleUrls: ['./open-box-modal.component.scss']
})
export class OpenBoxModalComponent implements OnInit, OnDestroy {
  public isOpened: boolean = false;
  public boxData: Box | null = null;
  public isLoading: boolean = false;
  public isMobile: boolean = window.innerWidth > 569 ? false : true;
  public boxOpenings: BoxOpening[] = [];
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: OpenBoxModalData,
    private readonly apollo: Apollo,
    private readonly authService: AuthService,
    private readonly matSnackbar: MatSnackBar,
    private readonly matDialogRef: MatDialogRef<OpenBoxModalComponent>
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth > 569 ? false : true;
  }

  ngOnInit(): void {
    if (this.dialogData.boxId) {
      this.getBoxData();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.unsubscribe();
    this.destroy$.next(false);
  }

  public tryAgain(): void {
    this.boxOpenings = [];
  }

  public close(): void {
    this.matDialogRef.close();
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
        console.log('err', err.message)
        this.matSnackbar.open(err.message, 'OK', {
          duration: 3000,
        });
      })
  }

  public getBoxData(): void {
    this.isLoading = true;
    this.apollo.watchQuery(
      {
        query: GET_BOX_BY_ID,
        variables: {
          id: this.dialogData.boxId,
        }
      }
    )
      .valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ data }: { data: any }) => {
        this.boxData = data.box;
        this.isLoading = false;
      })
  }
}
