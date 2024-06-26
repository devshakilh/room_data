// types/IRoomCategory.ts

import { IRatePlan, IRoomInventoryCalendar } from "./types";


export interface IRoomCategory {
  id: string;
  name: string;
  occupancy: number;
  inventory_calendar: IRoomInventoryCalendar[];
  rate_plans: IRatePlan[];
}
