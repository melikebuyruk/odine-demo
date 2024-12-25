import * as React from 'react';
import { styled } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import { User } from '../../types/User';
import Jobs from '../../Jobs/Jobs';
import clsx from 'clsx';

interface PortfolioProps {
  User: User;
}

const Portfolio: React.FC<PortfolioProps> = ({ User }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <TriggerButton
        type="button"
        data-testid="open-portfolio"
        onClick={handleOpen}
        style={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.primary.main,
        }}
      >
        Portfolio
      </TriggerButton>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent
          style={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            maxWidth: '700px',
          }}
        >
          <CloseButton onClick={handleClose} style={{ color: theme.palette.text.secondary }}>
            <CloseIcon />
          </CloseButton>
          <Typography paragraph variant="h4" style={{ color: theme.palette.primary.main }}>
            {User.name}
          </Typography>
          <Typography paragraph>Email: {User.email}</Typography>
          <Typography paragraph>Phone: {User.phone}</Typography>
          <Typography paragraph>Website: {User.website}</Typography>
          <Typography paragraph>Finished Job Count: {User.jobCount}</Typography>
          <Typography paragraph>
            Address: {User.address.city}, {User.address.street}, {User.address.suite},{' '}
            {User.address.zipcode}
          </Typography>
          <Typography paragraph>
            Company: {User.company.name}, {User.company.catchPhrase}, {User.company.bs}
          </Typography>
          <Jobs userId={User.id} />
        </ModalContent>
      </Modal>
    </div>
  );
};

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'base-Backdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 80vh;
  border-radius: 8px;
  border: 1px solid;
  padding: 24px;
  max-width: 700px;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const TriggerButton = styled('button')`
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid;
  background-color: #f5f5f5;
  &:hover {
    background-color: #e0e0e0;
  }
`;

export default Portfolio;


