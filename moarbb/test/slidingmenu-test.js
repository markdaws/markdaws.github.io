$(document).ready(function() {

    var slidingMenu = new moarbb.views.SlidingMenuView({
        // optional - the view that appears in the header area
        header: new TestHeader({ testName: 'foo' }),

        // required - the view that appears in the content area
        content: new TestContent({ testName: 'abc'}),

        // required - the view that renders the menu
        menu: new TestMenu({}),

        // If true the burger icon you can click on is hidden,
        // then it is up to you to build the open/close dynamics
        // in to your header view
        hideBurger: false,

        // If true the menu initially appears open on load
        menuOpen: false,

        // The width of the opened menu
        menuWidth: 350
    });

    $('#content').append(slidingMenu.$el);
    slidingMenu.render();

    // In this example, when the user clicks on a menu item
    // we update the sliding menu content and header view
    slidingMenu.menu.on('menuItemClicked', function(index) {
        slidingMenu.setContent(new TestContent({ testName: index }));
        slidingMenu.setHeader(new TestHeader({ testName: index }));
    });
});

// Test view showing content
var TestContent = Backbone.View.extend({
    render: function() {
        for(var i=0; i<100; ++i) {
            this.$el.append($('<div style="width:200px;height:200px;margin-bottom:10px;' + 
                              'background-color:#0000ff;color:#fff;padding:10px;">' + 
                              this.options.testName + ' : ' + i 
                              + '</div>'));
        }
        this.$el.css({ 'background-color': '#ff0000' });
    }
});

// Test menu view
var TestMenu = Backbone.View.extend({
    render: function() {
        var $ul = $('<ul style="margin:0"></ul>');
        for(var i=0; i<100; ++i) {
            $ul.append($('<li style="cursor:pointer;margin-bottom:10px;">Menu Item ' + i + '</li>'));
        }
        this.$el.append($ul);

        var self = this;
        this.$('li').click(function(e) {
            self.trigger('menuItemClicked', $(this).index());
        });

        this.$el.css({ 'background-color': '#aaaaaa' });
    }
});

// Test menu header
var TestHeader = Backbone.View.extend({
    render: function() {
        this.$el.html($('<span>I am a header - ' +
                        this.options.testName
                        + '</span>'));
    }
});