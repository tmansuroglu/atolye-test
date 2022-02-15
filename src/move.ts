// Please update this type as same as with the data shape.

type List = Array<Folder>;

type Folder = {
  id: string;
  name: string;
  files: Array<File>;
};

type File = { id: string; name: string };

export default function move(list: List, source: string, destination: string): List {
  if (!list.length) {
    throw new Error('Folders are empty!');
  }

  if (!source) {
    throw new Error('Invalid file id');
  }

  if (!destination) {
    throw new Error('Invalid destination folder id');
  }

  let fileFolderIndex = '';
  let fileIndex = '';
  let destinationFolderIndex = '';

  const newList = list.map((folder, folderIndex) => {
    if (source === folder.id) {
      throw new Error('You cannot move a folder');
    }

    if (!destinationFolderIndex && folder.id === destination) {
      destinationFolderIndex = `${folderIndex}`;
    }

    const newFiles = folder.files.filter((file, _fileIndex) => {
      if (destination === file.id) {
        throw new Error('You cannot specify a file as the destination');
      }

      if (file.id === source) {
        fileFolderIndex = `${folderIndex}`;
        fileIndex = `${_fileIndex}`;

        return false;
      }
      return true;
    });

    const isLastFolder = folderIndex === list.length - 1;

    if (isLastFolder && !destinationFolderIndex) {
      throw new Error("Destination folder doesn't exist");
    }

    if (isLastFolder && !fileIndex) {
      throw new Error("File doesn't exist");
    }

    const newFolder: Folder = { ...folder, files: newFiles };

    return newFolder;
  });

  newList[Number(destinationFolderIndex)].files.push(
    list[Number(fileFolderIndex)].files[Number(fileIndex)],
  );

  return newList;
}
