/**
 * Created with JetBrains WebStorm.
 * User: Alain Muller
 * Date: 27/01/13
 * Time: 08:29
 * Module de test du module infix
 */


var should = require('should');
var infix = require(__dirname + '/../lib/infix');


describe('calcul', function () {

    describe('#addition', function () {
        it('1+1 = 2', function () {
            infix.calcul("1+1").should.eql("2");
        });
        it('2+2 = 4', function () {
            infix.calcul("2+2").should.eql("4");
        });
        it('3+3 = 6', function () {
            infix.calcul("3+3").should.eql("6");
        });
        it('4+4 = 8', function () {
            infix.calcul("4+4").should.eql("8");
        });
        it('5+5 = 10', function () {
            infix.calcul("5+5").should.eql("10");
        });
        it('6+6 = 12', function () {
            infix.calcul("6+6").should.eql("12");
        });
        it('7+7 = 14', function () {
            infix.calcul("7+7").should.eql("14");
        });
        it('8+8 = 16', function () {
            infix.calcul("8+8").should.eql("16");
        });
        it('9+9 = 18', function () {
            infix.calcul("9+9").should.eql("18");
        });
    });

    describe('#soustraction', function () {
        it('1-1 = 0', function () {
            infix.calcul("1-1").should.eql("0");
        });
        it('1-2 = -1', function () {
            infix.calcul("1-2").should.eql("-1");
        });
        it('2-1 = 1', function () {
            infix.calcul("2-1").should.eql("1");
        });
    });

    describe('#produit', function () {
        it('1*1 = 1', function () {
            infix.calcul("1*1").should.eql("1");
        });
        it('2*2 = 4', function () {
            infix.calcul("2*2").should.eql("4");
        });
        it('3*3 = 9', function () {
            infix.calcul("3*3").should.eql("9");
        });
        it('4*4 = 16', function () {
            infix.calcul("4*4").should.eql("16");
        });
        it('5*5 = 25', function () {
            infix.calcul("5*5").should.eql("25");
        });
        it('6*6 = 36', function () {
            infix.calcul("6*6").should.eql("36");
        });
        it('7*7 = 49', function () {
            infix.calcul("7*7").should.eql("49");
        });
        it('8*8 = 64', function () {
            infix.calcul("8*8").should.eql("64");
        });
        it('9*9 = 81', function () {
            infix.calcul("9*9").should.eql("81");
        });
    });

    describe('#division', function () {
        it('(1+2)/2 = 1,5', function () {
            infix.calcul("(1+2)/2").should.eql("1,5");
        });
    });

    describe('#opération complexe', function () {

        it('(1+2+3+4+5+6+7+8+9+10)*2 = 110', function () {
            infix.calcul("(1+2+3+4+5+6+7+8+9+10)*2").should.eql("110");
        });


        it('((1+2)+3+4+(5+6+7)+(8+9+10)*3)/2*5 = 272,5', function () {
            infix.calcul("((1+2)+3+4+(5+6+7)+(8+9+10)*3)/2*5").should.eql("272,5");
        });

        it('1,5*4 = 6', function () {
            infix.calcul("1,5*4").should.eql("6");
        });

        it('1,5*4+1,5*2 = 9', function () {
            infix.calcul("1,5*4+1,5*2").should.eql("9");
        });
    });

    describe('#expression invalide', function () {
        it('pouet = undefined', function () {
            should.not.exist(infix.calcul("pouet"));
        });
    });

    describe('#Grosse Opération', function () {
        it('3,18780189038289e+49 => 31878018903828899277492024491376690701584023926880', function () {
            infix.calcul("((1,1+2)+3,14+4+(5+6+7)+(8+9+10)*4267387833344334647677634)/2*553344300034334349999000").should.eql("31878018903828899277492024491376690701584023926880");
        });

        it('Beaucoup de chiffres pour pas grand chose => 1', function () {
            infix.calcul("(((1,1 + 2) + 3,14 + 4 + (5 + 6 + 7) + (8 + 9 + 10) * 4267387833344334647677634) / 2 * 553344300034334349999000) / 31878018903828899277492024491376690701584023926880").should.eql("1");
        });
    });
});