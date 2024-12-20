interface InputProps {
  placeholder: string;
  reference?: any;
}

export function Input({ placeholder, reference }: InputProps) {
  return (
    <div className="flex justify-center items-center h-full"> {/* Centering the input */}
      <input
        ref={reference}
        placeholder={placeholder}
        type="text"
        className="px-4  w-[350px] py-2 text-white bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 m-2"
      />
    </div>
  );
}
