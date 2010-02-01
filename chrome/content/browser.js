var SidebarStyleTabResizer = {

    init: function() {
        this.buttonsStrip = document.getElementById("statusbar-tabbar-buttons");
        this.buttonsStrip.addEventListener("DOMAttrModified", this, false);
        this.tabbrowserStrip = document.getElementById('content').mStrip;
        this.tabbrowserStrip.addEventListener("DOMAttrModified", this, false);

        /* We don't expect the splitter to change width */
        var splitter = document.getElementById('statusbar-tabbar-splitter');
        this.splitterWidth = splitter.boxObject.width;

        this.buttonsStrip.width = this.tabbrowserStrip.width;
    },

    onAttrModified: function(event) {
        if (event.attrName != 'width') {
            return;
        }

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

	handleEvent: function(event) {
		switch (event.type) {
        case 'load':
            this.init();
            return;
        case 'DOMAttrModified':
            this.onAttrModified(event);
            return;
        }
    }
};

window.addEventListener('load', SidebarStyleTabResizer, false);
