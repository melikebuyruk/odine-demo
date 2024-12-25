import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { User } from '../../types/User';
import Portfolio from '../Portfolio/Portfolio';
import HireFreelancer from '../HireFreelancer/HireFreelancer';
import './FreelancerCard.css';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface FreelancerCardProps {
  User: User;
  onSave: () => void;
  isSaved: boolean;
  photo:string;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
}));

const FreelancerCard: React.FC<FreelancerCardProps> = ({ User, onSave, isSaved,photo}) => {
  const [expanded, setExpanded] = React.useState(false);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="freelancer-card">
      <CardMedia className="card-media" component="img" height="194" image={photo} alt={User.name} />
      <CardContent>
        <Typography variant="h5">{User.name}</Typography>
      </CardContent>
      <Portfolio User={User} />
      <CardActions disableSpacing>
        <HireFreelancer User={User} />
        <IconButton onClick={onSave} aria-label="Save" data-testid={isSaved ? "save-button-saved" : "save-button-unsaved"}>
  {isSaved ? (
    <TurnedInIcon data-testid="TurnedInIcon" color="primary" />
  ) : (
    <TurnedInNotIcon data-testid="TurnedInNotIcon" />
  )}
</IconButton>


        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Email: {User.email}</Typography>
          <Typography paragraph>Phone: {User.phone}</Typography>
          <Typography paragraph>Finished Job Count: {User.jobCount}</Typography>
          <Typography paragraph>City: {User.address.city}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default FreelancerCard;
