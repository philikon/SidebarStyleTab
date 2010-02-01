var SidebarStyleTabResizer = {

    init: function() {
        this.buttonsStrip = document.getElementById("statusbar-tabbar-buttons");
        this.buttonsStrip.addEventListener("DOMAttrModified", this, false);

        this.tabbrowserStrip = document.getElementById('content').mStrip;
        this.tabbrowserStrip.addEventListener("DOMAttrModified", this, false);

        this.splitter = document.getElementById('statusbar-tabbar-splitter');
        this.splitter.addEventListener('mouseup', this, false);

        /* We don't expect the splitter to change width */
        this.splitterWidth = this.splitter.boxObject.width;

        /* You'd think you wouldn't need the following line, but you do... */
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

    afterResize: function(event) {
        TreeStyleTabService.setTreePref('tabbar.width',
                                        this.tabbrowserStrip.boxObject.width);
    },

	handleEvent: function(event) {
		switch (event.type) {
        case 'load':
            this.init();
            return;
        case 'DOMAttrModified':
            this.onAttrModified(event);
            return;
        case 'mouseup':
            this.afterResize(event);
            return;
        }
    }
};

window.addEventListener('load', SidebarStyleTabResizer, false);
