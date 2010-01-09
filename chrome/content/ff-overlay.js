SidebarStyleTabs.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ SidebarStyleTabs.showFirefoxContextMenu(e); }, false);
};

SidebarStyleTabs.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-SidebarStyleTabs").hidden = gContextMenu.onImage;
};

window.addEventListener("load", SidebarStyleTabs.onFirefoxLoad, false);
