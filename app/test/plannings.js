/**
 * Created with JetBrains WebStorm.
 * User: Alain Muller
 * Date: 29/01/13
 * Time: 21:51
 * Module de test du module planning
 */


var should = require('should');
var planning = require(__dirname + '/../lib/planning');

var data = [
    { "VOL":"MONAD42", "DEPART":0, "DUREE":5, "PRIX":10 },
    { "VOL":"META18", "DEPART":3, "DUREE":7, "PRIX":14 },
    { "VOL":"LEGACY01", "DEPART":5, "DUREE":9, "PRIX":8 },
    { "VOL":"YAGNI17", "DEPART":5, "DUREE":9, "PRIX":7 }
];

var data2 = [
    {"VOL":"AF1", "DEPART":0, "DUREE":1, "PRIX":2},
    {"VOL":"AF2", "DEPART":4, "DUREE":1, "PRIX":4},
    {"VOL":"AF3", "DEPART":2, "DUREE":1, "PRIX":6},
    {"VOL":"AF4", "DEPART":2, "DUREE":5, "PRIX":1}
];

var dataOver = [
    { "VOL":"armada", "DEPART":2, "DUREE":6, "PRIX":10 },
    { "VOL":"mailman", "DEPART":7, "DUREE":6, "PRIX":23 },
    { "VOL":"flea", "DEPART":13, "DUREE":6, "PRIX":4 },
    { "VOL":"beehive", "DEPART":11, "DUREE":9, "PRIX":15 }
];

var data3 = [
    { "VOL":"aggressive-scallop-39", "DEPART":3, "DUREE":10, "PRIX":25 },
    { "VOL":"glamorous-armada-16", "DEPART":2, "DUREE":4, "PRIX":10 },
    { "VOL":"inexpensive-vein-64", "DEPART":0, "DUREE":3, "PRIX":1 },
    { "VOL":"fragile-mule-42", "DEPART":2, "DUREE":10, "PRIX":6 },
    { "VOL":"scary-stapler-21", "DEPART":4, "DUREE":12, "PRIX":5 },
    { "VOL":"depressed-playpen-68", "DEPART":7, "DUREE":4, "PRIX":1 },
    { "VOL":"busy-mailman-46", "DEPART":7, "DUREE":6, "PRIX":23 },
    { "VOL":"terrible-optometry-24", "DEPART":7, "DUREE":8, "PRIX":3 },
    { "VOL":"great-tailwind-12", "DEPART":6, "DUREE":10, "PRIX":8 },
    { "VOL":"pleasant-percolator-62", "DEPART":8, "DUREE":3, "PRIX":1 },
    { "VOL":"nice-flea-3", "DEPART":13, "DUREE":6, "PRIX":4 },
    { "VOL":"jolly-photocopier-16", "DEPART":11, "DUREE":6, "PRIX":22 },
    { "VOL":"filthy-snooper-15", "DEPART":12, "DUREE":9, "PRIX":7 },
    { "VOL":"nice-beehive-86", "DEPART":11, "DUREE":9, "PRIX":15 },
    { "VOL":"elated-mermaid-11", "DEPART":10, "DUREE":16, "PRIX":7 }
];

var data4 = [
    { "VOL":"flat-vegetarian-72", "DEPART":0, "DUREE":6, "PRIX":29 },
    { "VOL":"upset-leprechaun-36", "DEPART":1, "DUREE":10, "PRIX":6 },
    { "VOL":"helpless-slang-30", "DEPART":1, "DUREE":2, "PRIX":7 },
    { "VOL":"gleaming-optometry-69", "DEPART":4, "DUREE":1, "PRIX":15 },
    { "VOL":"calm-twill-61", "DEPART":2, "DUREE":10, "PRIX":7 },
    { "VOL":"exuberant-tin-51", "DEPART":7, "DUREE":2, "PRIX":28 },
    { "VOL":"creepy-guerilla-40", "DEPART":8, "DUREE":10, "PRIX":18 },
    { "VOL":"unsightly-condor-59", "DEPART":8, "DUREE":10, "PRIX":6 },
    { "VOL":"fragile-bandana-18", "DEPART":9, "DUREE":4, "PRIX":10 },
    { "VOL":"large-alcohol-28", "DEPART":8, "DUREE":18, "PRIX":5 },
    { "VOL":"big-shoestring-24", "DEPART":13, "DUREE":3, "PRIX":18 },
    { "VOL":"super-vat-4", "DEPART":12, "DUREE":6, "PRIX":13 },
    { "VOL":"deafening-soccer-68", "DEPART":11, "DUREE":2, "PRIX":8 },
    { "VOL":"foolish-pedestrian-60", "DEPART":10, "DUREE":7, "PRIX":15 },
    { "VOL":"stormy-helicopter-48", "DEPART":11, "DUREE":19, "PRIX":4 },
    { "VOL":"cloudy-tigress-54", "DEPART":19, "DUREE":4, "PRIX":25 },
    { "VOL":"blue-eyed-movement-71", "DEPART":18, "DUREE":1, "PRIX":7 },
    { "VOL":"adventurous-nursery-21", "DEPART":17, "DUREE":3, "PRIX":8 },
    { "VOL":"precious-recipe-48", "DEPART":16, "DUREE":2, "PRIX":12 },
    { "VOL":"cute-prince-8", "DEPART":15, "DUREE":20, "PRIX":1 }
];

var data5 = [
    { "VOL":"poor-gypsy-37", "DEPART":4, "DUREE":7, "PRIX":21 },
    { "VOL":"muddy-grapevine-46", "DEPART":0, "DUREE":1, "PRIX":17 },
    { "VOL":"wide-eyed-chalk-79", "DEPART":2, "DUREE":6, "PRIX":3 },
    { "VOL":"disgusted-blackhead-11", "DEPART":1, "DUREE":7, "PRIX":12 },
    { "VOL":"annoying-maggot-50", "DEPART":1, "DUREE":6, "PRIX":6 },
    { "VOL":"soft-cactus-70", "DEPART":8, "DUREE":4, "PRIX":20 },
    { "VOL":"skinny-llama-2", "DEPART":6, "DUREE":9, "PRIX":7 },
    { "VOL":"victorious-traveller-53", "DEPART":7, "DUREE":5, "PRIX":6 },
    { "VOL":"rapid-buttermilk-85", "DEPART":6, "DUREE":4, "PRIX":7 },
    { "VOL":"nice-swatch-26", "DEPART":9, "DUREE":12, "PRIX":7 },
    { "VOL":"helpful-ammonia-48", "DEPART":13, "DUREE":4, "PRIX":22 },
    { "VOL":"crazy-pea-90", "DEPART":11, "DUREE":5, "PRIX":13 },
    { "VOL":"courageous-ration-13", "DEPART":11, "DUREE":10, "PRIX":3 },
    { "VOL":"moaning-tiling-89", "DEPART":10, "DUREE":1, "PRIX":8 },
    { "VOL":"squealing-scapula-77", "DEPART":12, "DUREE":10, "PRIX":3 },
    { "VOL":"mammoth-source-2", "DEPART":15, "DUREE":9, "PRIX":20 },
    { "VOL":"wide-schoolboy-4", "DEPART":16, "DUREE":6, "PRIX":15 },
    { "VOL":"whispering-pancake-27", "DEPART":15, "DUREE":10, "PRIX":7 },
    { "VOL":"grotesque-treasurer-60", "DEPART":19, "DUREE":9, "PRIX":7 },
    { "VOL":"frightened-utensil-39", "DEPART":17, "DUREE":2, "PRIX":4 },
    { "VOL":"short-pensioner-32", "DEPART":20, "DUREE":4, "PRIX":27 },
    { "VOL":"broad-water-41", "DEPART":22, "DUREE":1, "PRIX":8 },
    { "VOL":"tame-pollywog-24", "DEPART":20, "DUREE":5, "PRIX":5 },
    { "VOL":"skinny-colon-33", "DEPART":20, "DUREE":8, "PRIX":9 },
    { "VOL":"teeny-mouser-99", "DEPART":23, "DUREE":3, "PRIX":4 }
];

describe('planning', function () {
    // Génération d'un gros paquet de vols =)
    var flights = [];
    before(function () {
        // Génération des vols
        for (var i = 0; i < 500000; i++) {
            var f = {
                "VOL":"flight-" + i,
                "DEPART":Math.floor((Math.random() * 24) + 1),
                "DUREE":Math.floor((Math.random() * 20) + 1),
                "PRIX":Math.floor((Math.random() * 100) + 1)
            };
            flights.push(f);
        }
        console.log(flights.length + " vols générés! =)");
    });

    describe('#optimize', function () {

        it('should return gain and path', function () {
                var res = planning.optimize(data);
                should.exist(res);
                should.exist(res.gain);
                should.exist(res.path);
            }
        );

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
            var res = planning.optimize(data);
            should.exist(res);
            res.gain.should.eql(18);
            res.path.should.eql(["MONAD42", "LEGACY01"]);
        });

        it('should return complex path', function () {
            var res = planning.optimize(data2);
            should.exist(res);
            res.gain.should.eql(12);
            res.path.should.eql(["AF1", "AF3", "AF2"]);
        });

        it('should treat overriding flights', function () {
            var res = planning.optimize(dataOver);
            should.exist(res);
            res.gain.should.eql(27);
            res.path.should.eql(['mailman', 'flea' ]);
        });


        it('should return path the good way', function () {
            var res = planning.optimize(data2);
            should.exist(res);
            res.gain.should.eql(12);
            res.path.should.eql(["AF1", "AF3", "AF2"]);
            res.path.should.not.eql(["AF1", "AF2", "AF3"]);
        });

        it('should handle 15 flights', function () {
            var res = planning.optimize(data3);
            res.gain.should.eql(37);
            res.path.should.eql(['glamorous-armada-16', 'busy-mailman-46', 'nice-flea-3']);
        });

        it('should handle 20 flights', function () {
            var res = planning.optimize(data4);
            should.exist(res);
            res.gain.should.eql(129);
            res.path.should.eql(['flat-vegetarian-72', 'exuberant-tin-51', 'fragile-bandana-18', 'big-shoestring-24', 'precious-recipe-48', 'blue-eyed-movement-71', 'cloudy-tigress-54']);
        });

        it('should handle 25 flights', function () {
            var res = planning.optimize(data5);
            res.gain.should.eql(102);
            res.path.should.eql(['muddy-grapevine-46', 'disgusted-blackhead-11', 'soft-cactus-70', 'helpful-ammonia-48', 'frightened-utensil-39', 'short-pensioner-32']);
        });

        it('should handle a lot of flights', function () {
                var start = Date.now();
                var res = planning.optimize(flights);
                should.exist(res);

                console.log('\nTraitement de 50000 vols : ' + (Date.now() - start) + 'ms');
                console.log(res);
            }
        );
    });
});
