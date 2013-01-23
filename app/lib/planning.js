/**
 * Created with JetBrains WebStorm.
 * User: Alain Muller
 * Date: 23/01/13
 * Time: 13:18
 * Module de traitement des demandes de planning de l'exercice jajascript
 */

var flight = require(__dirname + '/../lib/flight');

/*
 ALGORITHME :
 Pour chaque vol de la liste, boucler sur les combinaisons possibles (les vols ne doivent pas s'entrecouper)
 et stocker le résultat dans un tableau.
 Finalement, retourner (gain total et noms des vols dans l'ordre) la combinaison la plus avantageuse
 */


// Optimisation d'un planning de réservation
function optimize(inputArray) {

    var result;

    var flights = [];
    var possibilities = [];

    // Transcodage des vols
    for (var i = 0; i < inputArray.length; i++) {
        // On récupère chaque élement du tableau
        var objetJSON = inputArray[i];
        // On construit l'objet Flight correspondant
        var currentFlight = flight.create(objetJSON);
        flights.push(currentFlight);
    }

    // TODO : cette solution n'est pas la bonne car avec deux boucles, on ne traite que deux vols max!

    // Calcul des combinaisons valides
    for (var i = 0; i < flights.length; i++) {
        var f = flights[i];
        // Cas d'un seul vol
        possibilities.push({gain:f.prix, path:[f.nom]});

        for (var j = 0; j < flights.length; j++) {
            var f2 = flights[j];
            if (!f2.overrides(f) && f2 != f) {
                possibilities.push({gain:f.prix + f2.prix, path:[f.nom, f2.nom]});
            }
        }
    }

//    console.log(JSON.stringify(possibilities));

    // Détermination de la combinaison la plus rentable
    var indice = 0;
    var maxGain = 0;
    for (var i = 0; i < possibilities.length; i++) {
        if (possibilities[i].gain > maxGain) {
//            console.log("Meilleur gain : " + i + " - " + JSON.stringify(possibilities[i]));
            indice = i;
            maxGain = possibilities[i].gain;
        }
    }
    result = possibilities[indice];

    return result;
}

exports.optimize = optimize;
