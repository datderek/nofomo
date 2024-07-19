export default function ErrorMessage({ error }) {
  return <>{error && <span>{error.message}</span>}</>;
}
