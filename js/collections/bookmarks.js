var BookmarkList = Backbone.Collection.extend({
    model: Bookmark,
    localStorage: new Backbone.LocalStorage('bookmarks-backbone')
});
