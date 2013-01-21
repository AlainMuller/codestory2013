/**
 * Created with JetBrains WebStorm.
 * User: Alain Muller
 * Date: 21/01/13
 * Time: 13:20
 * Définition de l'aiguillage des requêtes perso
 */

var util = require(__dirname + "/../lib/util");

// Liste de fichiers autorisés
exports.allowedFiles = {
    "/queries":util.queries,
    "/log":util.logFile,
    "/post":util.dataFile
};
