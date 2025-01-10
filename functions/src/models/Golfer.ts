export interface Golfer {
  uid: string;
  username: string;
  first_name: string;
  last_name: string;
  handicap: number; 
  home_golf_course_id?: number | null;
}
