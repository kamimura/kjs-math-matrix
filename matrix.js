var Matrix;

Matrix = function (m, n, fill) {
    var fill = fill || 0,
        matrix = [],
        i,
        j,
        row;

    for (i = 0; i < m; i += 1) {
        row = [];
        for (j = 0; j < n; j += 1) {
            row.push(fill);
        }
        matrix.push(row);
    }
    this.rowLength = m;
    this.colomnLength = n;
    this.getElement = function (i, j) {
        this.isValidIndex(m, n, i, j);
        return matrix[i-1][j-1];
    };
    this.setElement = function (i, j, elem) {
        this.isValidIndex(m, n, i, j);
        matrix[i-1][j-1] = elem;
    };
};
Matrix.prototype.isValidIndex = function (m, n, i, j) {
    if (i < 1 || m < i || j < 1 || n < j) {
        throw {
            type: 'Index error',
            message: m + ' x ' + n + ': ' + '(' + i + ', ' + j + ')'
        };
    }
};
Matrix.prototype.toArray = function () {
    var matrix = [],
        i,
        j,
        m = this.rowLength,
        n = this.colomnLength,
        row;

    for (i = 1; i <= m; i += 1) {
        row = [];
        for (j = 1; j <= n; j += 1) {
            row.push(this.getElement(i, j))
        }
        matrix.push(row);
    }
    return matrix;
};
Matrix.prototype.toString = function () {
    var m = this.rowLength,
        n = this.colomnLength,
        i,
        j,
        result = '<table style="display: inline-block; text-align:center;' +
        'border-style:none solid; border-radius:0.5em;">';

    if (window) {
        for (i = 1; i <= m; i += 1) {
            result += '<tr>';
            for (j = 1; j <= n; j += 1) {
                result += '<td>' + this.getElement(i, j) + '</td>';
            }
            result += '</tr>';
        }
        result += '</table>';
        return result;
    }
    return this.toArray();
};
Matrix.prototype.getRow = function (i) {
    var j,
        n = this.colomnLength,
        row = new Matrix(1, n);

    for (j = 1; j <= n; j += 1) {
        row.setElement(1, j, this.getElement(i, j));
    }
    return row;
};
Matrix.prototype.getColomn = function (j) {
    var m = this.rowLength,
        i,
        col = new Matrix(m, 1);

    for (i = 1; i <= m; i += 1) {
        col.setElement(i, 1, this.getElement(i, j));
    }
    return col;
};
Matrix.prototype.setRow = function (i, row) {
    var n = this.colomnLength,
        j;
    
    for (j = 1; j <= n; j += 1) {
        this.setElement(i, j, row.getElement(1, j));
    }
};
Matrix.prototype.setColomn = function (j, colomn) {
    var m = this.rowLength,
        i;
    
    for (i = 1; i <= m; i += 1) {
        this.setElement(i, j, colomn.getElement(i, 1));
    }
};
Matrix.prototype.add = function (mat) {
    var m = this.rowLength,
        n = this.colomnLength,
        matrix = new Matrix(m, n),
        i,
        j;

    for (i = 1; i <= m; i += 1) {
        for (j = 1; j <= n; j += 1) {
            matrix.setElement(i, j,
                              this.getElement(i, j) + mat.getElement(i, j));
        }
    }
    return matrix;
};
Matrix.prototype.mulMatrix = function (mat) {
    var m = this.rowLength,
        n = this.colomnLength,
        m0 = mat.rowLength,
        n0 = mat.colomnLength,
        i,
        j,
        matrix = new Matrix(m, n0),
        elem,
        j0;

    if (n !== m0) {
        throw {
            type: "mulMatrix error",
            message: '(' + m + ', ' + n + ') x (' + m0 + ', ' + n0 + ')',
        };
    }
    for (i = 1; i <= m; i += 1) {
        for (j = 1; j <= n0; j += 1) {
            elem = 0;
            for (j0 = 1; j0 <= n; j0 += 1) {
                elem += this.getElement(i, j0) * mat.getElement(j0, j);
            }
            matrix.setElement(i, j, elem);
        }
    }
    return matrix;
};
Matrix.prototype.mulScalar = function (scalar) {
    var m = this.rowLength,
        n = this.colomnLength,
        i,
        j,
        matrix = new Matrix(m, n);

    for (i = 1; i <= m; i += 1) {
        for (j = 1; j <= n; j += 1) {
            matrix.setElement(i, j, this.getElement(i, j) * scalar);
        }
    }
    return matrix;
};

Array.prototype.toRow = function () {
    var len = this.length,
        matrix = new Matrix(1, len),
        j;

    for (j = 1; j <= len; j += 1) {
        matrix.setElement(1, j, this[j - 1]);
    }
    return matrix;
};
Array.prototype.toColomn = function () {
    var len = this.length,
        matrix = new Matrix(len, 1),
        i;

    for (i = 1; i <= len; i += 1) {
        matrix.setElement(i, 1, this[i - 1]);
    }
    return matrix;
};
Array.prototype.toMatrix = function () {
    var m = this.length,
        n = this[0].length,
        matrix = new Matrix(m, n),
        i,
        j;

    for (i = 1; i <= m; i += 1) {
        for (j = 1; j <= n; j += 1) {
            matrix.setElement(i, j, this[i-1][j-1]);
        }
    }
    return matrix;
};
