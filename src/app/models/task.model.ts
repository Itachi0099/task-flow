export interface Task {
  id?: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  category?: string;
  dueDate?: Date | null;
  tags?: string;
  tagList?: string[];
  reminder?: boolean;
  recurring?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}