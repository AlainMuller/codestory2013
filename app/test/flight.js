/**
 * Created with JetBrains WebStorm.
 * User: Alain Muller
 * Date: 22/01/13
 * Time: 18:32
 * Module de test du module flight
 */

var should = require('should');
var flight = require(__dirname + '/../lib/flight');

describe('Flight', function () {
    var flightMONADE42 = new flight.Flight("MONADE42", 0, 5, 10);
    var flightLEGACY01 = new flight.Flight("LEGACY01", 5, 9, 8);
    var flightMETA18 = new flight.Flight("META18", 3, 7, 14);
    var flightYAGNI17 = new flight.Flight("YAGNI17", 5, 9, 7);

    describe('#constructor', function () {
        it('should set attributes', function () {
            should.exist(flightMONADE42);
            flightMONADE42.nom.should.eql("MONADE42");
            flightMONADE42.depart.should.eql(0);
            flightMONADE42.duree.should.eql(5);
            flightMONADE42.arrivee.should.eql(5);
            flightMONADE42.prix.should.eql(10);
        });
        it('should take 4 parameters', function () {
            should.not.exist(new flight.Flight().nom);
            should.not.exist(new flight.Flight().depart);
            should.not.exist(new flight.Flight().duree);
            //should.not.exist(new flight.Flight().arrivee);
            should.not.exist(new flight.Flight().prix);
        });
    });

    describe('#gain', function(){
        it('should return true if better gain', function() {
            flightMONADE42.cmpGain(flightMONADE42).should.eql(true);
            flightMONADE42.cmpGain(flightLEGACY01).should.eql(true);
            flightLEGACY01.cmpGain(flightMONADE42).should.eql(false);
        });
    });

    describe('#override', function(){
        it('should return true if override in schedule', function() {
            flightMONADE42.overrides(flightMONADE42).should.eql(true);
            flightMONADE42.overrides(flightLEGACY01).should.eql(false);
            flightLEGACY01.overrides(flightMETA18).should.eql(true);
        });
    });
});
