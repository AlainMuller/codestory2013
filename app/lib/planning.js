/**
 * Created with JetBrains WebStorm.
 * User: Alain Muller
 * Date: 28/01/13
 * Time: 16:40
 * Module représentant un objet Planning
 */

// Constructeur => Appel : var planning = new Planning(["MONADE42", "LEGACY01"], 18, 14);
var Planning = function (path, gain, fin) {
    this.path = path || [];
    this.gain = gain || 0;
    this.fin = fin || 0;
};

// Attributs et méthodes de la Classe Flight
Planning.prototype.addFlight = function (flight) {
    var res = [];
    // Si un vol est compatible (postérieur) avec le planning actuel, on l'intègre, sinon, ni le vol ni le planning ne sont valides
    if (flight.depart >= this.fin)
        res = new Planning(this.path.concat(flight.nom), this.gain + flight.prix, flight.fin);

    return res;
};

exports.Planning = Planning;
