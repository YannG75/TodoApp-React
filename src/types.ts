export interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

export type FilterType = 'all' | 'active' | 'completed';
