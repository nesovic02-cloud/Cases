export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';

export interface Item {
  id: string;
  name: string;
  rarity: Rarity;
  price: number;
  imageUrl: string;
  weight: number;
}

export interface Case {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isActive: boolean;
  items: Item[];
}

export interface InventoryItem extends Item {
  instanceId: string;
  acquiredAt: string;
  caseId: string;
  caseName: string;
  sold: boolean;
}

export interface DropEvent {
  id: string;
  userName: string;
  caseId: string;
  caseName: string;
  itemId: string;
  itemName: string;
  itemPrice: number;
  rarity: Rarity;
  time: string;
  sold: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  balance: number;
  isAdmin: boolean;
  isBanned?: boolean;
}
