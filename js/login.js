
function Logueo(){
    $.ajax({
        type:"GET",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/user/"+$("#email").val()+"/"+$("#password").val(),
        //url:"http://localhost:8080/api/user/"+$("#email").val()+"/"+$("#password").val(),
        success:function(respuesta){
            if (respuesta.id != null) {
                localStorage.setItem("usuario",respuesta.name);
                //alert(localStorage.getItem("usuario"))
                window.location.href = "/Templates/MenuPrincipal.html"
            } else {
                alert("ERROR - Usuario/contraseña no validos, verifique!")
            }
        }
    });
}

