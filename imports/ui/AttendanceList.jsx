import { Meteor } from 'meteor/meteor';
import React, { Fragment  } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { EventsDb } from '/imports/db/EventsDb';
import { PersonGoing } from './PersonGoing';


export const AttendanceList = () => {


    // obj represents mongo query params 
    const isGoingList = { amGoing: true };


 //use a single useTracker to get data from TasksCollection
    const { peopleGoing, isLoading } = useTracker(() => {

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

        const peopleGoing = EventsDb.find(isGoingList).fetch();


        return { peopleGoing };
    });
    

    
    // console.log('peoplegoing', peopleGoing);

  return (<div>
            <h2 className='center'>People Attending:</h2>
          {peopleGoing ? (
            <Fragment>
              {isLoading && <div className="loading">loading...</div>}

                <div className='center'>
                  {peopleGoing.map(person => (
                    <PersonGoing
                      key={person._id}
                      name={person.name}
                    />
                    
                  ))}
                </div>
              </Fragment>
              ) : (
                <div>Loading</div>
              )}
         </div>);
};