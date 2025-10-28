export type Order = {
  id: number;
  user_id: number;
  stock_id: number;
  order_type: number;
  quantity: number;
  price: number;
  status: number;
  stop_loss: number | null;
  take_profit: number | null;
  created_at: Date;
  recorded_at: Date;
  executed_at: Date | null;
  side: number;
};