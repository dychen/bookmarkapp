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
        var warning = '';
        var name = this.$('#createBookmarkName').val().trim();
        var address = this.$('#createBookmarkAddress').val().trim();
        if (!address) {
            warning = 'You must input an address for your bookmark.';
        }
        if (!name) {
            warning = 'You must input a name for your bookmark.';
            if (!address) {
            warning = 'You must input both a name and an address for your bookmark.';
            }
        }
        if (warning) {
            var alert = this.createAlert(warning);
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
        html += '<div class="alert">';
        html += '<strong>Oops!</strong> '+msg;
        html += '</div>';
        return html;
    }
});


