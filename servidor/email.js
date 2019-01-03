var sendgrid = require("sendgrid")("SandraDelgado","sandradelgado1992");

var url="https://battlecardsgame.herokuapp.com/";

//var url="http://127.0.0.1:5000/"

module.exports.enviarEmail=function(direccion,key,msg){
	var email = new sendgrid.Email();
	email.addTo(direccion);
	//email.addBcc('conquistaniveles@gmail.com');
	email.setFrom('battlecards@gmail.com');
	email.setSubject('confirmar cuenta');
	email.setHtml('<h3>Bienvenido a battleCards</h3><p><a href="'+url+'confirmarUsuario/'+direccion+'/'+key+'">'+msg+'</a></p>');

	sendgrid.send(email);	
}
