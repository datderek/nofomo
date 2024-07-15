import { useState } from 'react';

// Custom hook that manages form state
export default function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return [values, handleChange, resetForm];
}
