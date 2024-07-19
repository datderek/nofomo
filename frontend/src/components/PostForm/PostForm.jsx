import { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextInput from './TextInput.jsx';
import DateInput from './DateInput.jsx';

export default function PostForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [serverErrors, setServerErrors] = useState([]);

  const submitHandler = async (data) => {
    try {
      const response = await fetch('http://localhost:4000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // TODO: Redirect on success
        reset();
      } else {
        const body = await response.json();
        setServerErrors(body.error);
      }
    } catch (err) {
      setServerErrors([
        'Sorry something went wrong. An error has occured on the server.',
      ]);
    }
  };

  return (
    // react-hook-form handleSubmit() validates inputs prior to calling submitHandler
    <form onSubmit={handleSubmit(submitHandler)}>
      {serverErrors &&
        serverErrors.map((error) => <span key={error}>{error}</span>)}

      <TextInput
        name="title"
        label="Title"
        register={register}
        options={{
          required: 'Please provide a title for your post',
          minLength: 1,
          maxLength: 120,
        }}
        error={errors.title}
      />
      <TextInput
        name="location"
        label="Location"
        register={register}
        options={{
          maxLength: {
            value: 100,
            message: 'Address exceeds the maximum length',
          },
        }}
        error={errors.location}
      />
      <TextInput
        name="body"
        label="Body"
        register={register}
        options={{
          maxLength: {
            value: 1500,
            message: 'Body exceeds the maximum length',
          },
        }}
        error={errors.body}
      />
      <DateInput name="eventStart" label="Start Time" register={register} />
      <DateInput
        name="eventEnd"
        label="End Time"
        register={register}
        options={{
          validate: {
            hasStart: (val) => {
              if (val !== '' && watch('eventStart') === '') {
                return 'Please provide a start time when selecting an end time';
              }
            },
            greaterThanStart: (val) => {
              const startDate = new Date(watch('eventStart'));
              const endDate = new Date(val);
              if (endDate < startDate) {
                return 'End time must be after start time';
              }
            },
          },
        }}
        error={errors.eventEnd}
      />

      <button type="submit">Create</button>
    </form>
  );
}
