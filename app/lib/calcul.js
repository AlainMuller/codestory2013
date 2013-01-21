/**
 * Created with JetBrains WebStorm.
 * User: Alain Muller
 * Date: 21/01/13
 * Time: 20:26
 * Module de calcul d'une expression arithmétique
 */


var calc = require(__dirname + "/../lib/bignumcalc");

// Regexp pour tester si l'expression est bien un calcul mathématique
var REGEXP_MATHEMATIQUE = /(?:[a-z$_][a-z0-9$_]*)|(?:[;={}\[\]"'!&<>^\\?:])/ig;

// Calcul mathématique de l'expression passée en paramètre (si celle-ci est valide)
function calculMathematique(expression) {

    var result;

    var valid = true;

    // On utilise la regexp pour déterminer si l'expression est un calcul mathématique valide
    var expr = expression.replace(REGEXP_MATHEMATIQUE, function ($0) {
        // If the name is a direct member of Math, allow
        if (Math.hasOwnProperty($0))
            return "Math." + $0;
        // Otherwise the expression is invalid
        else
            valid = false;
    });

    if (valid) {
        result = calc.compute(expression);
    }

    return result;
}

exports.calcExpr = calculMathematique;
