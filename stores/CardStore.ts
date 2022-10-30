import create from "zustand";
import { persist } from "zustand/middleware";

export type Card = {
  id?: string;
  name: string;
  parentId: string;
  front: string;
  back: string;
  phrase: string;
};

interface CardState {
  cards: Card[];
  addCard: (card: Card) => void;
  removeCard: (id: string) => void;
  updateCard: (id: string, card: Partial<Card>) => void;
}

export const useCardStore = create<CardState>()(
  persist(
    (set) => ({
      cards: [],
      addCard: (card) => {
        set((state) => ({
          cards: [...state.cards, card],
        }));
      },
      removeCard: (id) => {
        set((state) => ({
          cards: state.cards.filter((card) => card.id !== id),
        }));
      },
      updateCard: (id, card) => {
        card.id && delete card.id;
        set((state) => ({
          cards: state.cards.map((card) => {
            if (card.id === id) {
              return { ...card, ...card };
            }
            return card;
          }),
        }));
      },
    }),
    {
      name: "cards",
      getStorage: () => localStorage,
    }
  )
);
