var BookmarkView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('#bookmarkTemplate').html()),
    events: {
        'dblclick #showName': 'updateName',
        'dblclick #showAddress': 'updateAddress',
        'dblclick #showTags': 'updateTags',
        'keypress #editName': 'nameOnEnter',
        'keypress #editAddress': 'addressOnEnter',
        'keypress #editTags': 'tagsOnEnter',
        'blur #editName': 'close',
        'blur #editAddress': 'close',
        'blur #editTags': 'close',
        'click button#deleteBookmark': 'removeBookmark',
        'click button#visitPage': 'visitPage'
    },
    initialize : function() {
        _.bindAll(this, 'render', 'updateName', 'updateAddress', 'updateTags', 'nameOnEnter', 'addressOnEnter', 'tagsOnEnter', 'close', 'removeBookmark', 'unshowBookmark', 'visitPage');
        this.model.bind('remove', this.unshowBookmark);
        this.model.listenTo(this.model, 'change', this.render);
    },
    render : function() {
        // Template is defined in index.html
        $(this.el).html(this.template(this.model.toJSON()));
        this.$showName = $(this.el).find('#showName');
        this.$showAddress = $(this.el).find('#showAddress');
        this.$showTags = $(this.el).find('#showTags');
        this.$editName = $(this.el).find('#editName');
        this.$editAddress = $(this.el).find('#editAddress');
        this.$editTags = $(this.el).find('#editTags');
        this.$editName.hide();
        this.$editAddress.hide();
        this.$editTags.hide();
        return this; // for chainable calls, like .render().el
    },
    /* Update */
    updateName : function() {
        this.$editName.show();
        this.$editName.focus();
        this.$showName.hide();
    },
    updateAddress : function() {
        this.$editAddress.show();
        this.$editAddress.focus();
        this.$showAddress.hide();
    },
    updateTags : function() {
        this.$editTags.show();
        this.$editTags.focus();
        this.$showTags.hide();
    },
    nameOnEnter : function(e) {
        // ENTER_KEY is defined in app.js
        if (e.which === ENTER_KEY) {
            var value = this.$editName.val().trim();
            if (value) {
                this.model.save({ name: value });
            }
            this.close();
        }
    },
    addressOnEnter : function(e) {
        var value = this.$editAddress.val().trim();
        if (value.indexOf('http://') !== 0) {
            value = 'http://' + value;
        }
        var existingModel = this.collection.bookmarkList.where({address: value});
        // ENTER_KEY is defined in app.js
        if (e.which === ENTER_KEY) {
            if (value && value !== 'http://' && existingModel.length === 0) {
                this.model.save({ address: value });
            }
            this.close();
        }
    },
    tagsOnEnter : function(e) {
        // ENTER_KEY is defined in app.js
        if (e.which === ENTER_KEY) {
            var value = this.$editTags.val().trim();
            if (value) {
                this.model.save({ tags: value });
            }
            this.close();
        }
    },
    close : function() {
        this.$showName.show();
        this.$showAddress.show();
        this.$showTags.show();
        this.$editName.hide();
        this.$editAddress.hide();
        this.$editTags.hide();
    },
    /* Destroy */
    removeBookmark : function() {
        this.model.destroy();
    },
    unshowBookmark : function() {
        $(this.el).remove();
        this.collection.resetFields();
    },
    /* Other */
    visitPage : function() {
        window.open(this.model.get('address'),'_newtab');
    }
});
