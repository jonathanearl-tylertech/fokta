import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ChangeEvent, useState } from 'react';

interface UserData {
  firstName: string,
  lastName: string,
  email: string,
  password: string;
  mobilePhone: string;
}

interface FormState {
  user: UserData;
  isLoading: boolean,
}

const initialState = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobilePhone: '',
  },
  isLoading: false,
}

const AddUserDialog = ({ isDialogOpen, handleCloseDialog }: { isDialogOpen: boolean, handleCloseDialog: () => void }) => {
  const [state, setState] = useState<FormState>(initialState);

  const handleSubmitUser = async () => {
    const req = JSON.stringify({
      profile: {
        firstName: state.user.firstName,
        lastName: state.user.lastName,
        login: state.user.email,
        email: state.user.email,
        mobilePhone: state.user.mobilePhone,
      },
      credentials: {
        password: {
          value: state.user.password,
        }
      }
    });
    console.log(req);
    const res = await fetch('http://localhost:5001/api/v1/users', { method: 'POST', body: req, headers: { 'content-type': 'application/json'}});
    if (res.ok) {
      setState(initialState);
      handleCloseDialog();
    }
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState({
      ...state,
      user: {
        ...state.user,
        [event.target.id]: event.target.value
      }
    })
  }

  return (
    <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
      <DialogTitle>Add Person</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="firstName"
          label="First name"
          type="text"
          fullWidth
          variant="outlined"
          onChange={handleOnChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="lastName"
          label="Last name"
          type="text"
          fullWidth
          variant="outlined"
          onChange={handleOnChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email"
          type="text"
          fullWidth
          variant="outlined"
          onChange={handleOnChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="Password"
          type="text"
          fullWidth
          variant="outlined"
          onChange={handleOnChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="mobilePhone"
          label="Mobile phone"
          type="phone"
          fullWidth
          variant="outlined"
          onChange={handleOnChange}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCloseDialog}
        >Cancel</Button>
        <Button
          variant="outlined"
          onClick={handleSubmitUser}
        >Add</Button>
      </DialogActions>
    </Dialog>
  )
}
export default AddUserDialog;
