export default function ErrorMessage({ error }) {
  return (
    <>{error && <span className={'text-red-400'}>{error.message}</span>}</>
  );
}
