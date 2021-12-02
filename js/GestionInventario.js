function loadInventarioAll(){
    $.ajax({
        type:"GET",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/supplements/all",
        //url:"http://localhost:8080/api/supplements/all",
        success:function(respuesta){
            console.log(respuesta);
            loadResponseInv(respuesta);
        }
    });
}

function loadResponseInv(items){
    $("tbody").children().remove()
    var tableBody = $('#tblInventario tbody');
    var filaTabla = "";
    for (var i=0; i<items.length; i++) {
        filaTabla += "<tr>";
        filaTabla += "<td>"+items[i].reference+"</td>";
        filaTabla += "<td>"+items[i].brand+"</td>";
        filaTabla += "<td>"+items[i].category+"</td>";
        filaTabla += "<td>"+items[i].objetivo+"</td>";
        filaTabla += "<td>"+items[i].description+"</td>";
        filaTabla += "<td>"+items[i].availability+"</td>";
        filaTabla += "<td>"+items[i].price+"</td>";
        filaTabla += "<td>"+items[i].quantity+"</td>";
        filaTabla += "<td>"+items[i].photography+"</td>";
        filaTabla +="<td> <button class='btn btn-primary btn-sm btnSelect' onclick='passEditItem()'>Editar</button><button style='margin-left: 10px' class='btn btn-danger btn-sm' onclick='deleteItem("+String(items[i].reference)+")'>Eliminar</button> </td>";
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
        //url:"http://localhost:8080/api/supplements/new",
        success:function(respuesta){
            if (respuesta.reference != null) {
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
                alert("Se Creo Nuevo Item Exitosamente")
            } else {
                alert("ERROR - El Item ingresado ya existe, verifique!")
            }
        }
    });
}

function passEditItem(){
    $("#tblInventario").on('click','.btnSelect',function(){
        // get the current row
        var currentRow=$(this).closest("tr");
        var col1=currentRow.find("td:eq(0)").text(); // reference
        var col2=currentRow.find("td:eq(1)").text(); // brand
        var col3=currentRow.find("td:eq(2)").text(); // category
        var col4=currentRow.find("td:eq(3)").text(); // objetivo
        var col5=currentRow.find("td:eq(4)").text(); // description
        var col6=currentRow.find("td:eq(5)").text(); // availability
        var col7=currentRow.find("td:eq(6)").text(); // price
        var col8=currentRow.find("td:eq(7)").text(); // quantity
        var col9=currentRow.find("td:eq(8)").text(); // photography
        // var data=col1+"\n"+col2+"\n"+col3+"\n"+col4+"\n"+col5;
        // alert(data);
        $('#reference').val(col1);
        $('#brand').val(col2);
        $('#category').val(col3);
        $('#objetivo').val(col4);
        $('#description').val(col5);
        $('#availability').val(col6);
        $('#price').val(col7);
        $('#quantity').val(col8);
        $('#photography').val(col9);
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
        url:"http://150.230.41.201:80/api/supplements/update",
        //url:"http://localhost:8080/api/supplements/update",
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
    $.ajax({
        type:"DELETE",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        url:"http://150.230.41.201:80/api/supplements/"+idElemento,
        //url:"http://localhost:8080/api/supplements/"+idElemento,
        success:function(respuesta){
            $("#resultado").empty();
            loadInventarioAll();
            alert("Se Elimino Item Exitosamente")
        }
    });
}