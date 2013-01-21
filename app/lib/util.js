/**
 * Created with JetBrains WebStorm.
 * User: Alain Muller
 * Date: 21/01/13
 * Time: 11:31
 * Module utilitaire
 */

var fs = require('fs');

// Définition des chemins des fichiers
var accessLog = __dirname + "/../res/access.log";
var postData = __dirname + "/../res/postData.log";
var queries = __dirname + "/../res/queries.json";
var favicon = __dirname + "/../res/favicon.ico";

// Fonction permettant d'avoir des logs datés
function log(message) {
    var now = new Date();
    console.log(now.toISOString() + " - " + message);
}

// Fonction permettant d'enregistrer une trace de chaque requete dans un fichier de log
function logRequestToFile(request) {

    var now = new Date();
    var dateAndTime = now.toISOString();

    // Ouverture du fichier en mode append
    stream = fs.createWriteStream(accessLog, {
        'flags':'a+',
        'encoding':'utf8',
        'mode':0644
    });

    stream.write(dateAndTime + " | ", 'utf8');
    stream.write(request.connection.remoteAddress + " | ", 'utf8');
    stream.write(request.method + " | ", 'utf8');
    stream.write(request.url + "\n", 'utf8');
    stream.end();
}

// Fonction permettant d'enregistrer les données d'une requête POST dans un fichier le log
function logPostDataToFile(request, data) {

    var now = new Date();
    var dateAndTime = now.toISOString();

    // Ouverture du fichier en mode append
    stream = fs.createWriteStream(postData, {
        'flags':'a+',
        'encoding':'utf8',
        'mode':0644
    });

    stream.write(dateAndTime + " | ", 'utf8');
    stream.write(request.connection.remoteAddress + " | ", 'utf8');
    stream.write(request.method + " | ", 'utf8');
    stream.write(request.url + "\n", 'utf8');
    stream.write("\t" + data + "\n", 'utf8');
    stream.end();
}

// Fonction utilitaire permettant de déterminer si une variable n'est ni indéfinie ni vide
function notEmpty(val) {
    return val && val != '';
}

exports.log = log;
exports.logReq = logRequestToFile;
exports.logData = logPostDataToFile;
exports.notEmpty = notEmpty;

exports.logFile = accessLog;
exports.dataFile = postData;
exports.queries = queries;
exports.favicon = favicon;