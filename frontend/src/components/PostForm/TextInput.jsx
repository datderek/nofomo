export default function TextInput({ name, label, register, options, error }) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type="text"
        {...register(name, options)}
        aria-invalid={error ? true : false}
      />
      {error && <span>{error.message}</span>}
    </>
  );
}
