// types/IRateCalendarResponse.ts

import { IRoomCategory } from "./types";



export interface IRateCalendarResponse {
  code: string;
  message: string;
  data: IRoomCategory[];
}
