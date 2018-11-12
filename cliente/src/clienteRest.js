function ClienteRest(){
	this.obtenerPartidas=function(){
		$.getJSON("/obtenerPartidas",function(data){ 
			console.log(data);
			mostrarListaPartidas(data);
		});
	}
	this.agregarUsuario=function(nombre){
		var cli=this;
		$.ajax({
			type:'GET',
			url:'/agregarUsuario/'+nombre,
			success:function(data){
				console.log("Usuario agregado con id: "+data.usr);
				//usr.id=data.usr;
				com.ini(data.usr);
				mostrarCrearPartida();
			},
			contentType:'application/json',
			dataType:'json'
		});
	}
}