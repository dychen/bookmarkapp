var BookmarkListView = Backbone.View.extend({
    el: '#bookmarkapp',
    events: {
        'click button#createBookmark': 'addBookmark',
        'click button#filterBookmarks': 'filterBookmarks',
        'click button#showAllBookmarks': 'showAllBookmarks'
    },
    initialize : function() {
        //_.bindAll(this, 'render', 'addBookmark', 'showAddedBookmark');
        //this.numShown = 0;
        this.bookmarkList = new BookmarkList();
        //this.bookmarkList.bind('add', this.showAddedBookmark);
        //this.updateHeader(this.numShown);

    },
    render : function() {
        // Currently empty
    },
    getInputValues : function() {
        return {
            name: this.$('#createBookmarkName').val().trim(),
            address: this.$('#createBookmarkAddress').val().trim(),
            tags: this.$('#createBookmarkTags').val().trim()
        }
    },
    addBookmark : function() {
        var input = this.getInputValues();
        var warnings = this.errorCheck({name: input.name, address: input.address});
        if (warnings) {
            var alert = this.createAlert(warnings);
            $('#alertbox').html(alert);
            return;
        }
        else {
            $('#alertbox').html('');
        }
        if (input.address.indexOf('http://') !== 0) {
            input.address = 'http://' + input.address;
        }
        // Deal with empty tags
        if (input.tags == '') {
            input.tags = input.name;
        }
        var bookmark = new Bookmark(input);
        this.bookmarkList.add(bookmark);
        this.showAddedBookmark(bookmark);
    },
    showAddedBookmark : function(bookmark) {
        var bookmarkView = new BookmarkView({ model: bookmark, collection: this });
        bookmarkView.render();
        $('#bookmarkList').append(bookmarkView.el);
        // Reset input form values to default on submit.
        $('#createBookmarkName').val('');
        $('#createBookmarkAddress').val('');
        $('#createBookmarkTags').val('');
        //this.numShown++;
        //this.updateHeader(this.numShown);
    },
    showFilteredBookmarks : function(inputArray) {
        $('#bookmarkList').html('');
        for (var i=0; i<inputArray.length; i++) {
            this.showAddedBookmark(inputArray[i]);
        }
        //this.numShown = inputArray.length;
        //this.updateHeader(this.numShown);
    },
    showAllBookmarks : function() {
        $('#bookmarkList').html('');
        this.bookmarkList.each(function(bookmark) {
            this.showAddedBookmark(bookmark);
        }, this);
        //this.numShown = this.bookmarkList.length;
        //this.updateHeader(this.numShown);
    },
    filterBookmarks : function() {
        var input = this.getInputValues();
        var filteredBookmarks = this.bookmarkList.filter(function(bookmark) {
            return bookmark.get('name').indexOf(input.name) !== -1 &&
                   bookmark.get('address').indexOf(input.address) !== -1 &&
                   bookmark.get('tags').indexOf(input.tags) !== -1;
        });
        this.showFilteredBookmarks(filteredBookmarks);
    },
    /* Helpers */
    createAlert : function(msg) {
        var html = '';
        html += '<div class="alert alert-block alert-info">';
        html += '<button type="button" class="close" data-dismiss="alert" href="#">&times;</button>'
        html += '<strong>Oops! Your bookmark wasn\'t added.</strong><br>'+msg;
        html += '</div>';
        return html;
    },
    errorCheck : function(input) {
        var warning = [];
        if (!input.name) {
            warning.push('Please input a name for your bookmark.');
        }
        if (!input.address || input.address === 'http://') {
            warning.push('Please input an address for your bookmark.');
        }
        var modAddress = input.address;
        if (modAddress.indexOf('http://') !== 0) {
            modAddress = 'http://' + modAddress;
        }
        var existingModel = this.bookmarkList.where({address: modAddress});
        if (input.address && existingModel.length > 0) {
            warning.push('You\'ve already added this link!');
        }
        return warning.join('<br>');
    },
    /*
    updateHeader : function(n) {
        $('#bookmarkHead').html('Bookmarks (' + n + ')');
    },
    */
});


