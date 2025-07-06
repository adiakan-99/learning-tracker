import { FC, InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const FormInput: FC<FormInputProps> = ({ label, ...props }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">{label}</label>
            <input
                {...props}
                className="mt-1 p-2 w-full border rounded-md text-gray-900 focus:ring focus:ring-blue-300"
            />
        </div>
    );
};

export default FormInput;