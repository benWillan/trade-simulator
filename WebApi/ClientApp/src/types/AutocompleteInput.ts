// StockQuote matches C# StockQuote
export interface StockQuote2 {
  stockSymbol: string;
  date: string;         // DateTime in JSON is serialized as an ISO string
  openPrice?: number;   // nullable -> optional property
  highPrice?: number;
  lowPrice?: number;
  closePrice?: number;
  volume?: number;
  stockSymbolNavigation?: Stock; // navigation property (optional to avoid circular refs)
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
  stockQuotes: StockQuote2[]; // collection
}