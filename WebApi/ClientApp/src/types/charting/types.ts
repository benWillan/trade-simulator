export interface StockOption {
  value: string;
  label: string;
}

export interface TickerSecNameCombination {
  ticker: string;
  securityName: string;
}

// StockQuote matches C# StockQuote
export interface StockQuote {
  stockSymbol: string;
  date: string;         
  openPrice?: number;   
  highPrice?: number;
  lowPrice?: number;
  closePrice?: number;
  volume?: number;
  stockSymbolNavigation?: Stock; // navigation property (optional to avoid circular refs)
  bidPrice: number,
  askPrice: number,
  availableVolume: number,
  availableShort: number,
}

// Stock matches C# Stock
export interface Stock {
  id: number;
  ticker: string;
  securityName: string;
  marketCategory?: string;
  testIssue?: string;
  financialStatus?: string;
  roundLotSize?: number;
  etf?: boolean;
  nextShares?: boolean;
  exchange?: string;
  cqsSymbol?: string;
  nasdaqSymbol?: string;
  stockQuotes: StockQuote[];
  minDate: string;
  maxDate: string;
}

export type NotificationState = {
  isVisible: boolean;
  isOffCanvasVisible: boolean;
  header: string;
  body: string;
  style: string;
}

export type NotificationType =
  "Added"
  | "Saved"
  | "Warning"
  | "Info"
  | "Removed"
  | "Trade Placed"
  | "Error";

export type NotificationStyle =
  "primary"
  |"secondary"
  |"success"
  |"danger"
  |"warning"
  |"info"
  |"light"
  |"dark";