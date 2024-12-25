import * as React from 'react';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import TextField from '@mui/material/TextField';
import { User } from '../../types/User';
import CloseIcon from '@mui/icons-material/Close';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface HireFreelancerProps {
  User: User;
}

const HireFreelancer: React.FC<HireFreelancerProps> = ({ User }) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    console.log('Name:', name);
    console.log('Subject:', subject);
      console.log('Message:', message);
      setOpen(false);
  };

  return (
    <div>
      <IconButton type="button" onClick={handleOpen} data-testid="hire-open-button">
        <HomeRepairServiceIcon />
      </IconButton>


      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent>
          <CloseButton onClick={handleClose} data-testid="hire-close-button">
  <CloseIcon />
</CloseButton>

          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              '& .MuiTextField-root': { width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              data-testid="name-textfield"
              id="name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              required
               data-testid="subject-textfield"
              id="subject"
              label="Message Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <TextField
              required
               data-testid="message-textfield"
              id="message"
              label="Message"
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
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
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 80vh;
    background-color: ${theme.palette.mode === 'dark' ? '#303740' : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? '#6b7a90' : '#dae2ed'};
    box-shadow: 0 4px 12px rgb(0 0 0 / 0.2);
    padding: 24px;
    width: 500px;
  `
);

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export default HireFreelancer;
