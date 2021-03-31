import { Field } from "redux-form";
import s from "./FormsControls.module.css";

const FormControl = ({ input, meta, child, ...props }) => {
  const hasError = meta.error && meta.touched;
  return (
    <div className={s.formControls + ' ' + (hasError && s.error)}>
      <div>
        {props.children}
      </div>
      { <span className={s.errorMessage}>{ hasError && meta.error }</span>}
    </div>
  );
};

export const Textarea = props => {
  const {input, meta, child, ...restProps} = props
  return (
    <FormControl {...props}>
      <textarea 
        {...input}
        {...restProps}
      />
    </FormControl>
  );
};

export const Input = props => {
  const {input, meta, ...restProps} = props
  return (
    <FormControl {...props}>
      <input 
        {...input}
        {...restProps}
      />
    </FormControl>
  );
};

export const FieldCreator = (style, component, validate, placeholder, name, type = 'text', text='') => {
  return (
    <label>
      <Field
        className={style}
        component={component}
        validate={validate}
        placeholder={placeholder}
        name={name}
        type={type}
      /> {text}
    </label>
  );
}