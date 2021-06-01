import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import EventCard from './EventCard.jsx'
import {AttendanceList} from './AttendanceList.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      display: 'block',
    },
  },
}));

export const LoginForm = () => {
    const classes = useStyles();

    //hooks for user credentials
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // called on submit button click
    const submit = e => {
        // prevent refresh
        e.preventDefault();
        // authenticate your user with the provided inputs.
        Meteor.loginWithPassword(username, password);
    };

    return (<>
        <h2 className='center'>Existing Users Login</h2>
    
        <form onSubmit={submit} className={classes.root}>

        <Input 
            required
            type="text"
            name="username"
            placeholder="Email or Display Name"
            onChange={e => setUsername(e.target.value)}
            inputProps={{ 'aria-label': 'description' }} 
        />
        <Input 
            required
            type="text"
            name="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            inputProps={{ 'aria-label': 'description' }} 
        />

        <button type="submit">Log In</button>
        </form>
        <hr/>
        <h2 className="center">Upcoming Events</h2>

        <div className='eventList'>
          <EventCard/>
        </div>
        <div className='center'><AttendanceList/></div>

        
    </>);
};