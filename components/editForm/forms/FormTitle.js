export default function FormTitle({ title, setTitle }) {
  return (
    <>
      {" "}
      <div>
        <p className="font-semibold">Title</p>
        <input
          type="text"
          className="input input-bordered w-full lg:w-1/2 h-8"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>
    </>
  );
}
