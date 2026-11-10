"use client";

export type FormRowTextInputProps = {
  name: string;
}

export default function FormRowTextInput({ name }: FormRowTextInputProps) {
  return (
    <div className="flex flex-col m-2">
      <p>{name}</p>
      <input name={name} className="border-1 border-black-300 rounded-md"></input>
    </div>
  );
}