var timeoutExecute = null;
var unit_time = 1;
var servidor = null;
var onmessage = function (e) {
	executeMessage(e.data);
}

var executeMessage = function (message) {

	var acao = message.action;
	
	switch (acao) {
		case "iniciar":
			unit_time = message.unit_time;
			servidor = message.server_index;
		break;
		case "processar" :
			timeoutExecute = setTimeout(function () {
				postMessage({
					action: "finalizar",
					demanda: message.demanda,
					servidor: servidor
				});
			}, message.demanda.processing_time*unit_time);

		break;
	}
}