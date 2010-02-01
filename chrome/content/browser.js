var SidebarStyleTabResizer = {

    init: function() {
        this.buttonsStrip = document.getElementById("statusbar-tabbar-buttons");
        this.buttonsStrip.addEventListener("DOMAttrModified", this, false);
        this.tabbrowserStrip = document.getElementById('content').mStrip;
        this.tabbrowserStrip.addEventListener("DOMAttrModified", this, false);

        this.buttonsStrip.width = this.tabbrowserStrip.width;
    },

    onAttrModified: function(event) {
        if (event.attrName != 'width') {
            return;
        }

        var other;
        if (event.target === this.buttonsStrip) {
            other = this.tabbrowserStrip;
        } else {
            other = this.buttonsStrip;
        }

        /* TreeStyleTab at one point removes tabbrowser.mStrip.width,
           then adds it back later. */
        if (event.target.width) {
            other.width = event.target.width;
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
