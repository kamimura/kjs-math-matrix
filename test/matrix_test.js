(function (global){
    'use strict';
    
    var expect = require('chai').expect;
    require('../matrix.js');

    describe('matrix tests', function () {
        it('should pass this canary test', function () {
            expect(true).to.be.true;
        });

        var matrix1,
            matrix2,
            matrix3,
            I3;
        
        beforeEach(function () {
            matrix1 = [[10]].toMatrix();
            matrix2 = [[1, 2],
                       [3, 4]].toMatrix();
            matrix3 = [[1, 2, 3],
                       [4, 5, 6],
                       [7, 8, 9]].toMatrix();
            I3 = [[1, 0, 0],
                  [0, 1, 0],
                  [0, 0, 1]].toMatrix();
        });
        it ('det test (1 x 1)', function () {
            expect(matrix1.det()).to.eql(10);
        });    
        it ('det test (1 x 1)', function () {
            var m = [[-10]].toMatrix();

            expect(m.det()).to.eql(-10);
        });
        it('det test (3 x 3)', function () {
            var m = [[5, -10],
                     [15, 20]].toMatrix();

            expect(m.det()).to.eql(250);
        });    
        it('det test (3 x 3)', function () {
            expect(matrix3.det()).to.eql(0);
        });
        it('isRegular (2 x 2)', function () {
            expect(matrix2.isRegular()).to.be.true;
        });
        it('isRegular (3 x 3)', function () {
            expect(matrix3.isRegular()).to.be.false;
        });
        it('adjoint (3 x 3)', function () {
            var m1 = [[-3, 2, -5],
                      [-1, 0, -2],
                      [3, -4, 1]].toMatrix(),
                m2 = [[-8, 18, -4],
                      [-5, 12, -1],
                      [4, -6, 2]].toMatrix();

            expect(m1.adjoint().isEqual(m2)).to.be.true;
        });
        it ('inverse (3 x 3)', function () {
            var m = [[-1, 2, 3],
                     [4, 5, 6],
                     [7, 8, 9]].toMatrix(),
                m0 = m.inverse(),
                m1 = m.mulMatrix(m0);

            expect(m1.isEqual(I3)).to.be.true;
        });
        it('isSymmetric (2 x 2)', function () {
            expect(matrix2.isSymmetric()).to.be.false;
        });
        it('isSymmetric (3 x 3)', function () {
            var m = [[1, 2, 3],
                     [2, 10, 4],
                     [3, 4, 100]].toMatrix();

            expect(m.isSymmetric()).to.be.true;
        });
    });
}(this));
