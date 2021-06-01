import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { EventsDb } from '/imports/db/EventsDb';




export default function CheckboxEvent() {
  const user = useTracker(() => Meteor.user());

  // const [checked, setChecked] = React.useState(false);

  // grabs globals published user attendance
  const profile = Meteor.user().profile;
  // console.log('profile', profile.firstName);

  //use a single useTracker to get data from users
  let { isgoing, isLoading } = useTracker(() => {

    // if no user logged in return empty array and 0 pending
    const noDataAvailable = { };
    if (!Meteor.user()) {
      // console.log('no user');
      return noDataAvailable;
    }
    // sub to tasks
    const handler = Meteor.subscribe('eventsDb');
    // set loading if handler is not ready
    if (!handler.ready()) {
      // console.log('handler not ready');
      return { ...noDataAvailable, isLoading: true };
    }
    // console.log('handler ready');

    const eventGoing = EventsDb.find({'userId' : user._id}).fetch();
    //if the db entry doesnt exist, first time loggin in
    if (eventGoing.length === 0){
      // console.log('xxx', eventGoing);
      eventGoing.push({amGoing: false})
    }
    const isgoing = eventGoing[0].amGoing;
    return { isgoing };
  });

  // console.log('isgoing', isgoing);



  const handleChange = () => {
    const username = `${profile.firstName} ${profile.lastName}, aka ${profile.displayName}`;
    // console.log('clicked am going');
    // setChecked(event.target.checked);
    Meteor.call('eventsDb.setAmGoing', isgoing, username, user);


  };

  return (
    <div>
      <Checkbox
        checked={!!isgoing}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
        readOnly
      />
      I will be attending!
    </div>
  );
}
