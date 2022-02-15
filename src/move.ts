// Please update this type as same as with the data shape.

type List = Array<Folder>;

type Folder = {
  id: string;
  name: string;
  files: Array<File>;
};

type File = { id: string; name: string };

export default function move(list: List, sourceFileId: string, destinationFolderId: string): List {
  if (!list.length) {
    throw new Error('List is empty');
  }

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
    if (sourceFileId === folder.id) {
      throw new Error('You cannot move a folder');
    }

    if (!destinationFolderIndex && folder.id === destinationFolderId) {
      destinationFolderIndex = `${folderIndex}`;
    }

    const newFiles = folder.files.filter((file, fileIndex) => {
      if (destinationFolderId === file.id) {
        throw new Error('You cannot specify a file as the destination');
      }

      if (file.id === sourceFileId) {
        sourceFolderIndex = `${folderIndex}`;
        sourceFileIndex = `${fileIndex}`;

        return false;
      }
      return true;
    });

    const isLastFolder = folderIndex === list.length - 1;

    if (isLastFolder && !destinationFolderIndex) {
      throw new Error("Destination folder doesn't exist");
    }

    if (isLastFolder && !sourceFileIndex) {
      throw new Error("File doesn't exist");
    }

    const newFolder: Folder = { ...folder, files: newFiles };

    return newFolder;
  });

  newList[Number(destinationFolderIndex)].files.push(
    list[Number(sourceFolderIndex)].files[Number(sourceFileIndex)],
  );

  return newList;
}
