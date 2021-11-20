import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BoxResponse } from '../../models/boxes.model';
import { GET_BOXES } from '../../queries/boxes-queries';
import { Subject } from 'rxjs';
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


  constructor(private readonly apollo: Apollo) { }

  ngOnInit(): void {
    this.getBoxes();
  }

  ngOnDestroy(): void {
    this.destroy$.unsubscribe();
    this.destroy$.next(false);
  }

  public getBoxes(): void {
    this.isLoading = true;

    this.apollo
      .watchQuery({ query: GET_BOXES })
      .valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ data }: { data: any }) => {
        this.boxes = data.boxes.edges;
        this.isLoading = false;
      });
  }

}
