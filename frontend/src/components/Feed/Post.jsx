export default function Post({ src, title }) {
  return (
    <div className="border mb-4">
      <div className="h-9">{title}</div>
      <img
        src={src}
        alt={title}
        className="h-auto max-h-[70vh] w-full object-cover object-center"
      />
      <div className="h-9"></div>
    </div>
  );
}
