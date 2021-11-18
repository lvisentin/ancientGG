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
