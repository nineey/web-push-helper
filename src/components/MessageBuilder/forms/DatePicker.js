// https://www.npmjs.com/package/react-datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerForm({ sendDate, setSendDate }) {
  return (
    <>
      <p className="font-semibold">Versandzeitpunkt</p>

      <div className="border p-3 rounded-md border-slate-300">
        {" "}
        <DatePicker
          selected={sendDate}
          onChange={(date) => setSendDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          dateFormat="dd.MM.yyyy – HH:mm"
        />
      </div>
    </>
  );
}
