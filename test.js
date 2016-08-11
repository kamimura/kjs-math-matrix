var m11 = [[2,3,-1],
           [4,5,6]].toMatrix(),
    m12 = [-1, 0, 1].toColomn(),
    m21 = [[5, 3],
           [2, 1]].toMatrix(),
    m22 = [[-1, 3],
           [2, -5]].toMatrix(),
    m31 = [[2, 4, -1],
           [0, 3, -2]].toMatrix(),
    m32 = [[1, -5, 0],
           [2, -2, 4],
           [0, 3, 1]].toMatrix(),
    m41 = [[5, 0],
           [-10, 2],
           [3, -1]].toMatrix(),
    m42 = [[1, 2, 3],
           [4, 5, 6]].toMatrix(),
    m51 = [5, 6, -3].toRow(),
    m52 = [6, -3, 4].toColomn(),
    m61 = [10, -1, 5].toColomn(),
    m62 = [-2, 3, 1].toRow(),
    answer0 = document.querySelector('#answer0');

[[m11, m12], [m21, m22], [m31, m32], [m41, m42], [m51, m52], [m61, m62]].
    forEach(function (x) {
        var a = x[0],
            b = x[1];
        answer0.innerHTML += a + ' ' + b + ' = ' + a.mulMatrix(b) + '<br><br>';
    });

var a = [[1, 0],
         [0, 0]].toMatrix(),
    b = [[0, 1],
         [0, 0]].toMatrix(),
    c = a.mulMatrix(b),
    d = b.mulMatrix(a);

answer0.innerHTML +=
    'A = ' + a  + ', B = ' + b + '<br><br>' +
    'AB = ' + a.mulMatrix(b) + '<br><br>' +
    'BA = ' + b.mulMatrix(a) + '<br><br>';

if (c.isEqual(d)) {
    answer0.innerHTML += 'AB == BA';
} else {
    answer0.innerHTML += 'AB != BA';
}
answer0.innerHTML += '<br><br>';
answer0.innerHTML += m11 + m11.transposed() + '<br><br>';

try {
    answer0.innerHTML += m31.trace() + '<br><br>';
} catch (e) {
    answer0.innerHTML += e.name + ': ' + e.message + '<br><br>';
}

answer0.innerHTML += 'tr' + m32 + ' = ' + m32.trace();
