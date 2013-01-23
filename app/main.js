/**
 * Created with JetBrains WebStorm.
 * User: Alain Muller
 * Date: 21/01/13
 * Time: 11:31
 * Module principal de l'application
 */

// Chargement des modules généraux
var http = require("http");
var fs = require("fs");
var url = require("url");
// Chargement des modules internes
var change = require(__dirname + "/lib/change");
var util = require(__dirname + "/lib/util");
var routes = require(__dirname + "/lib/routes.js");
var calc = require(__dirname + "/lib/calcul.js");
var planning = require(__dirname + "/lib/planning");

// Chargement de l'objet JSON (association requête(URL) / réponse au format JSON)
var queries = require(__dirname + "/res/queries.json");

// Définition du port d'écoute du serveur
var port = process.env.PORT || 1337;

// Messages d'erreur
var NOT_FOUND = "Accès Refusé!",
    MAUVAIS_CALCUL = "Expression invalide",
    MAUVAIS_FORMAT = "Mauvais format";

// Little bit of eye candy! ;)
var favicon;

// Mise en place du serveur HTTP
var server = http.createServer(function (request, response) {

            util.log("Réception d'une requête : '" + request.url + "'");
            // On trace la requête dans un fichier de log
            util.logReq(request);

            // Analyse de l'URL
            var urlparts = url.parse(request.url);
            // Décodage du chemin de l'URL
            var params = urlparts.path.split("/");

            // Requête POST
            if (request.method == 'POST') {
                var body = '';
                request.on('data', function (data) {
                    body += data;
                });
                request.on('end', function () {
                    util.log("Requête POST : " + body);
                    // Sauvegarde des données de la requête POST dans un fichier de log
                    util.logData(request, body);

                    // TODO : stocker les données de l'énoncé au format MarkDown (le cas échéant) dans le fichier correspondant /res/enonceX.md

                    //
                    // Cas de l'énoncé 2 : jajascript (ex: /jajascript/optimize avec param `{"[ {VOL:"AF514", DEPART:0, DUREE:5, PRIX: 10} ]}`)
                    //

                    if ((params[1] == "jajascript") && (params[2] == "optimize")) {
                        util.log("Calcul du meilleur planning pour les vols : " + body);

                        var bestPlanning = planning.optimize(JSON.parse(body));

                        if (bestPlanning != undefined) {
                            util.log(" > Réponse : " + JSON.stringify(bestPlanning));
                            response.writeHead(201, {"Content-Type":"text/plain;charset=utf-8"});
                            response.end(JSON.stringify(bestPlanning));
                        }
                        else {
                            // Ecriture de l'En-tête HTTP (404 : Status NOT FOUND)
                            response.writeHead(404, {"Content-Type":"text/plain;charset=utf-8"});
                            response.end(MAUVAIS_FORMAT);
                        }
                    }
                    else {
                        // Ecriture de l'En-tête HTTP (201 : Status CREATED)
                        response.writeHead(201, {"Content-Type":"text/plain;charset=utf-8"});
                        response.end("Data saved! ;)");
                    }
                });
            }
            // Requête GET
            else if (request.method == 'GET') {

                // Tellement marre de logguer les requêtes de favicon que j'en a fait une! =P
                if (request.url == "/favicon.ico") {
                    // On évite de recharger l'icône à chaque requête
                    if (favicon) {
                        response.writeHead(200, favicon.headers);
                        response.end(favicon.body);
                    } else {
                        fs.readFile(util.favicon, function (err, buf) {
                            if (err) return next(err);
                            favicon = {
                                headers:{
                                    'Content-Type':'image/x-icon', 'Content-Length':buf.length, 'Cache-Control':'public, max-age=86400'
                                },
                                body:buf
                            };
                            response.writeHead(200, favicon.headers);
                            response.end(favicon.body);
                        });
                    }
                }

                else {

                    //
                    // Cas des questions simples (ex : /?q=Est+ce+que+tu+reponds+toujours+oui(OUI/NON))
                    //

                    // Le contenu de la réponse à afficher (en fonction de la requête)
                    var message = queries[request.url];

                    // On a répondu à une question simple
                    if (message != undefined) {
                        util.log(" > Réponse : " + message);
                        // Ecriture de l'En-tête HTTP (200 : Status OK)
                        response.writeHead(200, {"Content-Type":"text/plain;charset=utf-8"});
                        response.end(message);
                    }

                    //
                    // Cas de l'énoncé 1 : Scalaskel (ex: /scalaskel/change/15)
                    //

                    else if ((params[1] == "scalaskel") && (params[2] == "change")) {
                        util.log("Calcul du change pour la valeur : " + params[3]);

                        response.writeHead(200, {"Content-Type":"text/plain;charset=utf-8"});
                        response.end(JSON.stringify(change.makeChange(params[3] ? params[3] : 0)));
                    }

                    //
                    // Cas d'un calcul bidon (ex : /?q=1+1)
                    //

                    else if (urlparts.query && urlparts.query.split("=")[0] == "q") {
                        var expression = urlparts.query.split("=")[1];
                        // Détermination du résultat si l'expression est bien une opération mathématique valide
                        var message = calc.calcExpr(expression);

                        if (message != undefined) {
                            util.log(" > Réponse : " + expression + " = " + message);
                            response.writeHead(200, {"Content-Type":"text/plain;charset=utf-8"});
                            response.end(message);
                        }
                        else {
                            // Ecriture de l'En-tête HTTP (404 : Status NOT FOUND)
                            response.writeHead(404, {"Content-Type":"text/plain;charset=utf-8"});
                            response.end(MAUVAIS_CALCUL);
                        }
                    }

                    else if (false) {
                        // TODO : prendre en compte les autres types de questions et refactorer le routage une fois fini
                    }

                    //
                    // Requêtes perso : afficher un énoncé, lister les accès, les données POST, les questions.
                    //

                    // Affichage d'un enonce
                    else if ((params[1] == "enonce") && (params[2] != "")) {

                        var file = "enonce" + params[2] + ".md";
                        fs.readFile(__dirname + '/res/' + file, function (error, content) {
                            if (error) {
                                response.writeHead(404, {"Content-Type":"text/plain;charset=utf-8"});
                                response.end(NOT_FOUND);
                            } else {
                                util.log("Affichage de l'énoncé : " + file);
                                response.writeHead(200, {"Content-Type":"text/plain;charset=utf-8"});
                                response.end(content);
                            }
                        });
                    }

                    // Affichage des infos d'accès, de données POST enregistrées ou des questions (cf. /lib/util.js)
                    else if (routes.allowedFiles[urlparts.pathname]) {
                        var file = routes.allowedFiles[urlparts.pathname];
                        fs.readFile(file, function (error, content) {
                            if (error) {
                                response.writeHead(404, {"Content-Type":"text/plain;charset=utf-8"});
                                response.end("Fichier non trouvé : " + file);
                            } else {
                                util.log("Accès privé : " + file);
                                response.writeHead(200, {"Content-Type":"text/plain;charset=utf-8"});
                                response.end(content);
                            }
                        });
                    }

                    //
                    // Cas par défaut : Accès Refusé sur chemin incompris
                    //

                    else {
                        util.log("Chemin incompris !");
                        // Ecriture de l'En-tête HTTP (404 : Status NOT FOUND)
                        response.writeHead(404, {"Content-Type":"text/plain;charset=utf-8"});
                        response.end(NOT_FOUND);
                    }
                }
            }
        }
    )
    ;

server.listen(port);

// Tracer le démarrage du serveur
util.log("Node Server running on port : " + port);
