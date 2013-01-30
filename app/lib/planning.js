/**
 * Created with JetBrains WebStorm.
 * User: Alain Muller
 * Date: 29/01/13
 * Time: 21:41
 * Module d'optimisation des plannings de l'exercice jajascript
 *
 * ALGORITHME :
 *  1 - Transcrire les vols (déterminer l'heure d'arrivée avec depart + duree)
 *  2 - Grouper les vols par heure d'arrivée
 *  3 - Parcourir les vols par heure:
 *      4 - Pour chaque vol, trouver parmi les heures précédentes* le vol à conserver pour avoir le meilleur gain
 *
 *  * 1bis - déterminer le vol le plus long pour limiter la recherche sur les vols précédents
 */

var util = require(__dirname + '/../lib/util');
var flight = require(__dirname + '/../lib/flight');

// Fonction de comparaison permettant de trier les vols par durée pour déterminer le vol le plus long
var longerFlightFirst = function (flight1, flight2) {
    return flight2.duree - flight1.duree;
};

// Fonction principale du module : calcule pour un ensemble de vols donné le planning le plus rentable
var optimize = function (inputArray) {
    var start = new Date().getTime();

    /* 1 - Transcrire les vols (déterminer l'heure d'arrivée avec depart + duree) */
    var vols = [];
    for (var i = 0; i < inputArray.length; i++) {
        vols.push(flight.create(inputArray[i]));
    }

    util.log("JSON Casting : " + (new Date().getTime() - start) + "ms");

    /* 1bis - déterminer le vol le plus long pour limiter la recherche sur les vols précédents */
    var volLePlusLong = vols.sort(longerFlightFirst)[0];

    util.log("Vol le plus long : " + JSON.stringify(volLePlusLong));

    start = new Date().getTime();

    /* 2 - Grouper les vols par heure d'arrivée */
    var mapVolsParHeure = {};
    for (var j = 0; j < vols.length; j++) {
        mapVolsParHeure[vols[j].arrivee] ? mapVolsParHeure[vols[j].arrivee].push(vols[j]) : mapVolsParHeure[vols[j].arrivee] = new Array(vols[j]);
    }

    console.log(mapVolsParHeure);

    util.log("Groupement par heure : " + (new Date().getTime() - start) + "ms");

    start = new Date().getTime();

    var planningOptimal = {gain:0};
    var planningOptimalParHeure = {};
    /* 3 - Parcourir les vols par heure: */
    for (var heure in mapVolsParHeure) {
        console.log(">> Heure : " + heure);
        // On identifie pour chaque heure, le vol optimal ainsi que le vol précédent
        var planningOptimalPourCetteHeure = {gain:0};

        // Filtrage des clés (heures) par rapport au reste du prototype d'Object
        if (mapVolsParHeure.hasOwnProperty(heure)) {
            // Parcours de toutes les vols de chaque heure
            for (var vol in mapVolsParHeure[heure]) {
                console.log("   > # Vol : " + vol);
                // On détermine l'heure minimale de départ par rapport à cette heure (cf. 1bis)
                var departMinimum = mapVolsParHeure[heure][vol].depart - volLePlusLong.duree;

                /* 4 - Pour chaque vol, trouver parmi les heures précédentes* le vol à conserver pour avoir le meilleur gain */
                // TODO : on peut avoir des heures négatives, tenir compte de l'heure minimale pour éviter de boucler sur des données inexistantes
                // TODO : <= ou < ???
                for (var h = departMinimum; h <= mapVolsParHeure[heure][vol].depart; h++) {

                    console.log("    > heure précedente : " + h);

                    // On boucle sur tous les vols précédents possibles pour déterminer celui qui aura le meilleur gain cumulé
                    var tmpPlanning;
                    if (mapVolsParHeure.hasOwnProperty(h)) {
                        // On récupère le vol le plus intéressant pour l'heure précédente
                        if (planningOptimalParHeure.hasOwnProperty(h)) {
                            // TODO : init par défaut?
                            tmpPlanning = planningOptimalParHeure[h];
                            console.log("tmpPlanning : " + JSON.stringify(tmpPlanning));
                        }

                        // TODO : attention au ternaire, ne marche peut être pas!
                        var gainCumule = (tmpPlanning ? tmpPlanning.gain : 0) + mapVolsParHeure[heure][vol].prix;

                        console.log("    > gain cumulé : " + gainCumule);

                        if (gainCumule > planningOptimalPourCetteHeure.gain) {
                            planningOptimalPourCetteHeure.gain = gainCumule;
                            if (planningOptimalPourCetteHeure.hasOwnProperty(vol))
                            {
                             planningOptimalPourCetteHeure.path.concat(mapVolsParHeure[heure][vol].nom);
                            }
                            else
                            {
                                planningOptimalPourCetteHeure.path = mapVolsParHeure[heure][vol].nom;
                            }
                            console.log("    > planningOptimalPourCetteHeure : " + JSON.stringify(planningOptimalPourCetteHeure));
                        }
                    }
                }

            }
            // Mise à jour du vol optimal par heure
            planningOptimalParHeure[heure] = planningOptimalPourCetteHeure;

            // Mise à jour du meilleur planning global
            if (planningOptimalPourCetteHeure.gain > planningOptimal.gain) {
                planningOptimal = planningOptimalPourCetteHeure;
            }
        }

    }
    console.log(planningOptimalParHeure);
    console.log(planningOptimal);

    util.log("Détermination du meilleur planning : " + (new Date().getTime() - start) + "ms");

    return null;
};
/*
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
 */
exports.optimize = optimize;