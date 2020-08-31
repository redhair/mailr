import React from 'react';
import Input from '../Input';
import { Field } from 'formik';
import PropTypes from 'prop-types';

InputField.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
};

function InputField(props) {
  return (
    <Field name={props.name}>
      {({ field, meta }) => (
        <>
          <Input {...field} {...props} />
          {meta.touched && meta.error && <div className="error-message">{meta.error}</div>}
        </>
      )}
    </Field>
  );
}

export default InputField;
