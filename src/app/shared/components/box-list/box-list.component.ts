import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { Box, BoxResponse } from '../../models/boxes.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'agg-box-list',
  templateUrl: './box-list.component.html',
  styleUrls: ['./box-list.component.scss']
})
export class BoxListComponent implements OnInit, OnDestroy {

  public boxes: BoxResponse[] = [];
  public isLoading: boolean = false;

  private destroy$: Subject<boolean> = new Subject();
  private GET_BOXES = gql`
    query getboxes {
      boxes(free: false, purchasable: true, openable: true) {
        edges {
        node {
          id
          name
          iconUrl
          cost
        }
        }
      }
    }`;


  constructor(private readonly apollo: Apollo) { }

  ngOnInit(): void {
    this.getBoxes();
  }

  ngOnDestroy(): void {
    this.destroy$.unsubscribe();
    this.destroy$.next(false);
  }

  private getBoxes(): void {
    this.isLoading = true;

    this.apollo
      .watchQuery({ query: this.GET_BOXES })
      .valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ data }: { data: any }) => {
        this.boxes = data.boxes.edges;
        this.isLoading = false;
      })
  }

}
