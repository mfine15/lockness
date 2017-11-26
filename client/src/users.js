import React from 'react';
import { List,
				 Edit,
				 Create,
				 Datagrid,
				 ReferenceField,
				 TextField,
				 EditButton,
				 DisabledInput,
				 LongTextInput,
				 ReferenceInput,
				 SelectInput,
				 SimpleForm,
				 TextInput 
			 } from 'admin-on-rest';

export const UserList = (props) => (
    <List {...props}>
        <Datagrid sort={{ field: 'id', order: 'DESC' }}>
            <TextField source="id" label="Harvard ID" />
            <TextField source="name" />
            <TextField source="phone" label="Phone Number" />
        </Datagrid>
    </List>
);

export const UserShow = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" label="Harvard ID" />
            <TextInput source="name" />
            <TextInput source="phone" label="Phone Number" />
        </SimpleForm>
    </Create>
);

export const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" label="Harvard ID" />
            <TextInput source="name" />
            <TextInput source="phone" label="Phone Number" />
        </SimpleForm>
    </Create>
);