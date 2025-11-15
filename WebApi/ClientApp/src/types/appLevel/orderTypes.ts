import {Stock} from '../charting/types' ;

export type Order = {
  id: number;
  userId: number;
  stockId: number;
  orderType: number;
  quantity: number;
  price: number;
  stopPrice: number | null;
  status: number;
  createdAt: Date;
  recordedAt: Date | null;
  executedAt: Date | null;
  side: number;
  stockTicker: string;
};