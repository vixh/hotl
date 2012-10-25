// Client-side JavaScript, bundled and sent to client.

// Define Minimongo collections to match server/publish.js.
Rooms = new Meteor.Collection("rooms");
Reservations = new Meteor.Collection("reservations");

// Current date reservations start to show
Session.set('current_date', new Date());

// Subscribe to 'rooms' on startup
Meteor.subscribe('rooms');

// Always be subscribed to reservations
Meteor.autosubscribe(function(){
    var current_date = Session.get('current_date');
    Meteor.subscribe('reservations', {date: current_date, days: 14});
});

/////////////// Reservation Table //////////////

Template.reservation_table.rooms = function(){
    return Rooms.find();
};

Template.reservation_table.reservations = function(){
    return Reservations.find({}, {sort: {check_in: -1}});
};