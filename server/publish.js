// Rooms -- {num: String, capacity: String, beds: int, extra_bed: Boolean}
Rooms = new Meteor.Collection("rooms");

// Publish all rooms
Meteor.publish('rooms', function () {
    return Rooms.find();
});


// Reservations -- {check_in: Date, check_out: Date, rooms: [{room_id: _id, adults: int}, ..], guest: {name: String}, partner: _id, detail: String}
Reservations = new Meteor.Collection("reservations");

// Publish all reservations for a period
Meteor.publish('reservations', function (options) {
    // TODO: время в 00:00
    options = {date: new Date(), days: 14};
    
    var start = options.date;
    var end = new Date();
    // TODO: время на 24:00
    end.setDate(start.getDate() + options.days)
    
    // TODO: distinct
    return Reservations.find({
        $or: [
            {
                $and: [{
                    "check_in": { $gte: start },
                    "check_in": { $lte: end }
                }]
            },
            {
                $and: [{
                    "check_out": { $gte: start },
                    "check_out": { $lte: end }
                }]
            }
        ]
    });
});

// Partners -- {name: String, short_name: String}
Partners = new Meteor.Collection("partners");

Meteor.publish("partners", function(){
    // TODO: только партнеров для отображаемых резерваций
    return Partners.find();
});