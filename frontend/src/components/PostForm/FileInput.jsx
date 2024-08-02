export default function FileInput({ name, label, register, options, invalid }) {
  return (
    <div>
      <input
        id={name}
        type="file"
        accept=".jpg,.png,.webp,.svg"
        {...register(name, options)}
        aria-invalid={invalid}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}
