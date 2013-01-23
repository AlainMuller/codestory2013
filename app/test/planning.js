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
    });
});