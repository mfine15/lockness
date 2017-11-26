import React from 'react';
import { Admin, Resource } from 'admin-on-rest';
import postgrestClient from 'postgrest-aor';

import { LockList, LockCreate } from './locks';
import { UserList, UserCreate } from './users';

const App = () => (
    <Admin restClient={postgrestClient("http://localhost:8080")}>
        <Resource name="locks" list={LockList} create={LockCreate} />
        <Resource name="users" list={UserList} create={UserCreate} />
        <Resource name="permissions" list={UserList} create={UserCreate} />
    </Admin>
);

export default App;