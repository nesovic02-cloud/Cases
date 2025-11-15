import { Case, Item, UserProfile, DropEvent } from '../types';

const baseItems: Item[] = [
  {
    id: 'item-ak-neon',
    name: 'AK-47 | Neon Pulse',
    rarity: 'epic',
    price: 480,
    imageUrl: 'https://dummyimage.com/128x128/6c4bff/ffffff&text=AK',
    weight: 5,
  },
  {
    id: 'item-m4-galaxy',
    name: 'M4A4 | Galaxy Riot',
    rarity: 'rare',
    price: 320,
    imageUrl: 'https://dummyimage.com/128x128/24c1ff/050505&text=M4',
    weight: 9,
  },
  {
    id: 'item-usp-ice',
    name: 'USP-S | Ice Vein',
    rarity: 'uncommon',
    price: 140,
    imageUrl: 'https://dummyimage.com/128x128/8ff5ff/050505&text=USP',
    weight: 15,
  },
  {
    id: 'item-awp-sakura',
    name: 'AWP | Sakura Bloom',
    rarity: 'legendary',
    price: 920,
    imageUrl: 'https://dummyimage.com/128x128/ff7be5/050505&text=AWP',
    weight: 2,
  },
  {
    id: 'item-deagle-carbon',
    name: 'Desert Eagle | Carbon Fade',
    rarity: 'rare',
    price: 260,
    imageUrl: 'https://dummyimage.com/128x128/f5a524/050505&text=DE',
    weight: 12,
  },
  {
    id: 'item-mp9-digital',
    name: 'MP9 | Digital Wave',
    rarity: 'common',
    price: 55,
    imageUrl: 'https://dummyimage.com/128x128/445bff/050505&text=MP9',
    weight: 30,
  },
  {
    id: 'item-knife-void',
    name: 'Karambit | Voidlight',
    rarity: 'mythic',
    price: 1500,
    imageUrl: 'https://dummyimage.com/128x128/f2ff00/050505&text=K',
    weight: 1,
  },
  {
    id: 'item-famas-holo',
    name: 'FAMAS | Hologram',
    rarity: 'uncommon',
    price: 120,
    imageUrl: 'https://dummyimage.com/128x128/54ffb3/050505&text=F',
    weight: 18,
  },
];

const duplicateItems = (ids: string[]): Item[] =>
  ids.map((id) => {
    const ref = baseItems.find((item) => item.id === id);
    if (!ref) throw new Error('Unknown item reference');
    return { ...ref, id: `${ref.id}-${Math.random().toString(36).slice(2, 6)}` };
  });

export const cases: Case[] = [
  {
    id: 'starter',
    name: 'Neon Старт',
    description: 'Идеально, чтобы влиться в атмосферу казино скинов.',
    price: 99,
    imageUrl: 'https://dummyimage.com/400x220/141b3a/ffffff&text=Starter',
    isActive: true,
    items: [
      baseItems[5],
      baseItems[2],
      baseItems[7],
      baseItems[4],
      baseItems[1],
      baseItems[0],
    ],
  },
  {
    id: 'pro',
    name: 'Pro батарея',
    description: 'Повышенные шансы на эпические и легендарные скины.',
    price: 249,
    imageUrl: 'https://dummyimage.com/400x220/1d1236/ffffff&text=Pro',
    isActive: true,
    items: [baseItems[5], baseItems[2], baseItems[1], baseItems[0], baseItems[3], baseItems[4]],
  },
  {
    id: 'knife-only',
    name: 'Blade Storm',
    description: 'Кейс мечты с ножами и ультра-редкими пушками.',
    price: 599,
    imageUrl: 'https://dummyimage.com/400x220/2d1f4b/ffffff&text=Blade',
    isActive: true,
    items: [baseItems[4], baseItems[3], baseItems[6], baseItems[0], baseItems[1]],
  },
  {
    id: 'night-freeze',
    name: 'Night Freeze',
    description: 'Синие и фиолетовые градиенты со сладким дропом.',
    price: 149,
    imageUrl: 'https://dummyimage.com/400x220/101c3a/ffffff&text=Night',
    isActive: false,
    items: duplicateItems(['item-usp-ice', 'item-mp9-digital', 'item-m4-galaxy', 'item-ak-neon']),
  },
];

export const mockUsers: UserProfile[] = [
  {
    id: 'user-1',
    name: 'mrxGhost',
    balance: 1250,
    isAdmin: false,
  },
  {
    id: 'user-2',
    name: 'NeonScout',
    balance: 620,
    isAdmin: false,
  },
  {
    id: 'user-3',
    name: 'Orbit',
    balance: 80,
    isAdmin: false,
  },
];

export const mockUser: UserProfile = mockUsers[0];

export const mockDrops: DropEvent[] = [
  {
    id: 'drop-1',
    userName: 'NeonScout',
    caseId: 'starter',
    caseName: 'Neon Старт',
    itemId: baseItems[2].id,
    itemName: baseItems[2].name,
    itemPrice: baseItems[2].price,
    rarity: baseItems[2].rarity,
    time: new Date().toISOString(),
    sold: false,
  },
  {
    id: 'drop-2',
    userName: 'Orbit',
    caseId: 'pro',
    caseName: 'Pro батарея',
    itemId: baseItems[0].id,
    itemName: baseItems[0].name,
    itemPrice: baseItems[0].price,
    rarity: baseItems[0].rarity,
    time: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    sold: false,
  },
];
