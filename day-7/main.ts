import * as fs from 'fs';

const data = fs.readFileSync('day-7/input', 'utf8');
const lines = data.split('\n').slice(0, -1);

enum KeyWords {
  OWN_COMMAND_CHARACTER = '$',
  DIRECTORY_CHARACTER = '/',
  MOVE_OUT_WORD = '..',
  MOVE_WORD = 'cd',
  DIRECTORY_WORD = 'dir',
  LIST_WORD = 'ls'
}



let currDirectory = '';
let listingStuff = false;
const fileMapping: any = { // starts at the root, so /

};

const executeOwnCommand = (keyWords: string[]) => {
  switch(keyWords[0]) {
    case KeyWords.MOVE_WORD:
      const directoryToMoveTo = keyWords[1];
      //const test = directoryToMoveTo.split(KeyWords.DIRECTORY_CHARACTER);
      //if (test.length > 1) throw new Error(`need to handle ${directoryToMoveTo} -> before ${test[0]} after ${test[1]}`);

      switch (directoryToMoveTo) {
        case KeyWords.MOVE_OUT_WORD:
          const splitDirectories = currDirectory.split(KeyWords.DIRECTORY_CHARACTER);
          //console.log('splitDirectories', splitDirectories);
          const directoryMovedOutOf = splitDirectories.pop();
          console.log(`Moving out of directory ${directoryMovedOutOf}`);
          currDirectory = splitDirectories.join(KeyWords.DIRECTORY_CHARACTER);
          break;
        case KeyWords.DIRECTORY_CHARACTER:
          console.log('Moving to root directory');
          currDirectory = '';
          break;
        default: // moving into a directory
          console.log('Moving into directory ' + directoryToMoveTo);
          currDirectory += `${KeyWords.DIRECTORY_CHARACTER}${directoryToMoveTo}`;
      }

      console.log(`Now in ${currDirectory}`);
      break;
    case KeyWords.LIST_WORD:
      listingStuff = true;
      break;
    default:
      throw new Error(`forgot character ${keyWords[0]}`)
  }
}

const getCurrentDirectoryFileMapping = () => {
  const directories = currDirectory.split(KeyWords.DIRECTORY_CHARACTER);
  let currentDirectoryFileMapping: any = fileMapping;
  for (const directory of directories) {
    if (currentDirectoryFileMapping[directory] === undefined) {
      // throw new Error('need to add stuff as we move into them');
      currentDirectoryFileMapping[directory] = {};
    }
    currentDirectoryFileMapping = currentDirectoryFileMapping[directory];
  }
  return currentDirectoryFileMapping;
}

for (const line of lines) {
  console.log(line);
  const keyWords = line.split(' ');

  if (keyWords[0] === KeyWords.OWN_COMMAND_CHARACTER) {
    listingStuff = false;
    executeOwnCommand(keyWords.slice(1));
  } else {
    if (!listingStuff) throw new Error('shouldnt be in the else?');

    const currentDirectoryFileMapping = getCurrentDirectoryFileMapping();

    if (keyWords[0] === KeyWords.DIRECTORY_WORD) {
      if (currentDirectoryFileMapping[keyWords[1]] === undefined) {
        currentDirectoryFileMapping[keyWords[1]] = {}
      } else {
        console.log(`Directory ${keyWords[1]} already exists in mapping ${currentDirectoryFileMapping}`);
      }
    } else {
      // its a file size
      if (currentDirectoryFileMapping[keyWords[1]] === undefined) {
        currentDirectoryFileMapping[keyWords[1]] = Number(keyWords[0])
      }
    }
  }
}

let sumOfSmallDirectories = 0;

const recursivelyAddTheDirectorySizes = (currentMapping: any): number => {
  const directoriesAndFiles = Object.keys(currentMapping);

  const directories = directoriesAndFiles.filter((item) => isNaN(Number(currentMapping[item])));
  const totalDirectoriesSize = directories.map((directory) => recursivelyAddTheDirectorySizes(currentMapping[directory])).reduce((acc, current) => acc + current, 0);
  const totalFileSizes = directoriesAndFiles.filter((item) => !isNaN(Number(currentMapping[item]))).reduce((acc, current) => acc + currentMapping[current], 0)

  const totalSize = totalDirectoriesSize + totalFileSizes;
  currentMapping['size'] = totalSize;

  if (totalSize < 100000) {
    sumOfSmallDirectories += totalSize;
  }

  return totalSize;
}

recursivelyAddTheDirectorySizes(fileMapping);
console.log(sumOfSmallDirectories);
