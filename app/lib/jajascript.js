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

var util = require(__dirname + '/../lib/util');
var flight = require(__dirname + '/../lib/flight');
var planning = require(__dirname + '/../lib/planning');

// Fonction de comparaison personnalisée permettant de trier les vols par date de départ et date d'arrivée en cas d'égalité
var compareFlights = function (flight1, flight2) {
    if (flight1.depart == flight2.depart)
        return flight2.arrivee - flight1.arrivee;
    return flight1.depart - flight2.depart;
};

// Fonction de filtrage : retourne true si le planning a un meilleur gain
//  que le planning de référence, ou s'il est plus court que ce dernier
//  et que la durée du planning de référence empiète sur le départ suivant
var filterGoodOnes = function (reference, departSuivant) {
    return function (planning) {
        //return (planning.gain >= reference.gain || (reference.arrivee > planning.arrivee || reference.arrivee > departSuivant))
        if (planning.gain < reference.gain && (planning.end >= reference.end || reference.end <= departSuivant)) {
            return false;
        }
        return true;
    }
};


// Fonction principale du module : calcule pour un ensemble de vols donné le planning le plus rentable
var optimize = function (inputArray) {

    var plannings = [];

    var start = Date.now();

    // Transcodage des vols
    var vols = [];
    for (var index = 0; index < inputArray.length; index++) {
        // On construit l'objet Flight correspondant
        vols.push(flight.create(inputArray[index]));
    }

    // Tri de la liste des vols
    vols.sort(compareFlights);

    // Initialisation : on construit un planning de base depuis le premier vol de la liste
    plannings.push(new planning.Planning().addFlight(vols.shift()));
    // On stocke ce dernier comme planning de référence pour le calcul du planning optimal
    var reference = plannings[0];
    var meilleurPlanning, planningPossible;

    // Parcours de la liste des vols
    for (var i = 0; i < vols.length; i++) {
        // On récupère le vol courant
        var vol = vols[i];
        // On récupère le vol suivant s'il existe
        var volSuivant = vols[i + 1];

        // On va tester si le vol suivant est plus intéressant (même départ, durée plus courte (cf. fonction de tri de la liste),
        //  et surtout prix plus avantageux) pour zapper le vol courant (moins intéressant pour le coup!)
        if (volSuivant && volSuivant.depart == vol.depart && volSuivant.prix > vol.prix) {
            // On passe directement au suivant!
//            console.log(JSON.stringify(volSuivant) + " plus intéressant que " + JSON.stringify(vol));
        }
        else {
            // Epuration de la liste pour optimiser les temps de traitement : On va filtrer la liste des plannings pour
            //  ne conserver que les plus avantageux par rapport au vol courant
            plannings = plannings.filter(filterGoodOnes(reference, vol.depart));

            // On détermine le meilleur planning pour le vol courant. Si ce dernier n'est pas compatible, meilleurPlanning est vide!
            meilleurPlanning = new planning.Planning().addFlight(vol);

            // On boucle sur les plannings (/!\ le contenu évolue à chaque boucle!)
            for (var p in plannings) {

                // On va tester les combinaisons possibles sur le nouveau planning (s'il est valide)
                planningPossible = plannings[p].addFlight(vol);

                if (planningPossible.gain > meilleurPlanning.gain) {
                    // Mise à jour du meilleur planning
                    meilleurPlanning = planningPossible;
                }

                // Comparaison du meilleur planning pour le vol courant au planning de référence (planning global)
                if (meilleurPlanning.gain > reference.gain) {
                    // Mise à jour du planning de référence
                    reference = meilleurPlanning;
                    // Mise à jour de la liste des plannings avec le nouveau planning de référence
                    plannings.push(meilleurPlanning);
                }
                else if (meilleurPlanning.arrivee < reference.arrivee) {
                    // Le planning est valide, bien que (pour l'instant) non préférenciable, on l'ajoute donc à la liste
                    plannings.push(meilleurPlanning)
                }
            }
        }
    }

    // Le planning de référence est le meilleur planning!
    return {'gain':reference.gain, 'path':reference.path};
};

exports.optimize = optimize;
