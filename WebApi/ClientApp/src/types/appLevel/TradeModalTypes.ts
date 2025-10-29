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
  // { name: 'Stop Limit', value: '4'},
  // { name: 'Trailing Stop', value: '5'}
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