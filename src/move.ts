// Please update this type as same as with the data shape.

type File = { id: string; name: string };

type Folder = {
  id: string;
  name: string;
  files: Array<File>;
};

type List = Array<Folder>;

export default function move(
  foldersArray: List,
  fileId: string,
  destinationFolderId: string,
): List {
  throw new Error('Not implemented');
}
