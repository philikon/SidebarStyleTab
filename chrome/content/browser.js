var SidebarStyleTabbarResizer = {

    mPrefs: Components.classes['@mozilla.org/preferences-service;1']
            .getService(Ci.nsIPrefService).getBranch(null),

    init: function() {
        window.removeEventListener("DOMContentLoaded", this, false);

        this.tabbrowser = document.getElementById("content");
        this.buttonsStrip = document.getElementById("statusbar-tabbar-buttons");
        this.tabbrowserStrip = this.tabbrowser.mStrip;
        this.splitter = document.getElementById('statusbar-tabbar-splitter');

        if (!this.mPrefs.getBoolPref("extensions.sidebarstyletab.showStatusBarSplitters")) {
            this.buttonsStrip.hidden = this.splitter.hidden = true;
            return;            
        }
        this.setUpSplitter();
    },

    setUpSplitter: function() {
        this.tabbrowser.addEventListener("TreeStyleTabTabbarPositionChanged", this, false);
        this.buttonsStrip.addEventListener("DOMAttrModified", this, false);
        this.tabbrowserStrip.addEventListener("DOMAttrModified", this, false);
        this.splitter.addEventListener('mouseup', this, false);

        /* We don't expect the splitter to change width */
        this.splitterWidth = this.splitter.boxObject.width;

        /* You'd think you wouldn't need the following line, but you do... */
        this.buttonsStrip.width = this.tabbrowserStrip.width - this.splitterWidth;
    },

    onTabbarPositionChanged: function(event) {
        if (event.newPosition == "left") {
            this.buttonsStrip.hidden = this.splitter.hidden = false;
        } else {
            this.buttonsStrip.hidden = this.splitter.hidden = true;
        }
    },

    onWidthChange: function(event) {
        /* TreeStyleTab at one point removes tabbrowser.mStrip.width,
           then adds it back later. */
        if (!event.target.width) {
            return;
        }

        var newwidth = parseInt(event.target.width);
        if (event.target === this.buttonsStrip) {
            this.tabbrowserStrip.width = newwidth + this.splitterWidth;
        } else {
            this.buttonsStrip.width = newwidth - this.splitterWidth;
        }
    },

    afterResize: function(event) {
        TreeStyleTabService.setTreePref('tabbar.width',
                                        this.tabbrowserStrip.boxObject.width);
    },

	handleEvent: function(event) {
		switch (event.type) {
        case 'DOMContentLoaded':
            this.init();
            return;
        case 'DOMAttrModified':
            if (event.attrName == 'width') {
                this.onWidthChange(event);
            }
            return;
        case 'mouseup':
            this.afterResize(event);
            return;
        case 'TreeStyleTabTabbarPositionChanged':
            this.onTabbarPositionChanged(event);
            return;
        }
    }
};

var SidebarStyleSidebarResizer = {

    mPrefs: Components.classes['@mozilla.org/preferences-service;1']
            .getService(Ci.nsIPrefService).getBranch(null),

    init: function() {
        window.removeEventListener("DOMContentLoaded", this, false);

        this.statusbarStrip = document.getElementById("statusbar-sidebar-buttons");
        this.sidebarBox = document.getElementById("sidebar-box");
        this.splitter = document.getElementById('statusbar-sidebar-splitter');

        if (!this.mPrefs.getBoolPref("extensions.sidebarstyletab.showStatusBarSplitters")) {
            this.statusbarStrip.hidden = this.splitter.hidden = true;
            return;            
        }
        this.setUpSplitter();
        },

    setUpSplitter: function() {
        this.statusbarStrip.addEventListener("DOMAttrModified", this, false);
        this.sidebarBox.addEventListener("DOMAttrModified", this, false);
        this.splitter.addEventListener('mouseup', this, false);

        /* We don't expect the splitter to change width */
        this.splitterWidth = this.splitter.boxObject.width;

        /* You'd think you wouldn't need the following line, but you do... */
        this.statusbarStrip.width = this.sidebarBox.width - this.splitterWidth;

        this.statusbarStrip.hidden = this.sidebarBox.hidden;
        this.splitter.hidden = this.sidebarBox.hidden;
    },

    onWidthChange: function(event) {
        var newwidth = parseInt(event.target.width);
        if (event.target === this.statusbarStrip) {
            this.sidebarBox.width = newwidth + this.splitterWidth;
        } else {
            this.statusbarStrip.width = newwidth - this.splitterWidth;
        }
    },

    onHiddenChange: function(event) {
        if (event.target === this.sidebarBox) {
            this.statusbarStrip.hidden = event.target.hidden;
            this.splitter.hidden = event.target.hidden;
        }
    },

    handleEvent: function(event) {
		switch (event.type) {
        case 'DOMContentLoaded':
            this.init();
            return;
        case 'DOMAttrModified':
            if (event.attrName == 'width') {
                this.onWidthChange(event);
            } else if (event.attrName == 'hidden') {
                this.onHiddenChange(event);
            }
            return;
        }
    }
};

window.addEventListener('DOMContentLoaded', SidebarStyleTabbarResizer, false);
window.addEventListener('DOMContentLoaded', SidebarStyleSidebarResizer, false);
