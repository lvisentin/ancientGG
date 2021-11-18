import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { Box, BoxResponse } from '../../models/boxes.model';
import { takeUntil } from 'rxjs/operators';
import { GET_BOXES } from '../../queries/boxes-queries';

@Component({
  selector: 'agg-box-list',
  templateUrl: './box-list.component.html',
  styleUrls: ['./box-list.component.scss']
})
export class BoxListComponent implements OnInit, OnDestroy {

  public boxes: BoxResponse[] = [];
  public isLoading: boolean = false;

  private destroy$: Subject<boolean> = new Subject();


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
      .watchQuery({ query: GET_BOXES })
      .valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ data }: { data: any }) => {
        // this.boxes = [data.boxes.edges[0], data.boxes.edges[1], data.boxes.edges[2]];
        this.boxes = data.boxes.edges;
        this.isLoading = false;
      })
  }

}
