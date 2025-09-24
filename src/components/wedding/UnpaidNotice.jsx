export default function UnpaidNotice() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-orange-600 text-white text-sm md:text-base py-2 px-4 flex items-center justify-center shadow-md">
      <p className="text-center">
      <strong>This is a preview only.</strong> <br />This will be removed once payment is completed.
      </p>
    </div>
  );
}
