function loadUserAll(){
    $.ajax({
        type:"GET",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/user/all",
        //url:"http://localhost:8080/api/user/all",
        success:function(respuesta){
            console.log(respuesta);
            loadResponseUser(respuesta);
        }
    });
}

function loadResponseUser(items){
    $("tbody").children().remove()
    var tableBody = $('#tblUsuarios tbody');
    var filaTabla = "";
    for (var i=0; i<items.length; i++) {
        filaTabla += "<tr>";
        filaTabla += "<td>"+items[i].id+"</td>";
        filaTabla += "<td>"+items[i].identification+"</td>";
        filaTabla += "<td>"+items[i].name+"</td>";
        filaTabla += "<td>"+items[i].address+"</td>";
        filaTabla += "<td>"+items[i].cellPhone+"</td>";
        filaTabla += "<td>"+items[i].email+"</td>";
        filaTabla += "<td>"+items[i].zone+"</td>";
        filaTabla += "<td>"+items[i].type+"</td>";
        filaTabla +="<td> <button class='btn btn-primary btn-sm btnSelect' onclick='passEditUser()'>Editar</button><button style='margin-left: 10px' class='btn btn-danger btn-sm' onclick='deleteUser("+items[i].id+")'>Eliminar</button> </td>";
        filaTabla +="</tr>";
    }
    tableBody.append(filaTabla);
}

function saveNewUser(username) {
    let data={
        id:$("#id").val(),
        identification:$("#identification").val(),
        name:$("#name").val(),
        address:$("#address").val(),
        cellPhone:$("#cellPhone").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        type:$("#type").val(),
        zone:$("#zone").val()
    };
    let dataToSend=JSON.stringify(data);
    $.ajax({
        type:"POST",
        contentType: "application/json; charset=utf-8",
        data:dataToSend,
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/user/new",
        //url:"http://localhost:8080/api/user/new",
        success:function(respuesta){
            if (respuesta.id != null) {
                $("#id").val("");
                $("#identification").val("");
                $("#name").val("");
                $("#address").val("");
                $("#cellPhone").val("");
                $("#email").val("");
                $("#password").val("");
                $("#type").val("");
                $("#zone").val("");
                loadUserAll();
                alert("Se Guardo Nuevo Usuario Exitosamente")
            } else {
                alert("ERROR - El email ingresado ya existe, verifique!")
            }
        }
    });
}

function passEditUser(){
    $("#tblUsuarios").on('click','.btnSelect',function(){
        // get the current row
        var currentRow=$(this).closest("tr");
        var col1=currentRow.find("td:eq(0)").text(); // id
        var col2=currentRow.find("td:eq(1)").text(); // Identificación
        var col3=currentRow.find("td:eq(2)").text(); // Nombre
        var col4=currentRow.find("td:eq(3)").text(); // direccion
        var col5=currentRow.find("td:eq(4)").text(); // celular
        var col6=currentRow.find("td:eq(5)").text(); // email
        var col7=currentRow.find("td:eq(6)").text(); // zona
        var col8=currentRow.find("td:eq(7)").text(); // tipo usuario
        // var data=col1+"\n"+col2+"\n"+col3+"\n"+col4+"\n"+col5;
        // alert(data);
        $('#id').val(col1);
        $('#identification').val(col2);
        $('#name').val(col3);
        $('#address').val(col4);
        $('#cellPhone').val(col5);
        $('#email').val(col6);
        $('#zone').val(col7);
        $('#type').val(col8);
    });
}

function saveEditUser(){
    let data={
        id:$("#id").val(),
        identification:$("#identification").val(),
        name:$("#name").val(),
        address:$("#address").val(),
        cellPhone:$("#cellPhone").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        type:$("#type").val(),
        zone:$("#zone").val()
    };
    let dataToSend=JSON.stringify(data);
    $.ajax({
        type:"PUT",
        contentType: "application/json; charset=utf-8",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/user/update",
        //url:"http://localhost:8080/api/user/update",
        success:function(respuesta){
            $("#id").val("");
            $("#identification").val("");
            $("#name").val("");
            $("#address").val("");
            $("#cellPhone").val("");
            $("#email").val("");
            $("#password").val("");
            $("#type").val("");
            $("#zone").val("");
            loadUserAll();
            alert("Se Actualizo Usuario Exitosamente")
        }
    });
}

function deleteUser(idElemento){
    let data={
        id:idElemento
    };
    let dataToSend=JSON.stringify(data);
    $.ajax({
        type:"DELETE",
        contentType: "application/json; charset=utf-8",
        data:dataToSend,
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/user/"+idElemento,
        //url:"http://localhost:8080/api/user/"+idElemento,
        success:function(respuesta){
            $("#resultado").empty();
            loadUserAll();
            alert("Se Eliminado Usuario Exitosamente")
        }
    });
}