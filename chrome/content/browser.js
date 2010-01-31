var SidebarStyleTabResizer = {

    init: function() {
        this.buttonsStrip = document.getElementById("statusbar-tabbar-buttons");
        this.buttonsStrip.addEventListener("DOMAttrModified", this, false);
        this.tabbrowserStrip = document.getElementById('content').mStrip;
        this.tabbrowserStrip.addEventListener("DOMAttrModified", this, false);

        this.buttonsStrip.width = this.tabbrowserStrip.width;
        this.execute = true;
    },

    onAttrModified: function(event) {
        if (event.attrName != 'width') {
            return;
        }

        /* We want to prevent unnecessary calls
           (e.g. x.width = y.width --> y.width = x.width and so on.) */
        if (!this.execute) {
            this.execute = true;
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

        /* Prevent at least the next call to this method. */
        this.execute = false;
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
