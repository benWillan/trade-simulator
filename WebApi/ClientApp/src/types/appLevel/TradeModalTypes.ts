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