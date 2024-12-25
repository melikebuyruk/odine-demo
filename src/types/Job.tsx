export interface Job {
  id: number;
  userId: number;
  title: string; 
  body: string; 
  comments: Comment[];
}

export interface Comment {
  id: number; 
  body: string; 
}
