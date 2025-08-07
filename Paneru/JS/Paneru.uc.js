// ==UserScript==
// @name        Firefox Workspaces
// @description Adds workspace support: save/restore tab groups, pinned tabs, and tab groups
// ==/UserScript==

(function() {
  // Store workspaces in-memory (or use Services.prefs for persistence)
  let workspaces = {};

  function saveWorkspace(name) {
    let tabs = gBrowser.tabs;
    let workspace = {
      tabs: [],
      pinned: [],
    };
    for (let tab of tabs) {
      let tabInfo = {
        url: tab.linkedBrowser.currentURI.spec,
        pinned: tab.pinned,
        // Add more tab info if needed
      };
      if (tab.pinned) {
        workspace.pinned.push(tabInfo);
      } else {
        workspace.tabs.push(tabInfo);
      }
    }
    workspaces[name] = workspace;
    // Optionally persist to disk or prefs
    alert(`Workspace "${name}" saved!`);
  }

  function loadWorkspace(name) {
    let workspace = workspaces[name];
    if (!workspace) {
      alert(`Workspace "${name}" not found!`);
      return;
    }
    // Close all tabs except one (to avoid closing the window)
    while (gBrowser.tabs.length > 1) {
      gBrowser.removeTab(gBrowser.tabs[0]);
    }
    // Load pinned tabs
    for (let tabInfo of workspace.pinned) {
      let tab = gBrowser.addTab(tabInfo.url);
      gBrowser.pinTab(tab);
    }
    // Load normal tabs
    for (let tabInfo of workspace.tabs) {
      gBrowser.addTab(tabInfo.url);
    }
    alert(`Workspace "${name}" loaded!`);
  }

  // Example usage: add menu items or hotkeys to call saveWorkspace/loadWorkspace
  // saveWorkspace("work1");
  // loadWorkspace("work1");
})();