var Matrix;

Matrix = function (m, n, fill) {
    var fill = fill || 0,
        m = m,
        n = n,
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
    this.rowLength = function () {
        return m;
    };
    this.colomnLength = function () {
        return n;
    };
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
        m = this.rowLength(),
        n = this.colomnLength(),
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
    var m = this.rowLength(),
        n = this.colomnLength(),
        i,
        j,
        result = '<math><mfenced><mtable>';

    if (typeof window !== 'undefined') {
        for (i = 1; i <= m; i += 1) {
            result += '<mtr>';
            for (j = 1; j <= n; j += 1) {
                result += '<mtd><mn>' + this.getElement(i, j) + '</mn></mtd>';
            }
            result += '</mtr>';
        }
        result += '</mtable></math>';
        return result;
    }
    return this.toArray();
};
Matrix.prototype.getRow = function (i) {
    var j,
        n = this.colomnLength(),
        row = new Matrix(1, n);

    for (j = 1; j <= n; j += 1) {
        row.setElement(1, j, this.getElement(i, j));
    }
    return row;
};
Matrix.prototype.getColomn = function (j) {
    var m = this.rowLength(),
        i,
        col = new Matrix(m, 1);

    for (i = 1; i <= m; i += 1) {
        col.setElement(i, 1, this.getElement(i, j));
    }
    return col;
};
Matrix.prototype.setRow = function (i, row) {
    var n = this.colomnLength(),
        j;
    
    for (j = 1; j <= n; j += 1) {
        this.setElement(i, j, row.getElement(1, j));
    }
};
Matrix.prototype.setColomn = function (j, colomn) {
    var m = this.rowLength(),
        i;
    
    for (i = 1; i <= m; i += 1) {
        this.setElement(i, j, colomn.getElement(i, 1));
    }
};
Matrix.prototype.isEqual = function (mat) {
    var m = this.rowLength(),
        n = this.colomnLength(),
        i,
        j;

    if (m !== mat.rowLength() || n !== mat.colomnLength()) {
        return false;
    }
    for (i = 1; i <= m; i += 1) {
        for (j = 1; j <= n; j += 1) {
            if (this.getElement(i, j) !== mat.getElement(i, j)) {
                return false;
            }
        }
    }
    return true;
};
Matrix.prototype.add = function (mat) {
    var m = this.rowLength(),
        n = this.colomnLength(),
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
    var m = this.rowLength(),
        n = this.colomnLength(),
        m0 = mat.rowLength(),
        n0 = mat.colomnLength(),
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
    var m = this.rowLength(),
        n = this.colomnLength(),
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
Matrix.prototype.transposed = function () {
    var m = this.colomnLength(),
        n = this.rowLength(),
        i,
        j,
        matrix = new Matrix(m, n);

    for (i = 1; i <= m; i += 1) {
        for (j = 1; j <= n; j += 1) {
            matrix.setElement(i, j, this.getElement(j, i));
        }
    }
    return matrix;
};
Matrix.prototype.isSquare = function () {
    return this.rowLength() === this.colomnLength();
};
Matrix.prototype.trace = function () {
    var out = 0,
        n = this.rowLength(),
        i;

    if (this.isSquare()) {
        for (i = 1; i <= n; i += 1) {
            out += this.getElement(i, i);
        }
        return out;
    }
    throw {
        type: 'trace error',
        message: this + ' not a Square Matrix',
    };
};
Matrix.prototype.det = function () {
    var n,
        i,
        k,
        i0,
        j0,
        i1,
        j1,
        result,
        matrix;
    
    if (this.isSquare()) {        
        n = this.rowLength();
        if (n === 1) {
            return this.getElement(n, n);
        }
        k = Math.floor(Math.random() * n) + 1;
        result = 0;
        for (i = 1; i <= n; i += 1) {
            matrix = new Matrix(n - 1, n - 1);            
            for (i0 = 1, i1 = 1; i0 <= n; i0 += 1) {
                if (i0 === i) {
                    continue;
                }
                for (j0 = 1, j1 = 1; j0 <= n; j0 += 1) {
                    if (j0 === k) {
                        continue;
                    }
                    matrix.setElement(i1, j1, this.getElement(i0, j0));
                    j1 += 1;
                }
                i1 += 1;
            }
            result +=
                Math.pow(-1, i + k) * this.getElement(i, k) * matrix.det();
        }
        return result;
    }
    throw {
        type: 'det error',
        message: this + ' not a Square Matrix'
    };
};
Matrix.prototype.isRegular = function () {
    if (!this.isSquare()) {
        throw {
            type: 'isRegular error',
            message: this + ' not a Square Matrix',
        }
    }
    return this.det() !== 0;
};
Matrix.prototype.adjoint = function () {
    var n,
        i,
        j,
        i0,
        j0,
        i1,
        j1,
        matrix0,
        matrix1;
    
    if (this.isSquare()) {
        n = this.rowLength();
        matrix0 = new Matrix(n - 1, n - 1);
        matrix1 = new Matrix(n, n);        
        for (i = 1; i <= n; i += 1) {            
            for (j = 1; j <= n; j += 1) {
                for (i0 = 1, i1 = 1; i1 <= n; i1 += 1) {
                    if (i1 === i) {
                        continue;
                    }
                    for (j0 = 1, j1 = 1; j1 <= n; j1 += 1) {
                        if (j1 === j) {
                            continue;
                        }
                        matrix0.setElement(i0, j0, this.getElement(i1, j1));
                        j0 += 1;
                    }
                    i0 += 1;
                }
                matrix1.setElement(j, i, Math.pow(-1, i + j) * matrix0.det());
            }
        }
        return matrix1;
    }    
    throw {
        type: 'isRegular error',
        message: this + ' not a Square Matrix',
    }        
    
};
Matrix.prototype.inverse = function () {
    if (!this.isSquare()) {
        throw {
            type: 'inverse error',
            message: this + ' not a Square Matrix',
        };
    }
    if (!this.isRegular()) {
        throw {
            type: 'inverse error',
            message: this + ' is a Irregular Matrix',
        };
    }
    return this.adjoint().mulScalar(1 / this.det());
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
