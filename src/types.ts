export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

export interface SortConfig {
  key: keyof User;
  direction: "asc" | "desc";
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}
