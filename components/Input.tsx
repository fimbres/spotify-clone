import React, { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    type,
    disabled,
    ...props
}, ref) => {
    return (
        <input
            type={type}
            disabled={disabled}
            className={`flex w-full rounded-md border border-transparent p-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:cursor-pointer placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none ${className ? className : 'bg-neutral-700'}`}
            ref={ref}
            {...props}
        />
    );
});

export default Input