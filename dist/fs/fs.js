export var FS = /** @class */ (function () {
    function FS() {
    }
    FS.getHome = function () {
        return this.home;
    };
    FS.setHome = function (home) {
        this.home = home;
        return home;
    };
    /**
     * Removes '../' from the path, replacing with the parent directory
     * @param path
     * @private
     */
    FS._parsePath = function (path) {
        var tokens = path.split('/').filter(function (token) { return token !== ''; });
        var length = tokens.length;
        var i = 0;
        while (i < length && length !== 0) {
            if (tokens[i] === '..') {
                try {
                    if (tokens[i - 1]) {
                        tokens.splice(i, 1);
                        tokens.splice(i - 1, 1);
                        i--;
                    }
                    else {
                        throw new Error();
                    }
                }
                catch (e) {
                    throw new Error('Uncorrected path');
                }
            }
            else {
                i++;
            }
        }
        return tokens;
    };
    FS.getFolder = function (path) {
        var tokens = this._parsePath(path);
        var parsedPath = this.tree;
        tokens.forEach(function (token) {
            if (parsedPath[token] && typeof parsedPath[token] === 'object') {
                parsedPath = parsedPath[token];
            }
            else {
                return 'Uncorrected path';
            }
        });
        return parsedPath;
    };
    FS._getFolderWithoutLast = function (path) {
        var tokens = path.split('/');
        return [
            this.getFolder(tokens.slice(0, tokens.length - 1).join('/')),
            tokens[tokens.length - 1],
        ];
    };
    FS.readFile = function (path) {
        var _a;
        var folder = (_a = this._getFolderWithoutLast(path), _a[0]), file = _a[1];
        if (folder[file] && typeof folder[file] === 'string') {
            return folder[file];
        }
        else {
            return 'Uncorrected path';
        }
    };
    FS.write = function (path, data) {
        var _a;
        var folder = (_a = this._getFolderWithoutLast(path), _a[0]), file = _a[1];
        folder[file] = data;
    };
    FS.remove = function (path, recursion) {
        var _a;
        var folder = (_a = this._getFolderWithoutLast(path), _a[0]), last = _a[1];
        if (typeof folder[last] === 'object' && recursion) {
            delete folder[last];
            return;
        }
        else if (typeof folder[last] === 'string') {
            delete folder[last];
            return;
        }
        return 'Requires the recursion flag';
    };
    FS.export = function () {
        return JSON.stringify(this.tree);
    };
    FS.import = function (data, home) {
        this.tree = typeof data === 'object' ? data : JSON.parse(data);
        if (home) {
            this.home = home;
        }
    };
    FS.tree = {};
    FS.home = '';
    return FS;
}());
//# sourceMappingURL=fs.js.map