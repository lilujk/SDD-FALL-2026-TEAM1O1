"use client";

export type FormCheckboxInputProps = {
  name: string;
}

export default function FormCheckboxInput({ name }: FormCheckboxInputProps) {
  return (
    <div className="flex flex-row gap-1">
      <input name={name} type="checkbox"></input>
      <p className="text-sm">{name}</p>
    </div>
  );
}