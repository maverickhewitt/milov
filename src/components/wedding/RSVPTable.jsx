export default function RSVPTable({ data }) {
  const totalYes = data.filter((d) => d.attending === "yes").length;
  const totalNo = data.filter((d) => d.attending === "no").length;

  return (
    <div className="w-full max-w-[210mm] mx-auto p-4 print:p-0">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-4 text-sm text-gray-700">
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-center">
          ✅ Total Yes: {totalYes}
        </span>
        <span className="bg-red-100 text-red-800 px-3 py-1 rounded text-center">
          ❌ Total No: {totalNo}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 text-left">Guest Name</th>
              <th className="p-3 text-left">Attending</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.rsvp_id} className="border-t border-gray-200">
                <td className="p-3 text-gray-900">{item.guest_name}</td>
                <td
                  className={`p-3 font-medium ${
                    item.attending === "yes"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {item.attending.toUpperCase()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
