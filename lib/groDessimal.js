// Définition des constantes
var FOO = {"name" : "foo", "val" : 1};
var BAR = {"name" : "bar", "val" : 7};
var QIX = {"name" : "qix", "val" : 11};
var BAZ = {"name" : "baz", "val" : 21};

// L'objet GroDessimal
this.GroDessimal = function(nbFoo, nbBar, nbQix, nbBaz) { 
    this.nbFoo = nbFoo; 
    this.nbBar = nbBar; 
    this.nbQix = nbQix; 
    this.nbBaz = nbBaz; 
    this.val = nbFoo * FOO.val + nbBar * BAR.val + nbQix * QIX.val + nbBaz * BAZ.val; 

    this.toString = function() { 
    	return "groDessimal(" + this.val + ") {foo : " + this.nbFoo + ", bar : " + this.nbBar + ", qix : " + this.nbQix + ", baz : " + this.nbBaz + "}";
    } 
}

// Export des constantes
exports.FOO = FOO;
exports.BAR = BAR;
exports.QIX = QIX;
exports.BAZ = BAZ;