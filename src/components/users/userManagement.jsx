import React, { useState } from 'react';
import CreateUserForm from './createUser';
import UsersTable from './showAllUsers';

const UserManagement = () => {

  const [updateUserTable, setUpdateUserTable] = useState(false)

  return (
    <div>
      <CreateUserForm  setUpdateUserTable={setUpdateUserTable}/>
      <UsersTable  updateUserTable={updateUserTable}/>
    </div>
  );
};

export default UserManagement;
