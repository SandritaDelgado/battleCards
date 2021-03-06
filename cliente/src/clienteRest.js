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
	    		usr=new ClienteUsuario();
	    		usr.nombre=data.nombreUsr;
	    		com.ini(usrid);
	    		com.partida=data.partida;
	    		com.retomarPartida();
	    	}
	    	else{
	    		$.removeCookie("usr");
	    		//mostrarFormularioNombre();
	    		//mostrarLogin();
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
		      usr= new ClienteUsuario();
		      usr.nombre=nombre;
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
	      	console.log("No se ha podido registrar");
	        mostrarRegistro();
	        //mostrarLogin();
	        mostrarAviso("Dirección de email inventada o el usuario ya existe");
	        //mostrarSolicitarReenvioMail();
	      }
	      else{  
	      	 console.log("Debes confirmar la cuenta "+data.email);      
	         mostrarAviso("Te hemos enviado un email para confirmar tu cuenta");
	      }
	      },
	    contentType:'application/json',
	    dataType:'json'
	  });
	}
	this.loginUsuario=function(email,clave){
	  var cli=this;
	  $.ajax({
	    type:'POST',
	    url:'/loginUsuario',
	    data:JSON.stringify({email:email,clave:clave}),
	    success:function(data){
	      if (!data.email){
	      	console.log("No se ha podido iniciar sesión");
	        //mostrarRegistro();
	        mostrarLogin();
	        //mostrarAviso("Dirección de email inventada o el usuario ya existe");
	        //mostrarSolicitarReenvioMail();
	      }
	      else{  
	      	 console.log("Se ha iniciado sesión con email: "+data.email);      
	         //mostrarAviso("Te hemos enviado un email para confirmar tu cuenta");
	         $.cookie("usr",JSON.stringify(data));
	         usr=new ClienteUsuario();
	         usr.nombre=email;
	         com.ini(data._id);
	         mostrarCrearPartida();
	         cli.obtenerPartidas();
	         //mostrarAviso("Te hemos enviado un email para confirmar tu cuenta");
	      }
	      },
	    contentType:'application/json',
	    dataType:'json'
	  });
	}
	this.eliminarUsuario=function(){
	  var usr=JSON.parse($.cookie("usr"));
	  $.ajax({
	    type:'DELETE',
	    url:'/eliminarUsuario/'+usr._id,//$.cookie("uid"),
	    data:'{}',
	    success:function(data){
	      if (data.resultados==1)
	      {
	        //eliminarCookies();
	        $.removeCookie("usr");
	        mostrarLogin();
	      }
	      },
	    contentType:'application/json',
	    dataType:'json'
	  });
	}

	this.actualizarUsuario=function(oldpass,newpass,newpass2){
	  var usr=JSON.parse($.cookie("usr"));
	  var nivel=usr.nivel;
	 $.ajax({
	    type:'PUT',
	    url:'/actualizarUsuario',
	    data:JSON.stringify({uid:usr._id,email:usr.email,oldpass:oldpass,newpass:newpass,newpass2:newpass2}),
	    success:function(data){
	      if (!data.email){
	        mostrarRegistro();
	      }
	      else{
	        $.cookie("usr",JSON.stringify(data));
	        mostrarListaPartidas(data);
	      }
	      },
	    contentType:'application/json',
	    dataType:'json'
	  });
	}

}