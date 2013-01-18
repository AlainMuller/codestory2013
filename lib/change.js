function change(total) {
	var result = [];

	// Ne prend qu'un seul paramètre
	if (arguments.length == 1)
	{
		if (total == 1)
			result[0] = {"foo":1};

		// TODO : Algo à implémenter
	}

	return result;
}

// Puisque je vais exporter une seule fonction, change, depuis ce module, 
// je vais le faire avec module.exports au lieu de exports.change = change.
module.exports = change;