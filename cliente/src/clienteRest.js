function ClienteRest(){
	this.obtenerPartidas=function(){
		$.getJSON("/obtenerPartidas",function(data){    
    		console.log(data);
    		mostrarListaPartidas(data);
		});
	}
	this.comprobarUsuario=function(usrid){
		$.getJSON("/comprobarUsuario/"+usrid,function(data){    
			if (data.partida){
	    		console.log(data);
	    		com.ini(usrid);
	    		com.partida=data.partida;
	    		com.retomarPartida();
	    	}
	    	else{
	    		mostrarFormularioNombre();
	    	}
		});	
	}
	this.agregarUsuario=function(nombre){
	  	//var usr=JSON.parse($.cookie("usr"));	  
		var cli=this;
		$.ajax({
		    type:'GET',
		    url:'/agregarUsuario/'+nombre,
		    success:function(data){
		      console.log("Usuario agregado con id: "+data.usr);
		      //usr.id=data.usr;
		      $.cookie("usr",data.usr);
		      com.ini(data.usr);
		      mostrarCrearPartida();
		      cli.obtenerPartidas();
		      },
		    contentType:'application/json',
		    dataType:'json'
		  });
	}
	this.registrarUsuario=function(email,clave){
		$.ajax({
			type:'POST',
			url:'/registrarUsuario/',
			data:JSON.stringify({email:email,clave:clave}),
			success:function(data){
				if (!data.email){
					console.log('No se ha podido registrar');
					//mostrarRegistro();
	        //mostrarAviso("Dirección de email inventada o el usuario ya existe");
	        //mostrarSolicitarReenvioMail();
	   		 }
	    else{        
	    	console.log('Debes confirmar tu cuenta:'+data.email);
	         //mostrarAviso("Te hemos enviado un email para confirmar tu cuenta");
	     }
	 },
	 contentType:'application/json',
	 dataType:'json'
	});
	}

}