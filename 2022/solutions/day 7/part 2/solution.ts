import { splitLines } from "../../../utils.ts";

interface FileSystemObject {
  size: number;
  name?: string;
}

class Directory implements FileSystemObject {
  public items: FileSystemObject[] = [];
  public parent: Directory;

  constructor(public name?: string, parent?: Directory) {
    if (parent) this.parent = parent;
    else this.parent = this;
  }

  get size() {
    return this.items.reduce((prev, curr) => prev + curr.size, 0);
  }
}

class File implements FileSystemObject {
  constructor(public readonly name: string, public readonly size: number) {}
}

export async function solution(input: string): Promise<string> {
  const lines = splitLines(input);

  // Generate directory tree
  let shouldSkip = 0;
  const rootDirectory = new Directory("/");
  let currentDirectory = rootDirectory;
  for (let i = 0; i < lines.length; i++) {
    if (shouldSkip > 0) {
      shouldSkip--;
      continue;
    }
    const line = lines[i];
    if (line.startsWith("$")) {
      const match = line.match(/^\$ ((?:cd)|(?:ls))(?: (.+))?$/)!;
      const [, command, argument] = match;
      if (command === "ls") {
        let j = i + 1;
        while (j < lines.length) {
          const resultLine = lines[j];
          if (resultLine.startsWith("$")) break;

          const [data, name] = resultLine.split(" ");
          if (data === "dir") {
            const dir = new Directory(name, currentDirectory);
            currentDirectory.items.push(dir);
          } else {
            const file = new File(name, Number(data));
            console.log(name, data, file.size);
            console.log(currentDirectory.size);
            currentDirectory.items.push(file);
            console.log(currentDirectory.size);
          }
          j++;
        }
      } else if (command === "cd") {
        if (argument === "..") {
          currentDirectory = currentDirectory.parent;
        } else if (argument === "/") {
          currentDirectory = rootDirectory;
        } else {
          let dirToMoveInto = currentDirectory.items.find(
            (v) => v.name === argument && v instanceof Directory
          ) as Directory | undefined;
          if (!dirToMoveInto) {
            dirToMoveInto = new Directory(argument, currentDirectory);
          }
          currentDirectory = dirToMoveInto;
        }
      }
    }
  }

  const neededSpace = 30000000;
  const deviceTotalSpace = 70000000;
  const currentlyFree = deviceTotalSpace - rootDirectory.size;
  const needToFree = neededSpace - currentlyFree;

  const allDirectories: Directory[] = [];
  function reccur(dir: Directory) {
    allDirectories.push(dir);
    (dir.items.filter((i) => i instanceof Directory) as Directory[]).map(
      reccur
    );
  }
  reccur(rootDirectory);

  allDirectories.sort((a, b) => a.size - b.size);

  let chosenDir: Directory;

  for (const dir of allDirectories) {
    if (dir.size >= needToFree) {
      chosenDir = dir;
      break;
    }
  }

  console.log(chosenDir!);

  return chosenDir!.size.toString();
}
