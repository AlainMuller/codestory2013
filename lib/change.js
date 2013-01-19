// Définition des constantes
var FOO = 1;
var BAR = 7;
var QIX = 11;
var BAZ = 21;

// Calcul des combinaisons possibles de cents pour un groDessimal dont la valeur (total) est passée en paramètre
function makeChange(total) {
	var result = [];

	/**
	 * Algorithme : 
	 * première boucle sur pièces foo > autant qu'il en faut!
	 * seconde boucle sur pièces bar > pour chaque pièce, recalculer le reste avec foo
	 * troisième boucle sur pièces qix > pour chaque pièce, recalculer le reste avec bar (qui va recalculer le reste avec foo)
	 * quatrième boucle sur pièces baz > pour chaque pièce, recalculer le reste avec qix (qui va recalculer le reste avec bar (qui va recaulculer le reste avec foo))
	 *
	 * Construire un objet de sortie si on a au moins une pièce et l'ajouter au tableau final
	 */

	 if (total > 0 && total <= 100)
	 {
		// Quatrième boucle
		for (var baz = 0; BAZ * baz <= total; baz++) 
		{
			var resteBaz = total - BAZ * baz;
			// Troisième boucle
			for (var qix = 0; QIX * qix <= resteBaz; qix++)
			{
				var resteQix = resteBaz - QIX * qix;
				// Deuxième boucle
				for (var bar = 0; BAR * bar <= resteQix; bar++)
				{
					var resteBar = resteQix - BAR * bar;
					// Construction de l'objet change à ajouter à la liste des possibilités
					var change = {};
					if (baz > 0)
						change.baz = baz;
					if (qix > 0)
						change.qix = qix;
					if (bar > 0)
						change.bar = bar;
					// Première "boucle"
					if (resteBar > 0)
						change.foo = resteBar;
					// makeChange(0) retourne [] et non [{}]
					if (change.foo || change.bar || change.qix || change.baz)
						result.push(change);
				}
			}
		}
	 }
	 
	return result;
};

exports.makeChange = makeChange;
