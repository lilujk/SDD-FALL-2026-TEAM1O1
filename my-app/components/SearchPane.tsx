"use client";

import FormCheckboxInput from "./FormCheckbox";

const checkboxGroups = [
  { label: "Include Price(s):", options: ["Free", "Freemium", "Premium"] },
  {
    label: "Include Content Type(s):",
    options: ["Webpage", "Application", "Video", "Book"],
  },
  {
    label: "Avoid Warning(s):",
    options: ["Nudity", "NSFW", "Blood/Gore", "Epilepsy"],
  },
];

export default function SearchPane() {
  return (
    <div className="flex min-w-75 flex-col overflow-hidden rounded-xl border border-gray-300 text-black">
      <h1 className="border-b border-gray-300 px-2 py-1 text-xl">
        Advanced Search
      </h1>

      <div>

        <div className="flex flex-col m-2">
          <p>Resource Title</p>
          <input name="Resource Title" className="border-1 border-black-300 rounded-md px-1 py-0.5"></input>
        </div>

        <div className="flex flex-col m-2">
          <p>Resource Author</p>
          <input name="Resource Author" className="border-1 border-black-300 rounded-md px-1 py-0.5"></input>
        </div>

        <div className="flex flex-col m-2">
          <p>Include Tag(s)</p>
          <input name="Include Tag(s)" className="border-1 border-black-300 rounded-md px-1 py-0.5"></input>
        </div>

        {checkboxGroups.map(({ label, options }) => (
          <div key={label} className="px-2 py-1 mx-1">
            <p>{label}</p>
            <div className="grid grid-cols-2 ml-3">
              {options.map((option) => (
                <FormCheckboxInput key={option} name={option} />
              ))}
            </div>
          </div>
        ))}

        <div className="flex flex-row">
            <button className="bg-black text-white text-sm rounded-sm py-1 px-2 ml-3 mt-3 mb-5 cursor-pointer">Search</button>
        </div>
      </div>
    </div>
  );
}