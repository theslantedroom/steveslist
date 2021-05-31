import { check } from 'meteor/check';
import { EventsDb } from '../db/EventsDb';


Meteor.methods({
    
  'eventsDb.setAmGoing'(isgoing, username, user) {
    console.log('am going', username);
    check(username, String);
    check(isgoing, Boolean);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    const amGoingExists = EventsDb.find({'userId' : user._id}).fetch();
    console.log('loc', amGoingExists);
    if (amGoingExists.length === 0){
        EventsDb.insert({
        amGoing: true,
        name: username,
        createdAt: new Date,
        userId: this.userId,
        })        
    } else {
        EventsDb.update({'userId' : user._id},{$set:{amGoing : !isgoing }});
    }
  },

 
});