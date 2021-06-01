import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { MemberDb } from '/imports/db/MemberDb';
import { useTracker } from 'meteor/react-meteor-data';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FormControl } from '@material-ui/core';





const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
 
export const EditProfile = () => {
  const user = useTracker(() => Meteor.user());
  const classes = useStyles();

  // const [titleText, setTitleText] = useState("");
  // const [locationText, setLocationText] = useState("");
  // const [companyText, setCompanyText] = useState("");
  // const [websiteText, setWebsiteText] = useState("");

  // grads globals published user proflie
  const profile = Meteor.user().profile;

  //handle update DB when user changes profile data
  const handleChangeTitle = (event) => {
    Meteor.call('memberDb.setTitle', event.target.value, user);
  };

  const handleChangeLocation = (event) => {
    Meteor.call('memberDb.setLocation', event.target.value, user);
  };

  const handleChangeCompany = (event) => {
    Meteor.call('memberDb.setCompany', event.target.value, user);
  };

  const handleChangeWebsite = (event) => {
    Meteor.call('memberDb.setWebsite', event.target.value, user);
  };




  //use a single useTracker to get data from users
  let { member, isLoading } = useTracker(() => {
    // if no user logged in return empty array and 0 pending
    const noDataAvailable = { };
    if (!Meteor.user()) {
      // console.log('no user');
      return noDataAvailable;
    }
    // subscription to memberDb
    const handler = Meteor.subscribe('memberDb');
    // set loading if handler is not ready
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }
    const member = MemberDb.find({'userId' : user._id}).fetch();
    // console.log('return member');
    return { member };
  });




  if (!isLoading && profile) {

    if (member.length === 0){
      // console.log('no membdata');
      member = [{title: '', location: '', company: '', website: ''}]
    }

    const {title, location, company, website} = member[0];

    return (<div>
            <hr></hr> 
            <TextField
              id="filled-read-only-input"
              label="Display Name"
              defaultValue={profile.displayName}
              InputProps={{
                readOnly: true
              }}
            />    

            <form className={classes.root}>
              <FormControl>
                <TextField 
                  label="Title" 
                  multiline
                  rowsMax={2}
                  defaultValue={title} 
                  onChange={handleChangeTitle} 
                />
              </FormControl>

              <FormControl>
                <TextField
                  label="Location"
                  multiline
                  rowsMax={2}
                  defaultValue={location} 
                  onChange={handleChangeLocation}
                />     
              </FormControl>    

              <FormControl>
                <TextField
                  label="Company"
                  multiline
                  rowsMax={2}
                  defaultValue={company} 
                  onChange={handleChangeCompany}
                />             
              </FormControl> 

              <FormControl>
                <TextField
                  label="Website"
                  multiline
                  rowsMax={2}
                  defaultValue={website} 
                  onChange={handleChangeWebsite}
                />             
              </FormControl> 

              <div>
              {isLoading && <div className="loading">loading...</div>}
              </div>
          </form>
    </div>);    
  };

  return (<>
      loading
  </>)
};