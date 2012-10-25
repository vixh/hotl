// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
    
    var room_ids = [];
    if(Rooms.find().count() === 0){
        var data = [
            {num: '1', capacity: '2+1', beds: 2, extra_bed: true},
            {num: '2', capacity: '2', beds: 2, extra_bed: false},
            {num: '3', capacity: '1+1', beds: 1, extra_bed: true},
            {num: '4', capacity: '1', beds: 1, extra_bed: false},
        ];
    }
    _.each(data, function(r){
        room_ids.push(Rooms.insert(r));
    });
    
    
    if (Reservations.find().count() === 0) {
        var DAY = 24 * 60 * 60;
        var today = new Date();
        var data = [
        {
            "check_in": new Date(today.getTime() + 3 * DAY),
            "check_out": new Date(today.getTime() + 5 * DAY),
            "rooms": [{room_id: room_ids[0], adults: 2}],
            "guest": {name: 'Smorodin'},
            // "partner": Meteor.uuid(),
            "detail": 'String'
        },
        {
            "check_in": new Date(today.getTime() + 5 * DAY),
            "check_out": new Date(today.getTime() + 6 * DAY),
            "rooms": [{room_id: room_ids[0], adults: 1, child: 1}],
            "guest": {name: 'Smorodin'},
            // "partner": Meteor.uuid(),
            "detail": 'String'
        }
        ];
        
        data.forEach(function(r){
            Reservations.insert(r);
        });
    }
});
