export interface BoxResponse {
  __typeName: string;
  node: Box;
}

export interface Box {
  cost: number;
  iconUrl: string;
  id: string;
  name: string;
}

export interface BoxOpening {
  id: string;
  itemVariant: ItemVariant;
}

export interface ItemVariant {
  __typename: string;
  id: string;
  name: string;
  value: number;
  iconUrl: string;
}

export interface OpenBox {
  __typename: string;
  boxOpenings: BoxOpening[];
}

export interface BoxOpeningResponse {
  data: OpenBox;
}
