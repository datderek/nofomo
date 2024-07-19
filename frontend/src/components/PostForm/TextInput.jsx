export default function TextInput({ name, label, register, options, invalid }) {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type="text"
        {...register(name, options)}
        aria-invalid={invalid}
      />
    </>
  );
}
