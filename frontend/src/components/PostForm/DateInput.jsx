export default function DateInput({ name, label, register, options, error }) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type="date"
        {...register(name, options)}
        aria-invalid={error ? true : false}
      />
      {error && <span>{error.message}</span>}
    </>
  );
}
