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

        title="New West BBQ and 20 year High School reunion at Foreshore Park"
        subheader="July 17, 2021"
      />
      <CardMedia
        className={classes.media}
        image="./july17.jpg"
        title="20year"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Let's get the old Nest West crew back together for a catch up. It's been about 20 years since we graduated. Sign up add something to bring.
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
            I'm sure most of us are longing for form social interaction. Lets play and eat this day and be merry.
          </Typography>
          <Typography paragraph>
            There will be games and entertainment and whatever else shows up.
          </Typography>

          <Typography>
            Bring some food and cold beverages and enjoy this summer day.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
