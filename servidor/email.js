
var sendgrid = require("sendgrid")("SandraDelgado","sandradelgado1992");

//var url="https://battlecardsgame.herokuapp.com/";
var url="http://127.0.0.1:5000/";



module.exports.enviarEmail=function(direccion,key,msg){
	var email = new sendgrid.Email();
	email.addTo(direccion);
	email.setFrom('battlecards1992@gmail.com');
	email.setSubject('confirmar cuenta'); //confirmarUsuario/:email/:key
	email.setHtml('<h3>Bienvenido a Battle Cards Game</h3><p><a href="'+url+'confirmarUsuario/'+direccion+'/'+key+'">'+msg+'</a></p>');

	sendgrid.send(email);	
}
