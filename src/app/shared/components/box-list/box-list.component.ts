import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Box, BoxResponse } from '../../models/boxes.model';

@Component({
  selector: 'agg-box-list',
  templateUrl: './box-list.component.html',
  styleUrls: ['./box-list.component.scss']
})
export class BoxListComponent implements OnInit {

  public boxes: BoxResponse[] = [];
  public isLoading: boolean = false;

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

  private getBoxes(): void {
    this.apollo
      .watchQuery({ query: this.GET_BOXES })
      .valueChanges
      .subscribe(({ data }: { data: any }) => {
        this.boxes = data.boxes.edges;
        // console.log(data.boxes.edges)
      })
  }

}
