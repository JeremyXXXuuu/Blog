interface Props {
  id: string;
  blog: any;
  blocks: [any];
}

export interface BlockDetails {
  rich_text: RichText[];
  is_toggleable: boolean;
  color: string;
}

export interface Parent {
  type: string;
  page_id: string;
}

export type Block<T extends string = string, D = any> = {
  object: "block";
  id: string;
  parent: Parent; // Update this type as per your data structure
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: string;
    id: string;
  }; // Update this type as per your data structure
  last_edited_by: {
    object: string;
    id: string;
  }; // Update this type as per your data structure
  has_children: boolean;
  archived: boolean;
  children: Block<T>[];
  type: T;
} & { [key in T]: BlockData } & Record<string, any>;

export type BlockData =
  | {
      rich_text: { plain_text: string }[];
      children?: Block[];
      checked?: boolean;
      external?: { url: string };
      file?: { url: string };
      type?: string;
      caption?: { plain_text: string }[];
      table_row?: { cells: { plain_text: string }[] };
      url?: string;
      has_column_header?: boolean;
    }
  | string
  | boolean
  | number
  | null;
