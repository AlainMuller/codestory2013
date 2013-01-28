/**
 * Created with JetBrains WebStorm.
 * User: Alain Muller
 * Date: 27/01/13
 * Time: 08:12
 * Module permettant de calculer une expression mathématique au format infix (a + b - d * c)
 */

var bigdecimal = require("bigdecimal");

// Regexp permettant de déterminer si l'expression est valide
var validRegexp = /^([\d,]+|[\+\-\*\/\(\)]|\s+)+$/;
// Regexp permettant de déterminer si l'expression est un nombre (signé)
var numRegexp = /^(-)?(\d+|(\d+\.\d+)|\.\d+)$/;
// Regexp permettant de découper l'expression et d'en extraire opérateurs et opérandes (tester plus tard si ce sont des nombres valides)
var splitRegexp = /([\d\.]+|[\+\-\*\/\(\)])/;


// Pile d'opérandes
var valStack = [];
// Pile d'opérateurs
var opStack = [];

// Calcul d'une expression mathématique en utilisant des piles d'opérateurs/opérandes
var calcul = function (expression) {
    var resultat;

    // On vérifie si l'expression est valide
    if (!validRegexp.test(expression)) {
        console.log("Expression invalide : '" + expression + "'");
    }
    // On vérifie si le nombre de parenthèses est cohérent
    else if (expression.match(/\(/g).length != expression.match(/\)/g).length) {
        console.log("Gestion incohérente des parenthèses : " + expression.match(/\(/g).length + " ouvrantes, " + expression.match(/\)/g).length + " fermantes");
    }
    // TODO : Mettre en place une meilleure regexp pour valider l'expression (gestion des opérateurs en début/fin de chaine, opérations binaires/unaires, ...)
    else {
        // Réinitialisation des variables
        valStack = [];
        opStack = [];

        // Conversion du format décimal français : 1,5 => 1.5 et suppression des espaces éventuels
        expression = expression.replace(/\s+/g, '').replace(/,/g, '.');

        // Extraction des éléments de l'expression
        var splitResult = expression.split(splitRegexp);
        var elements = [];
        // On ne conserve que les éléments impairs (car on a splitté sur un pattern ne reconnaissant que ces valeurs)
        for (var i = 0; i < splitResult.length; i++) {
            if (i % 2 == 1) {
                elements.push(splitResult[i]);
            }
        }

        // Remplissage des piles opérandes / opérateurs
        while (elements.length > 0) {
            // On récupère la première valeur
            var elem = elements.shift();

            if (numRegexp.test(elem)) {
                valStack.push(elem);
//            console.log("On a poussé " + elem + " dans la pile valStack");
//            console.log(" => " + JSON.stringify(valStack));

                // On force le calcul si l'élément suivant n'est pas un opérateur prioritaire
                if (elements.length > 0 && opStack.length > 0
                    && isValidOp(elements[0]) && isValidOp(opStack[opStack.length - 1])
                    && !isPrioritaire(elements[0], opStack[opStack.length - 1])) {
                    compute();
                }
            }
            else {
                switch (elem) {
                    case '(':
                        opStack.push(elem);
                        break;
                    case')':
                        while (opStack[opStack.length - 1] != '(') {
//                        console.log("Parenthèse fermante, on calcul la sous expression!");
                            compute();
                        }
                        // On vire la parenthèse ouvrante
                        opStack.pop();
                        break;
                    case '+':
                    case '-':
                    case '*':
                    case '/':
                        if (opStack.length == 0) {
                            opStack.push(elem);
                        }
                        else if (isPrioritaire(elem, opStack[opStack.length - 1])) {
//                        console.log("Element prioritaire, on calcul la sous expression (" + elem + " VS " + opStack[opStack.length - 1] + ")");
                            opStack.push(elem);
                        }
                        else {
                            while (opStack.length > 0 && isPrioritaire(opStack[opStack.length - 1], elem)) {
//                            console.log("(" + opStack.length + ") Dernier opérateur prioritaire, on calcul la sous expression (" + opStack[opStack.length - 1] + " VS " + elem + ")");
                                compute();
                            }
                            opStack.push(elem);
                        }
                        break;
                    default:
                        console.log("Erreur : élément non supporté : '" + elem + "'");
                        break;
                }
//            if (elem != ')') {
//                console.log("On a poussé " + elem + " dans la pile opStack");
//                console.log(" => " + JSON.stringify(opStack));
//            }
            }
        }

        // Calcul de l'expression simplifiée
        while (opStack.length > 0) {
            compute();
            resultat = valStack[valStack.length - 1];
        }
        // Conversion du format décimal en français : 1.5 => 1,5 et suppression du ,0 si nombre entier
        resultat = resultat.replace(/\.0+$/, '').replace(/\./g, ',')
    }

    return resultat;
};

// Fonction permettant de déterminer le résultat d'une sous expression
var compute = function () {
    var operande1, operande2, resultat;
    var operateur;

//    console.log(" > compute");
//    console.log("  > " + JSON.stringify(valStack));
//    console.log("  > " + JSON.stringify(opStack));

    operande2 = new bigdecimal.BigDecimal(valStack.pop());
    operande1 = new bigdecimal.BigDecimal(valStack.pop());

    operateur = opStack.pop();

    switch (operateur) {
        case('+'):
            resultat = operande1.add(operande2);
            valStack.push(resultat.toString());
            break;

        case('-'):
            resultat = operande1.subtract(operande2);
            valStack.push(resultat.toString());
            break;

        case('*'):
            resultat = operande1.multiply(operande2);
            valStack.push(resultat.toString());
            break;

        case('/'):
            resultat = operande1.divide(operande2);
            valStack.push(resultat.toString());
            break;
    }
//    console.log(operande1 + ' ' + operateur + ' ' + operande2 + " = " + resultat);
};

// Fonction permettant de déterminer s'il s'agit bien d'un opérateur (pas de calcul sur les parenthèses!)
var isValidOp = function (op) {
    return op == '+' || op == '-' || op == '*' || op == '/';
};

// Fonction permettant de déterminer la priorité d'opérateurs entre eux
var isPrioritaire = function (op1, op2) {
    return (op1 == '*' || op1 == '/') && !(op2 == '*' || op2 == '/');
};

exports.calcul = calcul;
