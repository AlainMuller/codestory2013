function change() {
	return [];
}

// Puisque je vais exporter une seule fonction, change, depuis ce module, 
// je vais le faire avec module.exports au lieu de exports.change.
module.exports = change;