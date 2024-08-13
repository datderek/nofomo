export default function Post({ src, title }) {
  return (
    <div className="aspect-square">
      <img
        src={src}
        alt={title}
        className="object-cover h-full w-full rounded-2xl"
      />
    </div>
  );
}
