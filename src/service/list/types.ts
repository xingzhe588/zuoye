export interface ListItem {
    id: number;
    title: string;
    description: string;
  }
  
  export type GetListResponse = Array<ListItem>;