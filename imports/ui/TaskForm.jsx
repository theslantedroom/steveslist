import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
// import { TasksCollection } from '/imports/db/TasksCollection';
import { useTracker } from 'meteor/react-meteor-data';
import { EventsDb } from '/imports/db/EventsDb';

 
export const TaskForm = ({}) => {
  const user = useTracker(() => Meteor.user());

  const profile = Meteor.user().profile;
  const [text, setText] = useState("");
  const thisUser = profile.displayName;
   //use a single useTracker to get data from TasksCollection
  const { isGoing, isLoading } = useTracker(() => {

      // if no user logged in return empty array and 0 pending
      const noDataAvailable = { };
      // if (!Meteor.user()) {
      // return noDataAvailable;
      // }

      // sub to tasks
      const handler = Meteor.subscribe('eventsDb');

      // set loading if handler is not ready
      if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
      }

      const peopleGoing = EventsDb.find({ userId: user._id }).fetch();
      let isGoing = false;
      console.log('peopleGoing',peopleGoing);

      if (peopleGoing.length === 1) {
        isGoing = peopleGoing[0].amGoing;
      }

      return { isGoing };
  });

  console.log('isGoingxxx',isGoing);


  const handleSubmit = e => {
    console.log('click add tag');
    // prevents a refresh of browser
    e.preventDefault();
    // console.log('click',text);
    // exit out if no text in form // for
    if (!text) return;
    Meteor.call('tasks.insert', text, thisUser, isGoing);

    setText("");
  };
 
  return (<form className="task-form" >
      <input
        type="text"
        placeholder="what you bringing?"
        value = {text}
        onChange = {(e)=> setText(e.target.value)}
      />
 
      <button onClick={handleSubmit} type="submit">Add Item</button>
    </form>
  );
};