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
				 TextInput,
                 SingleFieldList,
                 ReferenceManyField,
                 ChipField 
			 } from 'admin-on-rest';

export const LockList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="description" />
            <ReferenceField label="Owner" source="owner_id"  target="id" reference="users">
                <TextField source="name"/>
            </ReferenceField>
            <ReferenceManyField label="Keys" source="id"  target="lock_id" reference="permissions">
                <SingleFieldList>
                    <ChipField source="lock_id" />
                </SingleFieldList>
            </ReferenceManyField>
        </Datagrid>
    </List>
);

export const LockCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput label= "Description" source="description"  allowEmpty/>
            <ReferenceInput label="User" source="owner_id"  target="owner_id" reference="users" allowEmpty>
                <TextInput source="owner_id" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);