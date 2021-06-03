import { FC } from "react"
import { Field, WrappedFieldProps } from "redux-form"
import { ValidatorType } from "../../../utilts/validators/validators"
import s from "./FormsControls.module.scss"

const FormControl: FC<WrappedFieldProps> = ({ input, meta, ...props }) => {
  const hasError = meta.error && meta.touched
  return (
    <div className={s.formControls + ' ' + (hasError && s.error)}>
      <div>
        {props.children}
      </div>
      { <span className={s.errorMessage}>{ hasError && meta.error }</span>}
    </div>
  )
}

export const Textarea: FC<WrappedFieldProps> = props => {
  const {input, meta, ...restProps} = props
  return (
    <FormControl {...props}>
      <textarea 
        {...input}
        {...restProps}
      />
    </FormControl>
  )
}

export const Input: FC<WrappedFieldProps> = props => {
  const {input, meta, ...restProps} = props
  return (
    <FormControl {...props}>
      <input 
        {...input}
        {...restProps}
      />
    </FormControl>
  )
}

export function FieldCreator<NamesGenericType extends string>(style: string | undefined, component: FC<WrappedFieldProps> | string, validate: Array<ValidatorType> | Array<never> | ValidatorType, placeholder: string | undefined, name: NamesGenericType, type = 'text', text='') {
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
  )
}