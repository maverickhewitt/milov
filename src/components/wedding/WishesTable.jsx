export default function WishesTable({ data }) {
  if (!data || data.length === 0) {
    return (
      <p className="text-center text-gray-400 italic">
        No wishes yet. Be the first to leave one!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((wish) => (
        <div
          key={wish.wed_wishes_id}
          className="border border-gray-300 rounded-lg p-5 bg-white shadow-sm"
        >
          <p className="text-gray-900 italic text-lg break-words leading-relaxed">
            “{wish.wish_text}”
          </p>
          <div className="mt-3 text-sm text-gray-500 text-right">
            — {wish.wisher_name} <br className="sm:hidden" />
            <span className="ml-1">
              {new Date(wish.created_at).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
