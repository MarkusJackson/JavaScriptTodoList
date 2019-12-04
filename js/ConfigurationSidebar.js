let toogleNavStatus = false;

let toggleNav = function () {

    let sidebar = document.querySelector(".nav-sidebar");
    let sidebarUl = document.querySelector(".nav-sidebar ul");
    let sidebarTitle = document.querySelector(".nav-sidebar span");
    let sidebarLinks = document.querySelectorAll(".nav-sidebar a");

    if (toogleNavStatus === false) {
        sidebarUl.style.visibility = "visible";
        sidebar.style.width = "280px";
        sidebarTitle.style.opacity = "0.7";
        sidebarLinks.forEach(link => link.style.opacity = "1");

        toogleNavStatus = true;
    } else if (toogleNavStatus === true) {
        sidebarTitle.style.opacity = "0";
        sidebarLinks.forEach(link => link.style.opacity = "0");
        sidebarUl.style.visibility = "hidden";
        sidebar.style.width = "30px";

        toogleNavStatus = false;
    }

}