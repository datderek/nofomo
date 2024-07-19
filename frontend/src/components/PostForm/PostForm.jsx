import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { hasStart, greaterThanStart } from './validations.js';
import { formatDate } from '../../utils/utils.js';
import TextInput from './TextInput.jsx';
import DateTimeInput from './DateTimeInput.jsx';
import ErrorMessage from './ErrorMessage.jsx';

export default function PostForm() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [serverErrors, setServerErrors] = useState([]);

  const submitHandler = async (data) => {
    data.eventStart = formatDate(data.eventStart);
    data.eventEnd = formatDate(data.eventEnd);

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
        invalid={errors.title ? true : false}
      />
      <ErrorMessage error={errors.title} />
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
        invalid={errors.location ? true : false}
      />
      <ErrorMessage error={errors.location} />
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
        invalid={errors.body ? true : false}
      />
      <ErrorMessage error={errors.body} />
      <DateTimeInput name="eventStart" label="From" control={control} />
      <DateTimeInput
        name="eventEnd"
        label="To"
        control={control}
        rules={{
          validate: {
            hasStart: hasStart(watch),
            greaterThanStart: greaterThanStart(watch),
          },
        }}
      />
      <ErrorMessage error={errors.eventEnd} />
      <button type="submit">Create</button>
    </form>
  );
}
