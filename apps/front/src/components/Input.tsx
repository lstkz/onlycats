import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef((props: InputProps, ref: any) => {
  const { label, error, ...rest } = props;
  return (
    <div className="mb-4 ">
      {label && <label className="text-gray-700 mb-1">{label}</label>}
      <input
        ref={ref}
        {...rest}
        className="border border-gray-200 px-2 py-2 w-full rounded-md"
        {...props}
      />

      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
});
