export default function TextInput({ name, label, value, handleChange }) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input type="text" name={name} value={value} onChange={handleChange} />
    </>
  );
}
