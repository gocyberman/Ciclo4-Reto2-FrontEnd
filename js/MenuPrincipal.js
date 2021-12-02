window.onload = function(){
    //Cargamos el valor de la local storage en el inputr del menu principal
    let varTemp = localStorage.getItem('usuario')
    $('#varUsuario').html(varTemp);
}
