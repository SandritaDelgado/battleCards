function limpiar(){
	//inicializa la página
	$('#formInicio').remove();
  $('#formCrearPartida').remove();
  $('#mostrarListaPartidas').remove();
  $('#granCabecera').remove();
  $('#mostrarCabeceraJuego').remove();
  $('#mostrarAtaqueRival').remove()
  $('#mostrarAtaque').remove();
  $('#mostrarRival').remove();
  $('#mostrarElixir').remove();
  $('#mostrarMano').remove()
  $('#mostrarEsperando').remove();
  $('#msg').remove();
}

function comprobarUsuario(){
  if ($.cookie("usr")){
    var usr=JSON.parse($.cookie("usr"));
    rest.comprobarUsuario(usr._id);
  }
  else{
    //mostrarFormularioNombre();
    mostrarLogin();
  }
}
function abandonarPartida(){
  if ($.cookie("usr")){
      com.abandonarPartida();
      $.removeCookie("usr");
      location.reload();
  }
}

function mostrarFormularioNombre(){
	var cadena='<div id="formInicio">';
	cadena=cadena+'<h3>Iniciar sesión</h3>';
	cadena=cadena+'<input id="nombre" type="text" class="form-control" name="nombre" placeholder="Nombre usuario">';
	cadena=cadena+'<button type="button" id="inicioBtn" class="btn btn-primary btn-md">Iniciar Usuario</button>';
	cadena=cadena+'</div>';
	
	$('#inicio').append(cadena);

	$('#inicioBtn').on('click',function(){
        var nombre=$('#nombre').val();
        if (nombre==""){
        	nombre="Loli";
        }
        $('#formInicio').remove();
        rest.agregarUsuario(nombre);
     });
}

function mostrarLogin(){
  limpiar();
  var cadena='<div id="formInicio">';
  cadena=cadena+'<h3>Iniciar sesión</h3>';
  cadena=cadena+'<label for="email">Email:</label>'
  cadena=cadena+'<div class="input-group">'
  //cadena=cadena+'<label for="email">Email:</label>'
  cadena=cadena+'<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>';
  //cadena=cadena+'<label for="email">Email:</label>'
  cadena=cadena+'<input id="email" type="text" class="form-control" name="email" placeholder="Email usuario">';
  cadena=cadena+'</div>';
  cadena=cadena+'<label for="email">Contraseña:</label>'
  cadena=cadena+'<div class="input-group">';
  cadena=cadena+'<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>';
  cadena=cadena+'<input id="clave" type="text" class="form-control" name="clave" placeholder="Contraseña">';
  cadena=cadena+'</div>';
  cadena=cadena+'<div class="checkbox">'
  cadena=cadena+'<label><input type="checkbox"> Recordarme</label>'
  cadena=cadena+'</div>';
  cadena=cadena+'<button type="button" id="loginBtn" class="btn btn-default btn-md">Iniciar usuario</button>';
  cadena=cadena+'<div id="aviso"></div>';
  cadena=cadena+'</div>';

  
  $('#inicio').append(cadena);

  $('#loginBtn').on('click',function(){
        var email=$('#email').val();
        var clave=$('#clave').val();
        if (email=="" && clave==""){
          mostrarLogin();
          mostrarAviso("Escribe tu correo");
        }
        else{
          $('#formInicio').remove();
          rest.loginUsuario(email,clave);
        }
     });
}
function mostrarAviso(msg){
  $('#msg').remove();
  $('#aviso').append("<div id='msg'>"+msg+"</div>");
}
function mostrarRegistro(){
  limpiar();
  var cadena='<div id="formInicio">';
  cadena=cadena+'<h3>Registro de usuarios</h3>';
  cadena=cadena+'<label for="email">Email:</label>'
  cadena=cadena+'<div class="input-group">'
  cadena=cadena+'<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>';
  cadena=cadena+'<input id="email" type="text" class="form-control" name="email" placeholder="Email usuario">';
  cadena=cadena+'</div>';
  cadena=cadena+'<label for="email">Repite Email:</label>'
  cadena=cadena+'<div class="input-group">';
  cadena=cadena+'<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>';
  cadena=cadena+'<input id="email2" type="text" class="form-control" name="email2" placeholder="Email usuario">';
  cadena=cadena+'</div>';
  cadena=cadena+'<label for="email">Contraseña:</label>'
  cadena=cadena+'<div class="input-group">';
  cadena=cadena+'<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>';
  cadena=cadena+'<input id="clave" type="password" class="form-control" name="clave" placeholder="Contraseña">';
  cadena=cadena+'</div>';
  cadena=cadena+'<div class="checkbox">'
  cadena=cadena+'<label><input id="checkbox-p" type="checkbox" required>Acepta nuestros Términos & Privacidad</label>'
  cadena=cadena+'</div>';
  cadena=cadena+'<button type="button" id="regBtn" class="btn btn-default btn-md">Registrar usuario</button>';
  cadena=cadena+'<div id="aviso"></div>';
  cadena=cadena+'</div>';
  
  $('#inicio').append(cadena);

  $('#regBtn').on('click',function(){
        var email=$('#email').val();
        var email2=$('#email2').val();
        var clave=$('#clave').val();
        //document.getElementById("checkbox-p").required = true;
        if (email==email2 && clave!=""){
          rest.registrarUsuario(email,clave); //No se seguir
        }
        else{
          
          mostrarAviso("Email o contraseña incorrectos");
        }
     });
}

function mostrarCrearPartida(){
	var cadena='<div id="formCrearPartida">';
	cadena=cadena+'<h3>Crear partida</h3>';
	cadena=cadena+'<input id="nombre" type="text" class="form-control" name="nombre" placeholder="Nombre partida">';
	cadena=cadena+'<button type="button" id="inicioBtn" class="btn btn-primary btn-md">Crear partida</button>';
	cadena=cadena+'</div>';
	
	$('#inicio').append(cadena);

	$('#inicioBtn').on('click',function(){
        var nombrePartida=$('#nombre').val();
        if (nombrePartida==""){
        	nombrePartida="prueba";
        }
        $('#formCrearPartida').remove();
        com.crearPartida(nombrePartida);
    });
}

function mostrarInicio(){
  //mostrarListaPartidas();
  limpiar();
  mostrarCabecera();
  mostrarCrearPartida();
  rest.obtenerPartidas();
}

function mostrarCabecera(){
  $("#granCabecera").remove();
  var cadena='<div class="jumbotron text-center" id="granCabecera">';
  cadena=cadena+'<h1>BattleCards Game</h1>';
  cadena=cadena+'<p>El juego de cartas</p></div>';
  $("#cabecera").append(cadena);
}

function mostrarListaPartidas(datos){

	$('#mostrarListaPartidas').remove();
	var cadena='<div id="mostrarListaPartidas"><h3>Elegir partida</h3>';
	cadena=cadena+'<div class="dropdown">';
  cadena=cadena+'<button class="btn btn-primary dropdown-toggle" id="mostrarListaBtn" type="button" data-toggle="dropdown">Elegir partida ';
	cadena=cadena+'<span class="caret"></span></button>';
  cadena=cadena+'<ul id="dropdown" class="dropdown-menu">';
  cadena=cadena+'<li><a href="#">-</a></li>';
  for(var i=0;i<datos.length;i++){
  		cadena=cadena+'<li><a href="#">'+datos[i].nombre+'</a></li>';
  	}
  cadena=cadena+'</ul>';
	cadena=cadena+'</div></div>';

	$('#listaPartidas').append(cadena);

	$('.dropdown-menu li a').click(function(){
        var nombrePartida=$(this).text();
        if (nombrePartida!=""){
        	$('#mostrarListaPartidas').remove();
        	com.elegirPartida(nombrePartida);
        }
  });
}

function mostrarEsperandoRival(){
  limpiar();
  $('#mostrarEsperando').remove();
  var cadena='<div id="mostrarEsperando"><h3>Esperando rival</h3>';
  cadena=cadena+'<img id="gif" src="cliente/img/imagengif.gif"></div>';
  $('#cabecera').append(cadena);
}

function eliminarGif(){
  $('#gif').remove();
}

function mostrarRival(elixir,vidas){
  $('#mostrarRival').remove();
  var cadena='<div id="mostrarRival"><h3>Rival - Elixir:' + elixir+ ' - Vidas:'+ vidas + '</h3></div>';
  $('#rival').append(cadena);
}

function mostrarAtaqueRival(datos){
  $('#mostrarAtaqueRival').remove();
  var cadena='<div id="mostrarAtaqueRival">';
  for(var i=0;i<=datos.length;i++){
    cadena=cadena+'<div class="col-md-1">';
    cadena=cadena+'<div class="thumbnail">';
    cadena=cadena+'<img src="cliente/img/nocarta.png" class="img-rounded" alt="carta" style="width:100%">';
    cadena=cadena+'</div></div>'
  }
  for(var i=0;i<datos.length;i++){    
    cadena=cadena+'<div class="col-md-1">';
    cadena=cadena+'<div class="thumbnail">';
    cadena=cadena+'<img src="cliente/img/'+datos[i].nombre+'.png" class="img-rounded" alt="carta" id="'+datos[i].nombre+'" name="rivalito" style="width:100%">';
    cadena=cadena+'<div class="col-md-1"></div>';
    cadena=cadena+'</div></div>'
  }
  for(var i=0;i<=(5-datos.length)/2;i++){
    cadena=cadena+'<div class="col-md-1">';
    cadena=cadena+'<div class="thumbnail">';
    cadena=cadena+'<img src="cliente/img/nocarta.png" class="img-rounded" alt="carta" style="width:100%">';
    cadena=cadena+'</div></div>'
  }
  cadena=cadena+'</div>';
  $('#ataqueRival').append(cadena);

  $('[name="rivalito"]').click(function(){
    var nombreCarta=$(this).attr("id");
    console.log(nombreCarta);
    com.carta2=nombreCarta;
    //com.jugarCarta(nombreCarta);
  });
}

function mostrarAtaque(datos){
  $('#mostrarAtaque').remove();
  var cadena='<div id="mostrarAtaque"><h3>Zona de Ataque</h3>';
  for(var i=0;i<=datos.length;i++){
    cadena=cadena+'<div class="col-md-1">';
    cadena=cadena+'<div class="thumbnail">';
    cadena=cadena+'<img src="cliente/img/nocartarival.png" class="img-rounded" alt="carta" style="width:100%">';
    cadena=cadena+'</div></div>'
  }
  for(var i=0;i<datos.length;i++){   
    cadena=cadena+'<div class="col-md-1">';
    cadena=cadena+'<div class="thumbnail">';
    cadena=cadena+'<img src="cliente/img/'+datos[i].nombre+'.png" class="img-rounded" alt="carta" id="'+datos[i].nombre+'" name="ataquito" style="width:100%">';
    cadena=cadena+'</div></div>'
  }
  for(var i=0;i<=datos.length;i++){
    cadena=cadena+'<div class="col-md-1">';
    cadena=cadena+'<div class="thumbnail">';
    cadena=cadena+'<img src="cliente/img/nocarta.png" class="img-rounded" alt="carta" style="width:100%">';
    cadena=cadena+'</div></div>'
  }
  cadena=cadena+'</div>';
  $('#ataque').append(cadena);

  $('[name="ataquito"]').click(function(){
    var nombreCarta=$(this).attr("id");
    console.log(nombreCarta);
    com.carta1=nombreCarta;
    //com.jugarCarta(nombreCarta);
  });
}

// function mostrarElixir(turno,elixir,vidas){
//   $('#mostrarElixir').remove();
//   var cadena='<div id="mostrarElixir">';
//   if (turno){
//     cadena=cadena+'<h3 style="color:white;background-color:Green">TURNO</h3>';
//   }
//   else{
//     cadena=cadena+'<h3 style="color:white;background-color:Red">TURNO</h3>';
//   }
//   cadena=cadena+'<h3><button type="button" class="btn btn-success" onclick="com.pasarTurno();">Pasar turno</button> Elixir:'+elixir+' - Vidas: '+vidas+' <button type="button" class="btn btn-warning" onclick="abandonarPartida()">Abandonar partida</button></h3></div>';
//   $('#elixir').append(cadena);
// }
function mostrarElixir(turno,elixir,vidas){

	$('#mostrarElixir').remove();
	var cadena='<div id="mostrarElixir"><h3>Turno: ' + turno + '- Elixir: ' + elixir + ' - Vidas: ' + vidas + '</h3>'
	cadena=cadena+ '<button type="button" class="btn btn-warning" onclick="abandonarPartida()">Abandonar Partida</button>';
	cadena=cadena+'<button type="button" class="btn btn-primary" onclick="com.pasarTurno()">Pasar turno</button>';
	cadena=cadena+'<button type="button" class="btn btn-primary" onclick="atacar()">Atacar</button>';
	cadena=cadena+'</div';
	$('#elixir').append(cadena);
}

function atacar(){
	if(com.carta1&&com.carta2)
		com.atacar(com.carta1,com.carta2);
}

function mostrarMano(datos){
  $('#mostrarMano').remove();
  var numCol=Math.round(12/(datos.length));
  $('#mostrarMano').remove();
  var cadena='<div id="mostrarMano">';
  //cadena=cadena+'<div class="col-md-'+numCol+'"></div>';
  for(var i=0;i<datos.length;i++){
    cadena=cadena+'<div class="col-md-'+numCol+'">';
    cadena=cadena+'<div class="thumbnail">';
    cadena=cadena+'<img src="cliente/img/'+datos[i].nombre+'.png" class="img-rounded" name="manita" id="'+datos[i].nombre+'" style="width:100%">';
    cadena=cadena+'</div></div>'
  }
  // for(var i=0;i<10-datos.mano.length;i++){
  //   cadena=cadena+'<div class="col-md-1">';
  //   cadena=cadena+'<div class="thumbnail">';
  //   cadena=cadena+'<img src="cliente/img/nocarta.png" class="img-rounded" alt="carta" style="width:100%">';
  //   cadena=cadena+'</div></div>'
  // }
  //cadena=cadena+'<div class="col-md-1"></div>';
  cadena=cadena+'</div>';
  $('#mano').append(cadena);

  $('[name="manita"]').dblclick(function(){
    var nombreCarta=$(this).attr("id");
    console.log(nombreCarta);
    com.jugarCarta(nombreCarta);
  });
}

// function seleccionarCarta(nombre){
//   console.log(nombre);
//   if ($('#'+nombre).css("border-top-color")=="rgb(0, 128, 0)")
//   {
//     $('#'+nombre).css("border","3px solid white");
//   }
//   else
//     $('#'+nombre).css("border","3px solid green");
// }