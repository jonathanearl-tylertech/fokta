import { NextPage } from "next";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import AddPersonDialog from '../../users/AddPersonDialog'

interface State {
  isLoading: boolean,
  users: any,
  isError: boolean,
  isDialogOpen: boolean,
}

const Users: NextPage = () => {
  const [state, setState] = useState<State>({ isLoading: false, users: [], isError: false, isDialogOpen: false });
  const openDialog = () => {
    setState({ ...state, isDialogOpen: true });
  };

  const handleCloseDialog = () => {
    setState({ ...state, isDialogOpen: false });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('http://localhost:5001/api/v1/users');
      if (!res.ok) {
        setState({ ...state, isLoading: false, isError: true })
        return;
      }
      const data: any = await res.json();
      setState({ ...state, isLoading: false, users: [...data], isError: false });
    }
    fetchUsers();
  }, []);

  return <div>
    <h1>People</h1>
    <Button variant="outlined" onClick={openDialog}>Add person</Button>
    <section>
      {state.users.map((user: any) =>
        <div key={user._id}>{user.profile.firstName} {user.profile.lastName} {user.profile.email}</div>
      )}
    </section>
    <AddPersonDialog isDialogOpen={state.isDialogOpen} handleCloseDialog={handleCloseDialog}></AddPersonDialog>
  </div>
}
export default Users;
