import { create } from 'zustand';
import { cases as initialCases, mockDrops, mockUser, mockUsers } from '../mock/data';
import { Case, DropEvent, InventoryItem, Item, UserProfile } from '../types';
import { pickByWeight } from '../utils/random';

interface AppState {
  cases: Case[];
  user: UserProfile;
  users: UserProfile[];
  inventory: InventoryItem[];
  drops: DropEvent[];
  pendingResult?: InventoryItem;
  adminPromptVisible: boolean;
  openCase: (caseId: string) => { success: boolean; message?: string; drop?: InventoryItem };
  sellItem: (itemId: string) => void;
  toggleAdminPrompt: (state: boolean) => void;
  authenticateAdmin: (password: string) => boolean;
  updateCaseMeta: (caseId: string, payload: Partial<Case>) => void;
  updateItem: (caseId: string, itemId: string, payload: Partial<Item>) => void;
  addItemToCase: (caseId: string, item: Item) => void;
  removeItemFromCase: (caseId: string, itemId: string) => void;
  toggleCase: (caseId: string, isActive: boolean) => void;
  adjustBalance: (delta: number) => void;
  updateUserBalance: (userId: string, delta: number) => void;
  toggleBan: (userId: string) => void;
}

const uid = () => Math.random().toString(36).slice(2, 10);

export const useAppStore = create<AppState>((set, get) => ({
  cases: initialCases,
  user: mockUser,
  users: mockUsers,
  inventory: [],
  drops: mockDrops,
  adminPromptVisible: false,
  openCase: (caseId) => {
    const { user, cases, inventory, drops } = get();
    const targetCase = cases.find((c) => c.id === caseId);
    if (!targetCase || !targetCase.isActive) {
      return { success: false, message: 'Кейс недоступен' };
    }
    if (user.balance < targetCase.price) {
      return { success: false, message: 'Недостаточно средств' };
    }
    const dropItem = pickByWeight(targetCase.items);
    const updatedUser: UserProfile = { ...user, balance: user.balance - targetCase.price };
    const newInventoryItem: InventoryItem = {
      ...dropItem,
      instanceId: uid(),
      acquiredAt: new Date().toISOString(),
      caseId: targetCase.id,
      caseName: targetCase.name,
      sold: false,
    };
    const newDrop: DropEvent = {
      id: uid(),
      userName: user.name,
      caseId: targetCase.id,
      caseName: targetCase.name,
      itemId: dropItem.id,
      itemName: dropItem.name,
      itemPrice: dropItem.price,
      rarity: dropItem.rarity,
      time: newInventoryItem.acquiredAt,
      sold: false,
    };
    set({
      user: updatedUser,
      inventory: [newInventoryItem, ...inventory],
      drops: [newDrop, ...drops].slice(0, 20),
      pendingResult: newInventoryItem,
    });
    return { success: true, drop: newInventoryItem };
  },
  sellItem: (itemId) => {
    const { inventory, user, drops } = get();
    const target = inventory.find((item) => item.instanceId === itemId);
    if (!target || target.sold) return;
    set({
      inventory: inventory.map((item) =>
        item.instanceId === itemId ? { ...item, sold: true } : item,
      ),
      user: { ...user, balance: user.balance + target.price },
      drops: drops.map((drop) =>
        drop.itemId === target.id && drop.time === target.acquiredAt ? { ...drop, sold: true } : drop,
      ),
    });
  },
  toggleAdminPrompt: (state) => set({ adminPromptVisible: state }),
  authenticateAdmin: (password) => {
    const isValid = password === 'admin123';
    if (isValid) {
      set((state) => ({ user: { ...state.user, isAdmin: true }, adminPromptVisible: false }));
    }
    return isValid;
  },
  updateCaseMeta: (caseId, payload) => {
    set(({ cases }) => ({
      cases: cases.map((c) => (c.id === caseId ? { ...c, ...payload } : c)),
    }));
  },
  updateItem: (caseId, itemId, payload) => {
    // Админ изменяет цену/вес/редкость предмета; шансы обновляются в общем сторе
    set(({ cases }) => ({
      cases: cases.map((c) =>
        c.id === caseId
          ? {
              ...c,
              items: c.items.map((item) => (item.id === itemId ? { ...item, ...payload } : item)),
            }
          : c,
      ),
    }));
  },
  addItemToCase: (caseId, item) => {
    set(({ cases }) => ({
      cases: cases.map((c) => (c.id === caseId ? { ...c, items: [...c.items, item] } : c)),
    }));
  },
  removeItemFromCase: (caseId, itemId) => {
    set(({ cases }) => ({
      cases: cases.map((c) =>
        c.id === caseId ? { ...c, items: c.items.filter((item) => item.id !== itemId) } : c,
      ),
    }));
  },
  toggleCase: (caseId, isActive) => {
    set(({ cases }) => ({
      cases: cases.map((c) => (c.id === caseId ? { ...c, isActive } : c)),
    }));
  },
  adjustBalance: (delta) => {
    set(({ user }) => ({ user: { ...user, balance: user.balance + delta } }));
  },
  updateUserBalance: (userId, delta) => {
    set(({ users }) => ({
      users: users.map((u) => (u.id === userId ? { ...u, balance: u.balance + delta } : u)),
    }));
  },
  toggleBan: (userId) => {
    set(({ users }) => ({
      users: users.map((u) =>
        u.id === userId ? { ...u, isBanned: !u.isBanned } : u,
      ),
    }));
  },
}));
