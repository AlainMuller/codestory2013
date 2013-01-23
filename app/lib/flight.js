/**
 * Created with JetBrains WebStorm.
 * User: Alain Muller
 * Date: 22/01/13
 * Time: 13:40
 * Module représentant un objet Flight
 */

// Constructeur => Appel : var flight = new Flight("MONADE42", 0, 5, 10);
var Flight = function(nom, depart, duree, prix) {
    this.nom = nom;
    this.depart = depart;
    this.fin = depart + duree;
    this.duree = duree;
    this.prix = prix;
};

// Factory permettant d'instancier un Flight depuis un objet JSON {VOL, DEPART, DUREE, PRIX}
var createFromJSON = function(obj) {
    return new Flight(obj.VOL, obj.DEPART, obj.DUREE, obj.PRIX);
};


// Attributs et méthodes de la Classe Flight
Flight.prototype = {
    // Attributes
    nom: "default_value",
    depart: 0,
    duree: 0,
    fin: 0,
    prix: 0,

    // Setters
    setNom: function(nom) {
        this.nom = nom;
    },
    setDepart: function(depart) {
        this.depart = depart;
    },
    setDuree: function(duree) {
        this.duree = duree;
        this.fin = this.depart + duree;
    },
    setPrix: function(prix) {
        this.prix = prix;
    },
    // Computing
    cmpGain: function(flight) {
        return this.prix >= flight.prix;
    },
    overrides: function(flight) {
        return (((flight.depart >= this.depart) && flight.depart < this.fin)
                || ((flight.fin > this.depart) && (flight.fin <= this.fin)))
    }

};

// node.js module export
exports.Flight = Flight;
exports.create = createFromJSON;
