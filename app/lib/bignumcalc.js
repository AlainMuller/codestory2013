/**
 * Created with JetBrains WebStorm.
 * User: Alain Muller
 * Date: 22/01/13
 * Time: 00:07
 * Module de calcul d'expressions mathématiques sur opérandes de très grande taille
 *  => Code basé sur https://github.com/jbcazaux/codestory/blob/master/calculator.js
 *
 */

var bigdecimal = require("bigdecimal");
var util = require(__dirname + "/../lib/util");

// Ajout de propritétés/méthodes à la classe Array pour faciliter le calcul
Object.defineProperty(Array.prototype, 'last', {
    enumerable:false,
    configurable:true,
    get:function () {
        return this.length > 0 ? this[this.length - 1] : undefined;
    },
    set:undefined
});

// Utilisation d'un B-arbre pour stocker les opérandes et méthodes de l'expression mathématique
// cet arbre est parcouru de droite à gauche pour évaluer le résultat de l'opération
function BinaryTree(right, left, op) {
    this.left = left;
    this.right = right;
    this.op = op;
}

// Définition des opération pour transcodage avec les méthodes du module bigdecimal
BinaryTree.prototype.operators = {'+':'add', '-':'subtract', '*':'multiply', '/':'divide'};
BinaryTree.prototype.getOp = function (op) {
    return this.operators[op];
};
// Définition de la méthode compute sur l'abre permettant de résoudre l'expression en lançant le calcul sur chaque branche
BinaryTree.prototype.compute = function () {
    var l = this.left.compute();
    var r = this.right.compute();
    return l[this.getOp(this.op)](r);
};

// Ajout de la méthode compute à l'objet BigDecimal qui sera l'objet terminal (feuille) de chaque branche opérande
bigdecimal.BigDecimal.prototype.compute = function () {
    return this;
};


// Fonction principale du module (calcul de l'expression mathématique)
function computeExpression(expression) {
    return infixToBtree(expression.replace(/,/g, '.')).compute().toString().replace(/\./g, ',').replace(/(,0+)/, '');
}

// Conversion d'une expression infix (ex: a + b) en B-arbre
function infixToBtree(expression) {
    var tokens = expression.split(/([\d\.]+|[\*\+\-\/\(\)])/).filter(util.notEmpty);
    var operatorStack = [];
    var lastToken = '';
    var queue = [];

    while (tokens.length > 0) {
        var currentToken = tokens.shift();

        if (isNumber(currentToken)) {
            queue.push(new bigdecimal.BigDecimal(currentToken));
        }
        else if (isUnaryOp(currentToken, lastToken)) {
            lastToken = currentToken;
            //expect next token to be a number
            currentToken = tokens.shift();
            //minus is the only unary op supported for now
            queue.push(new bigdecimal.BigDecimal(currentToken).negate());
        }
        else if (isOperator(currentToken)) {
            while (getPrecedence(currentToken) <= getPrecedence(operatorStack.last)) {
                queue.push(new BinaryTree(queue.pop(), queue.pop(), operatorStack.pop()));
            }

            operatorStack.push(currentToken);

        }
        else if (currentToken == '(') {
            operatorStack.push(currentToken);
        }
        else if (currentToken == ')') {
            while (operatorStack.last != '(') {
                if (operatorStack.length == 0)
                    return "Error in braces count";

                queue.push(new BinaryTree(queue.pop(), queue.pop(), operatorStack.pop()));
            }
            operatorStack.pop();
        }
        lastToken = currentToken;
    }

    while (operatorStack.length != 0) {
        if (/^[\(\)]$/.test(operatorStack.last))
            return "Error in braces count";

        queue.push(new BinaryTree(queue.pop(), queue.pop(), operatorStack.pop()));

    }
    //return Btree root
    return queue[0];
}

// Fonction permettant de déterminer la présence d'opérateurs
function isOperator(token) {
    return /^[*\+\-\/]$/.test(token);
}

// Fonction permettant de déterminer si un opérateur est unaire
function isUnaryOp(currentToken, lastToken) {
    return currentToken == '-' && (getPrecedence(lastToken) > 0 || lastToken == '' || lastToken == '(');
}


// Fonction permettant de tester si l'expression est un nombre ()
function isNumber(token) {
    return /^\d*(\.\d+)?$/.test(token) || /^\-(\d+|(\.\d+))$/.test(token);
}


function getPrecedence(token) {
    switch (token) {
        case '*':
        case '/':
            return 8;
        case '+':
        case '-':
            return 6;
        default:
            return -1;
    }
}

exports.compute = computeExpression;