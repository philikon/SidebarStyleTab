/* Monkey-patch this method so that we don't get these ugly
   parentheses around the tab count.

   This is essentially a modified copy of the original method in
   chrome://treestyletab/content/treestyletabbrowser.js */

TreeStyleTabBrowser.prototype.updateTabsCount = function (aTab, aDontUpdateAncestor) {
    var count = document.getAnonymousElementByAttribute(aTab, 'class', this.kCOUNTER);
    if (count) {
        count.setAttribute('value', this.getDescendantTabs(aTab).length);
    }
    var parent = this.getParentTab(aTab);
    if (parent && !aDontUpdateAncestor)
        this.updateTabsCount(parent);
}
