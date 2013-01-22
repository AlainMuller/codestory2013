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
    // Si pas de paramètres, fin = NaN, on le force à undefined
    this.fin = (depart && duree)?depart + duree:undefined;
    this.duree = duree;
    this.prix = prix;
};
// Attributs et méthodes de la Classe Flight
Flight.prototype = {
    nom: "default_value",
    depart: 0,
    duree: 0,
    fin: 0,
    prix: 0,
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
        this.ptix = prix;
    }
};

// node.js module export
module.exports = Flight;
