import { nanoid } from 'nanoid';

export const items = [
  {
    id: nanoid(),
    name: 'GOLD',
  },
  {
    id: nanoid(),
    name: 'BRONZE',
  },
  {
    id: nanoid(),
    name: 'APRICOT',
  },
];

export type Item = {
  id: string;
  name: string;
};
