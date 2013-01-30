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

    /* 1 - Transcrire les vols (déterminer l'heure d'arrivée avec depart + duree) */
    var vols = [];
    for (var i = 0; i < inputArray.length; i++) {
        vols.push(flight.create(inputArray[i]));
    }

    /* 1bis - déterminer le vol le plus long pour limiter la recherche sur les vols précédents */
    var volLePlusLong = vols.sort(longerFlightFirst)[0];

    /* 2 - Grouper les vols par heure d'arrivée */
    var mapVolsParHeure = {};
    for (var j = 0; j < vols.length; j++) {
        mapVolsParHeure[vols[j].arrivee] ? mapVolsParHeure[vols[j].arrivee].push(vols[j]) : mapVolsParHeure[vols[j].arrivee] = new Array(vols[j]);
    }

    var meilleurCoupleGainVolParHeure = {};
    // Objet permettant de mapper un Vol à un vol optimal précédent
    var chainageVols = {};
    var meilleurCoupleGainVol = {gain:0};

    /* 3 - Parcourir les vols par heure: */
    for (var heure in mapVolsParHeure) {
        var meilleureVolPrecedentePourCetteHeure;
        var meilleurCoupleGainVolPourCetteHeure = {gain:0, vol:{}};

        /* 4 - Pour chaque vol, ... */
        for (var numeroVol in mapVolsParHeure[heure]) {
            var vol = mapVolsParHeure[heure][numeroVol];

            var heureMinDeDepart = vol.depart - volLePlusLong.duree;

            /*4 - ... trouver parmi les heures précédentes* le vol à conserver pour avoir le meilleur gain */
            for (var heurePrecedente = heureMinDeDepart >= 0 ? heureMinDeDepart : 0; heurePrecedente <= vol.depart; heurePrecedente++) {
                var couplePrecedent = meilleurCoupleGainVolParHeure[heurePrecedente] != undefined ? meilleurCoupleGainVolParHeure[heurePrecedente] : {gain:0};
                var gainCumule = couplePrecedent.gain + vol.prix;

                if (gainCumule > meilleurCoupleGainVolPourCetteHeure.gain) {
                    meilleurCoupleGainVolPourCetteHeure = {gain:gainCumule, vol:vol};
                    meilleureVolPrecedentePourCetteHeure = couplePrecedent.vol;
                }
            }
        }
        // Mise à jour du vol le plus intéressant de chaque heure
        meilleurCoupleGainVolParHeure[heure] = meilleurCoupleGainVolPourCetteHeure;

        // Mise à jour du vol le plus intéressant global
        if (meilleurCoupleGainVolPourCetteHeure.gain > meilleurCoupleGainVol.gain) {
            meilleurCoupleGainVol = meilleurCoupleGainVolPourCetteHeure;
            chainageVols[meilleurCoupleGainVolPourCetteHeure.vol.nom] = meilleureVolPrecedentePourCetteHeure;
        }
    }

    // Construction du résultat : on a déjà le meilleur gain, il faut reconstruire le path en remontant les vols par chainage inverse.(Dijkstra Stayle! ^_^)
    var path = [];
    var nomVol = meilleurCoupleGainVol.vol.nom;
    while (nomVol != undefined) {
        // Attention à l'ordre : on part du dernier vol pour aller vers le premier ;)
        path.unshift(nomVol);
        nomVol = chainageVols[nomVol] != undefined ? chainageVols[nomVol].nom : undefined;
    }

    return {gain:meilleurCoupleGainVol.gain, path:path};
};

exports.optimize = optimize;