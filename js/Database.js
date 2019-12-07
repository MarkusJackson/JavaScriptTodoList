function printDatabase() {

    var i;

    console.log("Datbase Content:");
    for (i = 0; i < localStorage.length; i++) {
        console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
    }


}

function resetDatabase() {
    console.warn("Resetting Database");
    localStorage.clear();
}