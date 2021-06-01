import React from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MemberDb } from '/imports/db/MemberDb';
import { useTracker } from 'meteor/react-meteor-data';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));


export const PersonGoing = ({ name, thisUserId }) => {

  const classes = useStyles();
  

 //use a single useTracker to get data from TasksCollection
    const { userDetail, isLoading } = useTracker(() => {

        // if no user logged in return empty array and 0 pending
        const noDataAvailable = { };
        // if (!Meteor.user()) {
        // return noDataAvailable;
        // }

        // sub to tasks
        const handler = Meteor.subscribe('userDetail');

        // set loading if handler is not ready
        if (!handler.ready()) {
        return { ...noDataAvailable, isLoading: true };
        }
        let userDetail = [];
        const userDetailSub = MemberDb.find({userId: thisUserId}).fetch();
        userDetail = userDetailSub[0];

        return { userDetail };
    });

  if (!isLoading && userDetail=== undefined ){
    console.log('needs data for going person');
    Meteor.call('memberDb.addBlankData', thisUserId);
  }

  if (isLoading || (userDetail === undefined)){

    return <div className='center'>loading person</div>

  } else if(!isLoading && userDetail) {
    // console.log('userDetail',userDetail);

    return (<>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {`Location: ${userDetail.location} `}
              <br />
              {`Company: ${userDetail.company} `}
              <br />
              {`Website: ${userDetail.website} `}
              <br />
              {/* <a target='blank' href={userDetail.website}>{userDetail.website}</a> */}
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* <Chip label={name} color="primary" /> */}
    </>);
  };

};

