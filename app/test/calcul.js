/**
 * Created with JetBrains WebStorm.
 * User: Alain Muller
 * Date: 21/01/13
 * Time: 20:41
 * Module de test du module calcul
 */

var should = require('should');
var calc = require(__dirname + '/../lib/calcul');

describe('calcul', function () {
    describe('#addition', function () {
        it('1+1 = 2', function () {
            calc.calcExpr("1+1").should.eql("2");
        });
        it('2+2 = 4', function () {
            calc.calcExpr("2+2").should.eql("4");
        });
        it('3+3 = 6', function () {
            calc.calcExpr("3+3").should.eql("6");
        });
        it('4+4 = 8', function () {
            calc.calcExpr("4+4").should.eql("8");
        });
        it('5+5 = 10', function () {
            calc.calcExpr("5+5").should.eql("10");
        });
        it('6+6 = 12', function () {
            calc.calcExpr("6+6").should.eql("12");
        });
        it('7+7 = 14', function () {
            calc.calcExpr("7+7").should.eql("14");
        });
        it('8+8 = 16', function () {
            calc.calcExpr("8+8").should.eql("16");
        });
        it('9+9 = 18', function () {
            calc.calcExpr("9+9").should.eql("18");
        });
    });

    describe('#soustraction', function () {
        it('1-1 = 0', function () {
            calc.calcExpr("1-1").should.eql("0");
        });
        it('1-2 = -1', function () {
            calc.calcExpr("1-2").should.eql("-1");
        });
        it('2-1 = 1', function () {
            calc.calcExpr("2-1").should.eql("1");
        });
    });

    describe('#produit', function () {
        it('1*1 = 1', function () {
            calc.calcExpr("1*1").should.eql("1");
        });
        it('2*2 = 4', function () {
            calc.calcExpr("2*2").should.eql("4");
        });
        it('3*3 = 9', function () {
            calc.calcExpr("3*3").should.eql("9");
        });
        it('4*4 = 16', function () {
            calc.calcExpr("4*4").should.eql("16");
        });
        it('5*5 = 25', function () {
            calc.calcExpr("5*5").should.eql("25");
        });
        it('6*6 = 36', function () {
            calc.calcExpr("6*6").should.eql("36");
        });
        it('7*7 = 49', function () {
            calc.calcExpr("7*7").should.eql("49");
        });
        it('8*8 = 64', function () {
            calc.calcExpr("8*8").should.eql("64");
        });
        it('9*9 = 81', function () {
            calc.calcExpr("9*9").should.eql("81");
        });
    });

    describe('#division', function () {
        it('(1+2)/2 = 1,5', function () {
            calc.calcExpr("(1+2)/2").should.eql("1,5");
        });
    });

    describe('#opération complexe', function () {
        it('(1+2+3+4+5+6+7+8+9+10)*2 = 110', function () {
            calc.calcExpr("(1+2+3+4+5+6+7+8+9+10)*2").should.eql("110");
        });
        it('((1+2)+3+4+(5+6+7)+(8+9+10)*3)/2*5 = 272,5', function () {
            calc.calcExpr("((1+2)+3+4+(5+6+7)+(8+9+10)*3)/2*5").should.eql("272,5");
        });
        it('1,5*4 = 6', function () {
            calc.calcExpr("1,5*4").should.eql("6");
        });
        it('1,5*4+1,5*2 = 9', function () {
            calc.calcExpr("1,5*4+1,5*2").should.eql("9");
        });
    });

    describe('#expression invalice', function () {
        it('pouet = undefined', function () {
            should.not.exist(calc.calcExpr("pouet"));
        });
    });
});