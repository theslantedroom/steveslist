import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment  } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { ItemComing } from './ItemComing';
import { LoginForm } from './LoginForm';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));


export const StuffList = () => {
    // const profile = Meteor.user().profile;
    // console.log('profile', profile);
    // const { user } = useGlobalContext();
    //console.log('userfrom gtx', user);

    // const user = useTracker(() => Meteor.user());

    //use a single useTracker to get data from TasksCollection
    const { bringing, isLoading } = useTracker(() => {

        // if no user logged in return empty array and 0 pending
        const noDataAvailable = {  };
        // if (!Meteor.user()) {
        // return noDataAvailable;
        // }

        // sub to allStuff
        // console.log('handler');
        const handler = Meteor.subscribe('allStuff');

        // set loading if handler is not ready
        if (!handler.ready()) {
            // console.log('xxx not ready');
        return { ...noDataAvailable, isLoading: true };
        }

        const bringing = TasksCollection.find({going: true}).fetch();
        // console.log('bringing', bringing);

        return { bringing };
    });

  if (bringing){
    return (<div>
    <h2 className="center">Who's bringing what:</h2>
    
      <div className='center'>
        
                      {bringing.map(bringingItem => (
                        <ItemComing
                          key={bringingItem._id}
                          task={bringingItem}
                        />
                      ))}
      </div>
    </div>);    
  } else {
    return (<div>loading stuff thats coming</div>)
  }

};