export default function FileInput({ name, label, register, options, invalid }) {
  return (
    <div className="my-2">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type="file"
        accept=".jpg,.png,.webp,.svg"
        {...register(name, options)}
        aria-invalid={invalid}
      />
    </div>
  );
}
