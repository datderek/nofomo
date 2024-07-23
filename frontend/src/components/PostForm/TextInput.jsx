export default function TextInput({
  name,
  label,
  register,
  options,
  invalid,
  isDirty,
}) {
  return (
    <div className={'relative my-2'}>
      <input
        id={name}
        type="text"
        {...register(name, options)}
        aria-invalid={invalid}
        className={`peer w-full h-8 px-2 rounded border transition ${invalid ? 'border-red-400' : 'border-gray-400'}`}
      />
      <label
        className={`text-gray-400 absolute px-0.5 left-0 translate-x-2 origin-left transition peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:bg-white peer-focus:text-black ${isDirty ? '-translate-y-3 scale-75 bg-white text-black' : 'translate-y-1'}`}
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
}
