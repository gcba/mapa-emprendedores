var parser = function(inDate) {
	var today = new Date();
	var inDateMod = new Date(inDate);
	offSet = today.getTimezoneOffset();
	if(offSet < 0) {
		inDateMod.setMinutes(inDateMod.getMinutes()+offSet );
	} else {
		inDateMod.setMinutes(inDateMod.getMinutes()-offSet);
	}
	return inDateMod;
}


module.exports = parser