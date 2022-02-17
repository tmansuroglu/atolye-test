// Please update this type as same as with the data shape.

type List = Array<Folder>;

type Folder = {
  id: string;
  name: string;
  files: Array<File>;
};

type File = { id: string; name: string };

export default function move(list: List, sourceFileId: string, destinationFolderId: string): List {
  if (!sourceFileId) {
    throw new Error('Invalid source file id');
  }

  if (!destinationFolderId) {
    throw new Error('Invalid destination folder id');
  }

  let sourceFolderIndex = '';
  let sourceFileIndex = '';
  let destinationFolderIndex = '';

  const newList = list.map((folder, folderIndex) => {
    // instead of id checking, type checking would be better
    if (sourceFileId === folder.id) {
      throw new Error('You cannot move a folder');
    }

    if (!destinationFolderIndex && folder.id === destinationFolderId) {
      destinationFolderIndex = `${folderIndex}`;
    }

    const newFiles = folder.files.filter((file, fileIndex) => {
      // instead of id checking, type checking would be better
      if (destinationFolderId === file.id) {
        throw new Error('You cannot specify a file as the destination');
      }

      if (file.id === sourceFileId) {
        sourceFolderIndex = `${folderIndex}`;
        sourceFileIndex = `${fileIndex}`;

        if (sourceFolderIndex === destinationFolderIndex) {
          throw new Error('Source file is already placed at destination');
        }

        return false;
      }
      return true;
    });

    const isLastFolder = folderIndex === list.length - 1;

    if (isLastFolder && !destinationFolderIndex) {
      throw new Error('Destination folder does not exist');
    }

    if (isLastFolder && !sourceFileIndex) {
      throw new Error('Source file does not exist');
    }

    return { ...folder, files: newFiles };
  });

  const sourceFile = list[Number(sourceFolderIndex)].files[Number(sourceFileIndex)];

  newList[Number(destinationFolderIndex)].files.push(sourceFile);

  return newList;
}
