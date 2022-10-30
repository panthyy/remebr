export const recursiveDelete = (folders: any[], folderId: string) => {
  const newFolders = folders.filter((folder: any) => folder.id !== folderId);
  newFolders.forEach((folder: any) => {
    if (folder.children) {
      folder.children = recursiveDelete(folder.children, folderId);
    }
  });
  return newFolders;
};
