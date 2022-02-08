export default function FormDescription({ description, setDescription }) {
  return (
    <>
      {" "}
      <div>
        <p className="font-semibold">Description</p>
        <input
          type="text"
          className="input input-bordered w-full lg:w-1/2 h-8"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
      </div>
    </>
  );
}
