var BookmarkListView = Backbone.View.extend({
    el: '#bookmarkapp',
    events: {
        'click button#createBookmark': 'addBookmark'
    },
    initialize : function() {
        //_.bindAll(this, 'render', 'addBookmark', 'showAddedBookmark');
        this.numBookmarks = 0;
        this.bookmarkList = new BookmarkList();
        this.bookmarkList.bind('add', this.showAddedBookmark);
        this.render();
    },
    render : function() {
        /*
        var self = this;
        this.bookmarkList.each(function(item){
            self.showAddedBookmark(item);
        }, this);
        */
    },
    getInputValues : function() {
        return {
            name: this.$('#createBookmarkName').val().trim(),
            address: this.$('#createBookmarkAddress').val().trim(),
            tags: this.$('#createBookmarkTags').val().trim()
        }
    },
    addBookmark : function() {
        var name = this.$('#createBookmarkName').val().trim();
        var address = this.$('#createBookmarkAddress').val().trim();
        var warnings = this.errorCheck({name: name, address: address});
        if (warnings) {
            var alert = this.createAlert(warnings);
            $('#alertbox').html(alert);
            return;
        }
        else {
            $('#alertbox').html('');
        }
        this.numBookmarks++;
        var bookmark = new Bookmark(this.getInputValues());
        this.bookmarkList.add(bookmark);
    },
    showAddedBookmark : function(bookmark) {
        var bookmarkView = new BookmarkView({ model: bookmark });
        bookmarkView.render();
        $('#bookmarkList').append(bookmarkView.el);
    },
    /* Helpers */
    createAlert : function(msg) {
        var html = '';
        html += '<div class="alert alert-block">';
        html += '<strong>Oops! Your bookmark wasn\'t added.</strong><br>'+msg;
        html += '</div>';
        return html;
    },
    errorCheck : function(input) {
        var warning = [];
        if (!input.address) {
            warning.push('You must input an address for your bookmark.');
        }
        if (!input.name) {
            warning.push('You must input a name for your bookmark.');
        }
        var existingModel = this.bookmarkList.where({address: input.address});
        if (input.address && existingModel.length > 0) {
            warning.push('You already added this link!');
        }
        return warning.join('<br>');
    }
});


