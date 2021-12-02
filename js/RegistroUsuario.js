function saveUser(username) {
    let data={
        identification : $("#identification").val(),
        name : $("#name").val(),
        address : $("#address").val(),
        cellPhone : $("#cellPhone").val(),
        email : $("#email").val(),
        password :  $("#password").val(),
        type : $("#type").val(),
        zone : $("#zone").val()
    };
    let dataToSend=JSON.stringify(data);
    $.ajax({
        type:"POST",
        contentType: "application/json; charset=utf-8",
        data:dataToSend,
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/user/new",
        success:function(respuesta){
            if (respuesta.id != null) {
                $("#identification").val("");
                $("#name").val("");
                $("#address").val("");
                $("#cellPhone").val("");
                $("#email").val("");
                $("#password").val("");
                $("#type").val("");
                $("#zone").val("");
                alert("Se Guardo Usuario Exitosamente")
            } else {
                alert("ERROR - El email ingresado ya existe, verifique!")
            }
        }
    });
}