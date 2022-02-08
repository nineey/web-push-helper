export default function SelectDealType({ setDealType }) {
  return (
    <>
      <p className="font-semibold">Deal type</p>
      <select
        className="select select-bordered w-full max-w-xs"
        onChange={(e) => setDealType(e.target.value)}
      >
        <option value="daily">Deal of the Day</option>
        <option value="weekly">Deal of the Week</option>
        <option value="special">Special deal</option>
      </select>
    </>
  );
}
