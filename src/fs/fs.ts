export class FS {
  private static tree: Record<string, any> = {};

  private static home: string = '';

  public static getHome() {
    return this.home;
  }
  public static setHome(home: string) {
    this.home = home;
    return home;
  }

  /**
   * Removes '../' from the path, replacing with the parent directory
   * @param path
   * @private
   */
  public static _parsePath(path: string): string[] {
    let tokens = path.split('/').filter((token) => token !== '');
    let length = tokens.length;
    let i = 0;
    while (i < length && length !== 0) {
      if (tokens[i] === '..') {
        try {
          if (tokens[i - 1]) {
            tokens.splice(i, 1);
            tokens.splice(i - 1, 1);
            i--;
          } else {
            throw new Error();
          }
        } catch (e) {
          throw new Error('Uncorrected path');
        }
      } else {
        i++;
      }
    }
    return tokens;
  }

  public static getFolder(path: string) {
    const tokens = this._parsePath(path);
    let parsedPath = this.tree;
    tokens.forEach((token) => {
      if (parsedPath[token] && typeof parsedPath[token] === 'object') {
        parsedPath = parsedPath[token];
      } else {
        return 'Uncorrected path';
      }
    });
    return parsedPath;
  }

  private static _getFolderWithoutLast(
    path: string
  ): [Record<string, any>, string] {
    const tokens = path.split('/');
    return [
      this.getFolder(tokens.slice(0, tokens.length - 1).join('/')),
      tokens[tokens.length - 1],
    ];
  }

  public static readFile(path: string): string | 'Uncorrected path' {
    const [folder, file] = this._getFolderWithoutLast(path);
    if (folder[file] && typeof folder[file] === 'string') {
      return folder[file];
    } else {
      return 'Uncorrected path';
    }
  }

  public static write(path: string, data: string | {}) {
    const [folder, file] = this._getFolderWithoutLast(path);
    folder[file] = data;
  }

  public static remove(path: string, recursion?: boolean) {
    const [folder, last] = this._getFolderWithoutLast(path);
    if (typeof folder[last] === 'object' && recursion) {
      delete folder[last];
      return;
    } else if (typeof folder[last] === 'string') {
      delete folder[last];
      return;
    }
    return 'Requires the recursion flag';
  }

  public static export() {
    return JSON.stringify(this.tree);
  }

  public static import(data: { [key: string]: any } | string, home?: string) {
    this.tree = typeof data === 'object' ? data : JSON.parse(data);
    if (home) {
      this.home = home;
    }
  }
}
