var gd = require(__dirname + '/../lib/groDessimal');
var groDessimal = new gd.GroDessimal();

var FOO = gd.FOO.val;
var BAR = gd.BAR.val;
var QIX = gd.QIX.val;
var BAZ = gd.BAZ.val;

var makeChange = function(total) {
	var result = [];

	// Ne prend qu'un seul paramètre
	if (arguments.length == 1)
	{
		// TODO : Implémenter makeChange!

		/**
		 * Algorithme : 
		 * première boucle sur pièces foo > autant qu'il en faut!
		 * seconde boucle sur pièces bar > pour chaque pièce, recalculer le reste avec foo
		 * troisième boucle sur pièces qix > pour chaque pièce, recalculer le reste avec bar (qui va recalculer le reste avec foo)
		 * quatrième boucle sur pièces baz > pour chaque pièce, recalculer le reste avec qix (qui va recalculer le reste avec bar (qui va recaulculer le reste avec foo))
		 *
		 * Construire un objet de sortie si on a au moins une pièce : {"foo":7} et l'ajouter au tableau final
		 */

		

		result = calculTotal(total);

	}
	return result;
};


var calculTotal = function(total) {
	var pieces = [];
	


	return pieces;
};

/*
 private List<Change> completeWithFooBarQixBaz(int groDessimal, Change c) {
        List<Change> changes = new ArrayList<Change>();
        c.addUpTo(Coin.BAZ, groDessimal);
        for (int i = c.baz; i >= 0; i--) {
            changes.addAll(completeWithFooBarQix(groDessimal, new Change(0, 0, 0, i)));
        }
        return changes;
    }
*/

exports.makeChange = makeChange;

