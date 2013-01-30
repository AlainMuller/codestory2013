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

//    util.log("Vol le plus long : " + JSON.stringify(volLePlusLong));

    start = new Date().getTime();

    /* 2 - Grouper les vols par heure d'arrivée */
    var mapVolsParHeure = {};
    for (var j = 0; j < vols.length; j++) {
        mapVolsParHeure[vols[j].arrivee] ? mapVolsParHeure[vols[j].arrivee].push(vols[j]) : mapVolsParHeure[vols[j].arrivee] = new Array(vols[j]);
    }

//    console.log(mapVolsParHeure);

    util.log("Groupement par heure : " + (new Date().getTime() - start) + "ms");

    start = new Date().getTime();


    var planningOptimalParHeure = {};
    /* 3 - Parcourir les vols par heure: */
    for (var heure in mapVolsParHeure) {
        console.log(">> Heure : " + heure);
        // On identifie pour chaque heure, le vol optimal ainsi que le vol précédent
        var planningOptimalPourCetteHeure = {gain:0, path:[]};

        // Filtrage des clés (heures) par rapport au reste du prototype d'Object
//        if (mapVolsParHeure.hasOwnProperty(heure)) {
        // Parcours de toutes les vols de chaque heure
        for (var indexVol in mapVolsParHeure[heure]) {
            console.log("   > # Vol : " + indexVol);
            // On détermine l'heure minimale de départ par rapport à cette heure (cf. 1bis)
            const vol = mapVolsParHeure[heure][indexVol];
            var departMinimum = Math.max(0, vol.depart - volLePlusLong.duree);

            /* 4 - Pour chaque vol, trouver parmi les heures précédentes* le vol à conserver pour avoir le meilleur gain */
            for (var heurePrecedente = departMinimum; heurePrecedente <= vol.depart; heurePrecedente++) {

                // On boucle sur tous les vols précédents possibles pour déterminer celui qui aura le meilleur gain cumulé
                var meilleurPlanningHeurePrecedente;
                if (planningOptimalParHeure[heurePrecedente] != undefined) {
                    meilleurPlanningHeurePrecedente = planningOptimalParHeure[heurePrecedente];
                } else {
                    meilleurPlanningHeurePrecedente = {gain:0, path:[]};
                }

                const gainCumule = meilleurPlanningHeurePrecedente.gain + vol.prix;
                const pathCumule = meilleurPlanningHeurePrecedente.path.concat(vol);

                console.log("    > " + heure + " / " + vol.nom + " > gain cumulé : " + gainCumule + " -  Path : " + JSON.stringify(pathCumule));

                if (gainCumule > planningOptimalPourCetteHeure.gain) {
                    planningOptimalPourCetteHeure = {gain: gainCumule, path: pathCumule}
                    console.log("    > planningOptimalPourCetteHeure : " + JSON.stringify(planningOptimalPourCetteHeure));
                }

            }

        }
        // Mise à jour du vol optimal par heure
        planningOptimalParHeure[heure] = planningOptimalPourCetteHeure;
    }


    console.log("\n\n Heures : \n -------- \n");
    var planningOptimal = {gain:0, path:[]};
    for (var heure in planningOptimalParHeure)
    {
        console.log(heure);
        const optimalParHeure = planningOptimalParHeure[heure];
        console.log(optimalParHeure);
        if(optimalParHeure.gain > planningOptimal.gain) {
            planningOptimal = optimalParHeure;
        }
    }

    console.log("\n\n RESULTAT : \n ---------- \n");
    console.log(planningOptimal);

    util.log("Détermination du meilleur planning : " + (new Date().getTime() - start) + "ms");

    var finalPath = [];
    for (var index in planningOptimal.path) {
        finalPath.push(planningOptimal.path[index].nom);
    }

    return {gain:planningOptimal.gain, path:finalPath};
};

exports.optimize = optimize;