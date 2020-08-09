import React, { useEffect } from 'react';
import { Message, Form, Container, Card, TextArea } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { useParams } from 'react-router-dom';

const TextAreaComponent = props => (
  <Form.Field>
    <TextArea {...props.input} value={props.input.value} placeholder={props.label} />
  </Form.Field>
);

const SystemCredentailForm = ({
  handleSubmit,
  saveSystemCredential,
  operationCompleted,
  systemCredentialError,
  reset,
  systemCredentialFormInit,
  getSystemCredentialRecord,
  updateSystemCredential,
  editMode
}) => {
  let { id } = useParams();

  useEffect(() => {
    systemCredentialFormInit();

    if (editMode && id) {
      getSystemCredentialRecord(id);
    }
  }, []);

  const createSystemCredential = ({ userId, password, systemName, description }) => {
    let systemCredential = {
      userId,
      password,
      systemName,
      description
    };
    if (!editMode) {
      saveSystemCredential(systemCredential).then(() => {
        reset();
      });
    } else {
      if (id) {
        updateSystemCredential(id, systemCredential).then(() => {
          reset();
        });
      }
    }

    return false;
  };

  const renderMessage = () => {
    if (systemCredentialError) {
      return <Message error>Error Occured: {systemCredentialError}</Message>;
    } else if (operationCompleted) {
      if (editMode) {
        return <Message info>System Credential Updated!</Message>;
      } else {
        return <Message info>System Credential Created!</Message>;
      }
    }
  };

  return (
    <Container>
      {renderMessage()}
      <Card fluid raised color='teal'>
        <Card.Content>
          <Card.Header> System Credentail </Card.Header>
          <br />
          <Form onSubmit={handleSubmit(createSystemCredential)} autoComplete='off'>
            <Field component={Form.Input} label='User: ' name='userId' placeholder='User ' required />
            <Field
              component={Form.Input}
              type='password'
              label='Password: '
              name='password'
              placeholder='Password '
              required
            />
            <Field component={Form.Input} label='System Name: ' name='systemName' placeholder='System Name ' required />

            <Field component={TextAreaComponent} label='Description: ' name='description' placeholder='Description' />

            <Form.Group textAlign='rigth'>
              <Form.Button primary size='large' color='teal' textAlign='right'>
                {editMode ? 'Update' : 'Create'}
              </Form.Button>
            </Form.Group>
          </Form>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default reduxForm({
  form: 'systemCredentialForm',
  enableReinitialize: true
})(SystemCredentailForm);
