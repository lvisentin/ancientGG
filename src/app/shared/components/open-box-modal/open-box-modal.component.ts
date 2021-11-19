import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subject, Subscription } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';
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
  public boxOpenings: BoxOpening[] = [];

  public mockVariant: ItemVariant = {
    "id": "SXRlbVZhcmlhbnQ6Mjg2Mg",
    "name": "Detour",
    "iconUrl": "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopamie19f2-r3Yi5FvISJmYGZnPLmDLfYkWNF18lwmO7Eu9-k0ADh_xBkZW71cNWTJgE8MAzRqFfrwurs0JC6vcnAwXFivCQnsy3D30vgKqufbgc",
    "value": 5.58,
    "__typename": "ItemVariant"
  }

  private subscriptions: Subscription[] = [];

  constructor(
    private readonly openBoxModalService: OpenBoxModalService,
    private readonly apollo: Apollo,
    private readonly authService: AuthService
  ) { }

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
    this.openBoxModalService.close();
  }

  public openCase(): void {
    const user = this.authService.getCurrentUserInformation();
    if (!user) {
      return
    }

    this.apollo.mutate({
      mutation: OPEN_BOX_MUTATION,
      variables: {
        input: {
          boxId: this.boxData?.id,
          amount: 1
        }
      }
    }).subscribe(({ data }: any) => {
      this.boxOpenings = data.openBox.boxOpenings;
      console.log(this.boxOpenings)
    })
  }

  private getBoxData(): void {
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
