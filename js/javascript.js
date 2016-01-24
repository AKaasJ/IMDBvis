/**
 * Created by cristiprg on 1/23/2016.
 */

function sayHello(){
    var id = document.getElementById("ID_input").value;
    $.get("getactor.php?id=123", function(data) {
        alert("Data loaded: " + data);
    });
}