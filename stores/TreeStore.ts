import create from "zustand";
import { persist } from "zustand/middleware";
import { Card } from "./CardStore";

export type Folder = {
  id?: string;
  name: string;
  parentId: string | null | undefined;
  children: folderorcard[];
};
export type folderorcard = Folder | Card;
// nestable folder structure
interface TreeState {
  folders: folderorcard[];
  addItem: (folder: folderorcard, parentId?: string | undefined | null) => void;
  deleteItem: (folderId: string) => void;
  getItem: (folderId: string) => folderorcard | undefined;
}

const recursiveDelete = (folders: folderorcard[], folderId: string) => {
  const newFolders = folders.filter((folder) => folder.id !== folderId);
  newFolders.forEach((folder) => {
    // @ts-ignore
    if (folder.children) {
      // @ts-ignore
      folder.children = recursiveDelete(folder.children, folderId);
    }
  });
  return newFolders;
};

const recursiveAdd = (
  folders: folderorcard[],
  folder: folderorcard,
  parentId?: string | undefined | null
) => {
  console.log("recursiveAdd", folders, folder, parentId);
  if (!folders) return;

  if (parentId === undefined || parentId === null) {
    folders.push({
      ...folder,
      id: Math.random().toString(36),
    });
  } else {
    folders.forEach((f) => {
      // @ts-ignore
      if (!f.children) return;
      // @ts-ignore
      if (f.id === parentId) {
        // @ts-ignore
        f.children.push({
          ...folder,
          id: Math.random().toString(36),
        });
      } else {
        // @ts-ignore
        f.children = recursiveAdd(f.children, folder, parentId);
      }
    });
  }
  return folders;
};
export const useTreeStore = create<TreeState>()(
  persist(
    (set, get) => ({
      folders: [],
      addItem: (folder, parentId) => {
        folder.id && delete folder.id;
        set((state) => ({
          folders: recursiveAdd(state.folders, folder, parentId),
        }));
      },
      deleteItem: (folderId) => {
        set((state) => ({
          folders: recursiveDelete(state.folders, folderId),
        }));
      },
      getItem: (folderId) => {
        return get().folders.find((folder) => folder.id === folderId);
      },
    }),

    {
      name: "folders",
      getStorage: () => localStorage,
    }
  )
);
