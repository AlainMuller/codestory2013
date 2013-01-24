/**
 * Created with JetBrains WebStorm.
 * User: Alain Muller
 * Date: 24/01/13
 * Time: 13:18
 * Module de traitement des demandes de planning de l'exercice jajascript
 *  => méthodes ECMAScript sur les Array en javascript : http://book.mixu.net/ch5.html
 *
 * ALGORITHME :
 *  1 - Calculer toutes les combinaisons possibles.
 *  2 - Retirer les combinaisons invalides
 *  3 - Retourner de toutes les combinaisons valides la plus rentable.
 */

var flight = require(__dirname + '/../lib/flight');

// Fonction de comparaison personnalisée permettant de trier les vols par date de départ et prix en cas d'égalité
var compareFlights = function (flight1, flight2) {
    if (flight1.depart == flight2.depart)
        return flight2.prix - flight1.prix;
    return flight1.depart - flight2.depart;
};

// TODO : Refactoring sur ce code à prévoir : trop lourd!!!!
// TODO : Mauvaise récursion, cf. http://utahjs.com/2010/09/16/nodejs-events-and-recursion-readdir/
// Fonction retournant toutes les combinaisons possibles des vols du tableau passé en paramètre
var combinaisons = function (array) {
    var fn = function (n, src, got, all) {
        if (n == 0) {
            if (got.length > 0) {
                all[all.length] = got;
            }
            return;
        }
        current = src[n];
        for (var j = 0; j < src.length; j++) {
            fn(n - 1, src.slice(j + 1), got.concat(src[j]), all);
        }
        return;
    };
    var all = [];
    var current = {};
    for (var i = 0; i < array.length; i++) {
        fn(i, array, [], all);
    }
    all.push(array);
    return all;
};


// Fonction de filtrage : retourne true si les vols de chaque combinaison ne se chevauchent pas entre eux
var filterGoodOnes = function (array) {
    // La combinaison est valide si chaque vol n'en chevauche aucun autre
    for (var i = 0; i < array.length; i++) {
        var vol1 = array[i];
        for (var j = 0; j < array.length; j++) {
            var vol2 = array[j];
            if (vol1.overrides(vol2) && vol1 != vol2) {
                return false;
            }
        }
    }
    return true;
};

// Fonction retournant le planning correspondant au meilleur gain pour l'ensemble des combinaisons valides
var getBestGain = function (array) {
    var plannings = [];

    // On construit le planning de chaque combinaison
    for (var i = 0; i < array.length; i++) {
        var combinaison = array[i];
        var gain = 0;
        var path = [];
        for (var j = 0; j < combinaison.length; j++) {
            gain += combinaison[j].prix;
            path.push(combinaison[j].nom);
        }
        plannings.push({gain:gain, path:path});
    }

    var maxGain = 0;
    var index = 0;
    // On détermine le planning ayant le meilleur gain
    for (var i = 0; i < plannings.length; i++) {
        if (plannings[i].gain > maxGain) {
            index = i;
            maxGain = plannings[i].gain
        }
    }

    // On retourne ce dernier
    return plannings[index];
};

// Fonction principale du module : calcule pour un ensemble de vols donné le planning le plus rentable
var optimize = function (inputArray) {
    // Liste des vols (transcodage)
    var vols = [];

    var start = Date.now();

    // Transcodage des vols
    for (var i = 0; i < inputArray.length; i++) {
        // On récupère chaque élement du tableau
        // On construit l'objet Flight correspondant
        var currentFlight = flight.create(inputArray[i]);
        vols.push(currentFlight);
    }

    console.log("> transcode : " + eval(Date.now() - start) + "ms");

    // Tri de la liste des vols
    vols.sort(compareFlights);

    console.log("> sort : " + eval(Date.now() - start) + "ms");

    // 1 - Calculer l'ensemble des combinaisons possibles
    var allCombis = combinaisons(vols);

    console.log("> allCombis : " + eval(Date.now() - start) + "ms");
    // 2 - Retirer les combinaisons invalides
    var validCombis = allCombis.filter(filterGoodOnes);

    console.log("> filter : " + eval(Date.now() - start) + "ms");

    // 3 - Retourner de toutes les combinaisons valides la plus rentable
    return getBestGain(validCombis);
};

exports.optimize = optimize;
