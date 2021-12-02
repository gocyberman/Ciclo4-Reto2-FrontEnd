function loadInventarioAll(){
    $.ajax({
        type:"GET",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/user/all",
        success:function(respuesta){
            console.log(respuesta);
            loadResponseUser(respuesta);
        }
    });
}

function loadResponseUser(items){
    $("tbody").children().remove()
    var tableBody = $('#tblInventario tbody');
    var filaTabla = "";
    for (var i=0; i<items.length; i++) {
        filaTabla += "<tr>";
        filaTabla += "<td>"+items[i].id+"</td>";
        filaTabla += "<td>"+items[i].reference+"</td>";
        filaTabla += "<td>"+items[i].brand+"</td>";
        filaTabla += "<td>"+items[i].category+"</td>";
        filaTabla += "<td>"+items[i].objetivo+"</td>";
        filaTabla += "<td>"+items[i].description+"</td>";
        filaTabla += "<td>"+items[i].availability+"</td>";
        filaTabla += "<td>"+items[i].price+"</td>";
        filaTabla += "<td>"+items[i].quantity+"</td>";
        filaTabla += "<td>"+items[i].photography+"</td>";
        filaTabla +="<td> <button class='btn btn-primary btn-sm btnSelect' onclick='passEditItem()'>Editar</button><button style='margin-left: 10px' class='btn btn-danger btn-sm' onclick='deleteItem("+items[i].id+")'>Eliminar</button> </td>";
        filaTabla +="</tr>";
    }
    tableBody.append(filaTabla);
}

function saveNewItem(username) {
    let data={
        reference:$("#reference").val(),
        brand:$("#brand").val(),
        category:$("#category").val(),
        objetivo:$("#objetivo").val(),
        description:$("#description").val(),
        availability:$("#availability").val(),
        price:$("#price").val(),
        quantity:$("#quantity").val(),
        photography:$("#photography").val()
    };
    let dataToSend=JSON.stringify(data);
    $.ajax({
        type:"POST",
        contentType: "application/json; charset=utf-8",
        data:dataToSend,
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/supplements/new",
        success:function(respuesta){
            if (respuesta.id != null) {
                $("#reference").val("");
                $("#brand").val("");
                $("#category").val("");
                $("#objetivo").val("");
                $("#description").val("");
                $("#availability").val("");
                $("#price").val("");
                $("#quantity").val("");
                $("#photography").val("");
                alert("Se Creo Nuevo Item Exitosamente")
            } else {
                alert("ERROR - El Item ingresado ya existe, verifique!")
            }
        }
    });
}

function passEditItem(){
    $("#tblUsuarios").on('click','.btnSelect',function(){
        // get the current row
        var currentRow=$(this).closest("tr");
        var col1=currentRow.find("td:eq(0)").text(); // id
        var col2=currentRow.find("td:eq(1)").text(); // reference
        var col3=currentRow.find("td:eq(2)").text(); // brand
        var col4=currentRow.find("td:eq(3)").text(); // category
        var col5=currentRow.find("td:eq(4)").text(); // objetivo
        var col6=currentRow.find("td:eq(5)").text(); // description
        var col7=currentRow.find("td:eq(6)").text(); // availability
        var col8=currentRow.find("td:eq(7)").text(); // price
        var col9=currentRow.find("td:eq(8)").text(); // quantity
        var col10=currentRow.find("td:eq(9)").text(); // photography
        // var data=col1+"\n"+col2+"\n"+col3+"\n"+col4+"\n"+col5;
        // alert(data);
        $('#id').val(col1);
        $('#reference').val(col2);
        $('#brand').val(col3);
        $('#category').val(col4);
        $('#objetivo').val(col5);
        $('#description').val(col6);
        $('#availability').val(col7);
        $('#price').val(col8);
        $('#quantity').val(col9);
        $('#photography').val(col10);
    });
}

function saveEditUser(){
    let data={
        reference:$("#reference").val(),
        brand:$("#brand").val(),
        category:$("#category").val(),
        objetivo:$("#objetivo").val(),
        description:$("#description").val(),
        availability:$("#availability").val(),
        price:$("#price").val(),
        quantity:$("#quantity").val(),
        photography:$("#photography").val()
    };
    let dataToSend=JSON.stringify(data);
    $.ajax({
        type:"PUT",
        contentType: "application/json; charset=utf-8",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/update",
        success:function(respuesta){
            $("#reference").val("");
            $("#brand").val("");
            $("#category").val("");
            $("#objetivo").val("");
            $("#description").val("");
            $("#availability").val("");
            $("#price").val("");
            $("#quantity").val("");
            $("#photography").val("");
            loadInventarioAll();
            alert("Se Actualizo Item Exitosamente")
        }
    });
}

function deleteItem(idElemento){
    let data={
        id:idElemento
    };
    let dataToSend=JSON.stringify(data);
    $.ajax({
        type:"DELETE",
        contentType: "application/json; charset=utf-8",
        data:dataToSend,
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/"+idElemento,
        success:function(respuesta){
            $("#resultado").empty();
            loadInventarioAll();
            alert("Se Elimino Item Exitosamente")
        }
    });
}