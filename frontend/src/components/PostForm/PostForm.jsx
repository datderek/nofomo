import useForm from '../../hooks/useForm.jsx';
import { useState } from 'react';
import TextInput from './TextInput.jsx';
import DateInput from './DateInput.jsx';

export default function PostForm() {
  const initialValues = {
    title: '',
    location: '',
    body: '',
    eventStart: '',
    eventEnd: '',
    media: [],
    tags: [],
  };

  const [values, handleChange, resetForm] = useForm(initialValues);
  const [errors, setErrors] = useState([]);

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

      if (response.ok) {
        // TODO: Redirect on success
        resetForm();
      } else {
        const errorData = await response.json();
        setErrors(errorData.error);
      }
    } catch (err) {
      setErrors([err.message]);
    }
  };

  // TODO: something is broken with the onChange handler after the refactor

  return (
    <form onSubmit={handleSubmit}>
      {errors && errors.map((error, index) => <p key={index}>{error}</p>)}

      <TextInput
        name="title"
        label="Title"
        value={values.title}
        handleChange={handleChange}
      />
      <TextInput
        name="location"
        label="Location"
        value={values.location}
        handleChange={handleChange}
      />
      <TextInput
        name="body"
        label="Body"
        value={values.body}
        handleChange={handleChange}
      />

      <label htmlFor="media">Media</label>
      <input
        type="text"
        name="media"
        value={values.media}
        onChange={handleChange}
      />

      <DateInput
        name="eventStart"
        label="Start Time"
        value={values.eventStart}
        handleChange={handleChange}
      />
      <DateInput
        name="eventEnd"
        label="End Time"
        value={values.eventEnd}
        handleChange={handleChange}
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
