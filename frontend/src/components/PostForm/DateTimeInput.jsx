import { forwardRef } from 'react';
import { Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DateTimeInput({ name, label, control, rules }) {
  const CustomInput = forwardRef(
    ({ value, onChange, onClick, className }, ref) => (
      <input
        type="text"
        className={className}
        onChange={onChange}
        onClick={onClick}
        ref={ref}
        placeholder={'Select date'}
        value={value}
      />
    )
  );
  CustomInput.displayName = 'Date Picker Input';

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            id={name}
            showTimeSelect
            timeIntervals={15}
            timeFormat="HH:mm"
            dateFormat="MMMM d, yyyy h:mm aa"
            onChange={onChange}
            selected={value}
            enableTabLoop={false}
            customInput={
              <CustomInput className="mx-2 w-52 h-8 px-2 rounded border border-gray-400 text-black text-center" />
            }
          />
        )}
      />
    </div>
  );
}
