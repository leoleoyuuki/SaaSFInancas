import type { Transaction } from '@/lib/types';

function function_uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const sampleTransactions: Transaction[] = [
  {
    id: function_uuid(),
    date: '2024-07-15',
    description: 'Salary Deposit',
    amount: 5000,
    type: 'income',
  },
  {
    id: function_uuid(),
    date: '2024-07-20',
    description: 'Trader Joe\'s',
    amount: -120.5,
    type: 'expense',
  },
  {
    id: function_uuid(),
    date: '2024-07-20',
    description: 'PG&E Bill',
    amount: -85.7,
    type: 'expense',
  },
  {
    id: function_uuid(),
    date: '2024-07-21',
    description: 'Netflix Subscription',
    amount: -15.99,
    type: 'expense',
  },
  {
    id: function_uuid(),
    date: '2024-07-22',
    description: 'United Airlines',
    amount: -450.0,
    type: 'expense',
  },
  {
    id: function_uuid(),
    date: '2024-07-22',
    description: 'Starbucks',
    amount: -5.75,
    type: 'expense',
  },
  {
    id: function_uuid(),
    date: '2024-07-23',
    description: 'Amazon.com',
    amount: -45.99,
    type: 'expense',
  },
  {
    id: function_uuid(),
    date: '2024-07-24',
    description: 'Comcast Internet',
    amount: -70.0,
    type: 'expense',
  },
  {
    id: function_uuid(),
    date: '2024-07-25',
    description: 'Cheesecake Factory',
    amount: -95.2,
    type: 'expense',
  },
  {
    id: function_uuid(),
    date: '2024-07-26',
    description: 'Whole Foods',
    amount: -88.3,
    type: 'expense',
  },
  {
    id: function_uuid(),
    date: '2024-07-28',
    description: 'AMC Theatres',
    amount: -35.0,
    type: 'expense',
  },
  {
    id: function_uuid(),
    date: '2024-07-30',
    description: 'Freelance Project Payment',
    amount: 1200,
    type: 'income',
  },
  {
    id: function_uuid(),
    date: '2024-08-01',
    description: 'T-Mobile Bill',
    amount: -110.0,
    type: 'expense',
  },
  {
    id: function_uuid(),
    date: '2024-08-02',
    description: 'Zara',
    amount: -150.0,
    type: 'expense',
  },
  {
    id: function_uuid(),
    date: '2024-08-03',
    description: 'Sweetgreen',
    amount: -14.5,
    type: 'expense',
  },
  {
    id: function_uuid(),
    date: '2024-08-05',
    description: 'Safeway',
    amount: -65.4,
    type: 'expense',
  },
  {
    id: function_uuid(),
    date: '2024-08-07',
    description: 'Airbnb',
    amount: -800,
    type: 'expense',
  },
    {
    id: function_uuid(),
    date: '2024-08-10',
    description: 'Rent Payment',
    amount: -2500,
    type: 'expense',
  },
  {
    id: function_uuid(),
    date: '2024-08-12',
    description: 'Etsy Sale',
    amount: 75.5,
    type: 'income',
  },
  {
    id: function_uuid(),
    date: '2024-08-14',
    description: 'Apple Store',
    amount: -999,
    type: 'expense',
  }
];
