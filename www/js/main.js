var app = {

    findByName: function() {
        console.log('findByName');
        this.store.findByName($('.search-key').val(), function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    },
    
    showAlert: function (message, title) {
        if (navigator.notification) {
            alert('about to show native alert');
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert('about to show webpage alert');
            alert(title ? (title + ": " + message) : message);
        }
    },

    initialize: function() {
        this.store = new WebSqlStore(function() {
            app.showAlert('Store Initialized', 'Info');
        });
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    }

};

app.initialize();