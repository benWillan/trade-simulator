type RadioOption = {
  name: string;
  value: string;
}

export const actionType: RadioOption[] = [
    { name: 'Buy', value: '1'},
    { name: 'Sell', value: '2'}
  ];

export const orderType: RadioOption[] = [
  { name: 'Market', value: '1'},
  { name: 'Limit', value: '2'},
  { name: 'Stop', value: '3'}
];