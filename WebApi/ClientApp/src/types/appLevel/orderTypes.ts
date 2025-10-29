import {Stock} from '../charting/types' ;

export type Order = {
  id: number;
  userId: number;
  stockId: number;
  orderType: number;
  quantity: number;
  price: number;
  status: number;
  stopLoss: number | null;
  takeProfit: number | null;
  createdAt: Date;
  recordedAt: Date | null;
  executedAt: Date | null;
  side: number;
  stockTicker: string;
};