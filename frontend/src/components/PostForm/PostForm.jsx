import useForm from '../../hooks/useForm.jsx';

export default function PostForm() {
  const initialValues = {
    title: '',
    location: '',
    body: '',
    media: [],
    tags: [],
    eventStart: '',
    eventEnd: '',
  };

  const [values, handleChange, resetForm] = useForm(initialValues);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      resetForm();
      // TODO: Display response
      console.log(response);
    } catch (err) {
      // TODO: Display error
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        value={values.title}
        onChange={handleChange}
      />

      <label htmlFor="location">Location</label>
      <input
        type="text"
        name="location"
        value={values.location}
        onChange={handleChange}
      />

      <label htmlFor="body">Body</label>
      <input
        type="text"
        name="body"
        value={values.body}
        onChange={handleChange}
      />

      <label htmlFor="media">Media</label>
      <input
        type="text"
        name="media"
        value={values.media}
        onChange={handleChange}
      />

      <label htmlFor="eventStart">Start Time</label>
      <input
        type="date"
        name="eventStart"
        value={values.eventStart}
        onChange={handleChange}
      />

      <label htmlFor="eventEnd">End Time</label>
      <input
        type="date"
        name="eventEnd"
        value={values.eventEnd}
        onChange={handleChange}
      />

      <label htmlFor="tags">Tags</label>
      <input
        type="text"
        name="tags"
        value={values.tags}
        onChange={handleChange}
      />

      <button type="submit">Create</button>
    </form>
  );
}
