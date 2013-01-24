/**
 * Created with JetBrains WebStorm.
 * User: Alain Muller
 * Date: 23/01/13
 * Time: 18:52
 * Module de test du module planning
 */

var should = require('should');
var planning = require(__dirname + '/../lib/planning');

var postData = [
    { "VOL":"MONAD42", "DEPART":0, "DUREE":5, "PRIX":10 },
    { "VOL":"META18", "DEPART":3, "DUREE":7, "PRIX":14 },
    { "VOL":"LEGACY01", "DEPART":5, "DUREE":9, "PRIX":8 },
    { "VOL":"YAGNI17", "DEPART":5, "DUREE":9, "PRIX":7 }
];

var postData2 = [
    {"VOL":"AF1", "DEPART":0, "DUREE":1, "PRIX":2},
    {"VOL":"AF2", "DEPART":4, "DUREE":1, "PRIX":4},
    {"VOL":"AF3", "DEPART":2, "DUREE":1, "PRIX":6}
];


describe('jajascript', function () {
    describe('#optimize', function () {
        it('should return gain and path', function () {
            var res = planning.optimize(postData);
            should.exist(res);
            should.exist(res.gain);
            should.exist(res.path);
        });

        it('should return the flight if only one', function () {
            var data = [
                {VOL:"AF514", "DEPART":0, "DUREE":5, "PRIX":10}
            ];
            var res = planning.optimize(data);
            should.exist(res);
            res.gain.should.eql(10);
            res.path.should.eql(["AF514"]);
        });

        it('should return the best gain', function () {
            var res = planning.optimize(postData);
            should.exist(res);
            res.gain.should.eql(18);
            res.path.should.eql(["MONAD42", "LEGACY01"]);
        });

        it('should return complex path', function () {
            var res = planning.optimize(postData2);
            should.exist(res);
            res.gain.should.eql(12);
            res.path.should.eql(["AF1", "AF3", "AF2"]);
        });


        it('should return path the good way', function () {
            var res = planning.optimize(postData2);
            should.exist(res);
            res.gain.should.eql(12);
            res.path.should.eql(["AF1", "AF3", "AF2"]);
            res.path.should.not.eql(["AF1", "AF2", "AF3"]);
        });
    });
});