import { Select } from "@chakra-ui/react";

export default function SelectDraft({ isDraft, setDraft }) {
  return (
    <>
      {" "}
      <p className="font-semibold">Draft?</p>
      <select
        className="select select-bordered w-full max-w-xs"
        onChange={(e) => setDraft(e.target.value)}
      >
        <option value="true">Yes</option>
        <option value="false">Nope</option>
      </select>
    </>
  );
}
