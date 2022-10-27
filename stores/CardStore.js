import create from "zustand";
import { persist } from "zustand/middleware";

export const useCardStore = create(
  persist(
    (set, get) => ({
      cards: [
        {
          id: 1,
          title: "Card 1",
          front: "Front 1",
          back: "Back 1",
          phrase: "Phrase 1",
        },
      ],
      addCard: (card) => {
        const newId = get().cards.length + 1;
        set((state) => ({
          cards: [
            ...state.cards,
            {
              id: newId,
              ...card,
            },
          ],
        }));
        return newId;
      },
      removeCard: (card) => {
        set((state) => ({
          cards: state.cards.filter((c) => c.id !== card.id),
        }));
      },
      updateCard: (id, card) => {
        card.id && delete card.id;
        set((state) => ({
          cards: state.cards.map((c) => (c.id === id ? { ...c, ...card } : c)),
        }));
      },
    }),
    {
      name: "card-store",
      getStorage: () => localStorage,
    }
  )
);
