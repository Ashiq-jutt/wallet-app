import { gradients } from '../theme';
import type { CardData } from '../components/BankCard';
import type { Tx } from '../components/TransactionItem';

export const user = {
  name: 'Sandy Chungus',
  handle: '@sandy',
  email: 'sandy.chungus@mail.com',
  phone: '+1 (415) 555-0132',
  // drop the real photo here, e.g. require('../../assets/avatar.png')
  avatar: undefined as string | undefined,
  balance: '$5,643.50',
};

export const cards: CardData[] = [
  {
    id: 'c1',
    number: '5000 0000 0000 0000',
    holder: 'Sandy Chungus',
    expiry: '00/00',
    scheme: 'mastercard',
    gradient: gradients.card,
    balance: '$5,643.50',
    label: 'Primary',
  },
  {
    id: 'c2',
    number: '4021 1100 3390 7745',
    holder: 'Sandy Chungus',
    expiry: '08/28',
    scheme: 'visa',
    gradient: gradients.cardBlue,
    balance: '$1,204.10',
    label: 'Savings',
  },
  {
    id: 'c3',
    number: '6011 5500 8871 2043',
    holder: 'Sandy Chungus',
    expiry: '11/27',
    scheme: 'generic',
    gradient: gradients.cardTeal,
    balance: '$860.75',
    label: 'Travel',
  },
];

export const brands = {
  amazon: { name: 'Amazon', bg: '#FFFFFF', fg: '#FF9900' },
  mcdonalds: { name: 'Mcdonalds', bg: '#FFFFFF', fg: '#FFC72C' },
  apple: { name: 'Apple', bg: '#FFFFFF', fg: '#111111' },
  starbucks: { name: 'Starbucks', bg: '#FFFFFF', fg: '#0F7A4A' },
  spotify: { name: 'Spotify', bg: '#FFFFFF', fg: '#1DB954' },
  uber: { name: 'Uber', bg: '#FFFFFF', fg: '#111111' },
  netflix: { name: 'Netflix', bg: '#FFFFFF', fg: '#E50914' },
  payroll: { name: 'Payroll', bg: '#FFFFFF', fg: '#3B62F6' },
};

export const transactions: Tx[] = [
  { id: 't1', brand: brands.amazon, title: 'Amazon', date: 'May 24 , 2022', amount: -103.56, category: 'Shopping', status: 'Completed' },
  { id: 't2', brand: brands.mcdonalds, title: 'Mcdonalds', date: 'May 12 , 2022', amount: -34.78, category: 'Food & Drink', status: 'Completed' },
  { id: 't3', brand: brands.apple, title: 'Apple', date: 'May 8 , 2022', amount: -1000.97, category: 'Electronics', status: 'Completed' },
  { id: 't4', brand: brands.starbucks, title: 'Starbucks', date: 'May 5 , 2022', amount: -12.40, category: 'Food & Drink', status: 'Completed' },
  { id: 't5', brand: brands.payroll, title: 'Salary', date: 'May 1 , 2022', amount: 4200.00, category: 'Income', status: 'Completed' },
  { id: 't6', brand: brands.spotify, title: 'Spotify', date: 'Apr 28 , 2022', amount: -9.99, category: 'Subscription', status: 'Completed' },
  { id: 't7', brand: brands.uber, title: 'Uber', date: 'Apr 26 , 2022', amount: -23.15, category: 'Transport', status: 'Pending' },
  { id: 't8', brand: brands.netflix, title: 'Netflix', date: 'Apr 22 , 2022', amount: -17.99, category: 'Subscription', status: 'Completed' },
];

export const contacts = [
  { id: 'p1', name: 'Alicia', brand: { name: 'Alicia', bg: '#F0B7D4', fg: '#7A2148' } },
  { id: 'p2', name: 'Marcus', brand: { name: 'Marcus', bg: '#B7D6F0', fg: '#134063' } },
  { id: 'p3', name: 'Dev', brand: { name: 'Dev', bg: '#C8F0B7', fg: '#2A5C18' } },
  { id: 'p4', name: 'Yuki', brand: { name: 'Yuki', bg: '#E3C9F5', fg: '#4C2170' } },
  { id: 'p5', name: 'Omar', brand: { name: 'Omar', bg: '#F5DCC9', fg: '#6B3A16' } },
];

export const notifications = [
  { id: 'n1', icon: 'card' as const, title: 'Card added successfully', body: 'Your Visa •••• 7745 is ready to use.', time: '2m ago', unread: true, tint: '#3B62F6' },
  { id: 'n2', icon: 'arrow-down' as const, title: 'Money received', body: 'Alicia sent you $250.00.', time: '1h ago', unread: true, tint: '#3ED598' },
  { id: 'n3', icon: 'shield' as const, title: 'New login detected', body: 'iPhone 15 Pro · San Francisco, CA.', time: '5h ago', unread: false, tint: '#F5A623' },
  { id: 'n4', icon: 'gift' as const, title: 'You earned 320 points', body: 'Cashback from your Amazon purchase.', time: 'Yesterday', unread: false, tint: '#8A3BF6' },
  { id: 'n5', icon: 'stats' as const, title: 'Weekly report ready', body: 'Spending decreased 5% from last week.', time: '2d ago', unread: false, tint: '#2FC4F0' },
];

export const weekSeries = { data: [30, 42, 38, 55, 48, 92, 70], labels: ['Mon', 'Tue', 'Wed', 'Tru', 'Fri', 'Sat', 'Sun'] };
export const monthSeries = { data: [40, 62, 35, 78, 55, 88, 64, 96], labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'] };
export const yearSeries = { data: [55, 40, 72, 60, 85, 50, 90, 70, 62, 95, 78, 88], labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'] };

export const categories = [
  { id: 'g1', label: 'Shopping', amount: 1240.5, pct: 34, color: '#8A3BF6' },
  { id: 'g2', label: 'Food & Drink', amount: 780.2, pct: 21, color: '#3B62F6' },
  { id: 'g3', label: 'Transport', amount: 512.9, pct: 14, color: '#2FC4F0' },
  { id: 'g4', label: 'Subscriptions', amount: 386.4, pct: 11, color: '#3ED598' },
  { id: 'g5', label: 'Other', amount: 740.0, pct: 20, color: '#F5A623' },
];
