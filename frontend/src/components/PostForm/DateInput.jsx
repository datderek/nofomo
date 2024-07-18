export default function DateInput({ name, label, value, handleChange }) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type="date"
        name={name}
        defaultValue={value}
        onChange={handleChange}
      />
    </>
  );
}
