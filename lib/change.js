// Définition des constantes
FOO = 1;
BAR = 7;
QIX = 11;
BAZ = 21;

function makeChange(total) {
	var result = [];

	// Ne prend qu'un seul paramètre
	if (arguments.length == 1)
	{
		if (typeof total == "number")
		{
			var nbFoo = 0, nbBar = 0, nbQix = 0, nbBaz = 0;

			var reste = total;

			while (reste >= BAZ)
			{
				reste -= BAZ;
				nbBaz++;
			};

			while (reste >= QIX)
			{
				reste -= QIX;
				nbQix++;
			};

			while (reste >= BAR)
			{
				reste -= BAR;
				nbBar++;
			};

			while (reste >= FOO)
			{
				reste -= FOO;
				nbFoo++;
			};

			if (nbFoo > 0 || nbBar > 0 || nbQix > 0 || nbBaz > 0)
			{
				var resultObj = new Object();
				if (nbFoo > 0)
					resultObj['foo'] = nbFoo;

				if (nbBar > 0)
					resultObj['bar'] = nbBar;

				if (nbQix > 0)
					resultObj['qix'] = nbQix;

				if (nbBaz > 0)
					resultObj['baz'] = nbBaz;

				// On stocke l'objet dans le tableau
				result[0] = resultObj;
			}

			// TODO : Algo à implémenter
		}
	}

	return result;
};

exports.makeChange = makeChange;