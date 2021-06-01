import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function EventCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            NW
          </Avatar>
        }

        title="New West BBQ and 20ish year High School reunion at Foreshore Park"
        subheader="July 17, 2021 - 12pm"
      />
      <CardMedia
        className={classes.media}
        image="./july17.jpg"
        title="20year"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Let's get the old New West crew back together for a catch up.  Once you sign up, please edit your profile (just add anything you might bring) then go to the event page and check the 'I will be attending!' box! Expand for details.
        </Typography>

      </CardContent>
      <CardActions disableSpacing>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>About:</Typography>
          <Typography paragraph>
            July 17, 2021 - 12pm @ Burnaby Fraser Foreshore Park (7751 Fraser Park Dr).  
            On the river a stones throw from the New West/Burnaby border.
            Meet at the BBQ and picnic tables area by the field.
          </Typography>
          <Typography paragraph>
            It's been around 20ish years since we graduated.
            There will be games and entertainment and whatever else shows up.
          </Typography>


          <Typography>
            Bring some food and cold beverages and enjoy this summer day.
            Please share this Link with the cool kids from New West in the early 2000's.
            It's also my birthday party.
          </Typography>
          <Typography>
            <a target='blank' href="https://www.google.com/maps/place/Burnaby+Fraser+Foreshore+Park/@49.1840909,-122.9981268,14z/data=!4m9!1m2!2m1!1sforeshore+park+picnic!3m5!1s0x5485d8aefd62d4db:0xe01bc8b93dd3a1b1!8m2!3d49.1840909!4d-122.9806173!15sChVmb3Jlc2hvcmUgcGFyayBwaWNuaWOSAQ9lY29sb2dpY2FsX3Bhcms">See Map</a>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
