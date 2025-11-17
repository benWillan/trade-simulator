type RadioOption = {
  name: string;
  value: number;
}

export const side: RadioOption[] = [
    { name: 'Buy', value: 1},
    { name: 'Sell', value: 2}
  ];

export const orderType: RadioOption[] = [
  { name: 'Market', value: 1},
  { name: 'Limit', value: 2},
  { name: 'Stop', value: 3},
  { name: 'Stop Limit', value: 4},
];

export const OrderTypeEnum: Record<number, string> = {
  1: "Market",
  2: "Limit",
  3: "Stop",
  4: "StopLimit",
  5: "TrailingStop",
};

export const SideEnum: Record<number, string> = {
  1: "Buy",
  2: "Sell",
};

export const TradeOrderLineColour: Record<string, string> = {
  "BidColour": "#7274ecff",
  "AskColour": "#a84d43ff",
  "Green": "#198754",
  "Red": "#dc3545"
}

export type StopLoss = {
  elementWithFocusId: string | null,
  ticks: number | null,
  price: number | null,
  usd: number | null,
  percentage: number | null
}