function skillsMember(){
    if (localStorage.getItem("token")) {
        document.getElementById("login").style.display = "none";
        document.getElementById("logout").style.display = "block";
    } else {
        document.getElementById("login").style.display = "block";
        document.getElementById("logout").style.display = "none";
    }
}