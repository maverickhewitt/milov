export default function DressCode2({ wed_clients }) {
  const mode = wed_clients.dressCodeMode || "specific"; // default to specific

  return (
    <section className="relative w-full py-14 px-6 text-center font-serif">
      <div className="relative z-10">
        <div className="relative text-center mb-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide relative inline-block">
            Dress Code
            <span className="relative block h-[4px] mt-2 overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-underlineGlow" />
            </span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <div className="bg-white/80 rounded-3xl shadow-md p-8 w-full max-w-2xl mx-auto border border-gray-200">
            {mode === "specific" ? (
              <>
                {/* Groom */}
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Groom</h3>
                <div
                  className="w-38 h-6 rounded-md mx-auto mb-3 border border-gray-300"
                  style={{ backgroundColor: wed_clients.dc_groom_code }}
                />
                <p className="font-semibold text-gray-600">{wed_clients.dc_groom_name}</p>

                <hr className="my-10 border-t border-gray-400 opacity-60" />

                {/* Bride */}
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Bride</h3>
                <div
                  className="w-38 h-6 rounded-md mx-auto mb-3 border border-gray-300"
                  style={{ backgroundColor: wed_clients.dc_bride_code }}
                />
                <p className="font-semibold text-gray-600">{wed_clients.dc_bride_name}</p>
              </>
            ) : (
              <>
                <div className="flex justify-center items-center mb-3">
                {/* Groom block */}
                <div
                  className="w-24 h-8 border border-gray-300"
                  style={{
                    backgroundColor: wed_clients.dc_groom_code,
                    borderTopLeftRadius: "12px",
                    borderBottomLeftRadius: "12px",
                    borderTopRightRadius: "0",
                    borderBottomRightRadius: "0",
                  }}
                />
                {/* Bride block */}
                <div
                  className="w-24 h-8 border border-gray-300"
                  style={{
                    backgroundColor: wed_clients.dc_bride_code,
                    borderTopLeftRadius: "0",
                    borderBottomLeftRadius: "0",
                    borderTopRightRadius: "12px",
                    borderBottomRightRadius: "12px",
                  }}
                />
              </div>
              {/* Names below */}
              <div className="flex justify-center gap-10 mt-2">
                <p className="font-semibold text-gray-600">{wed_clients.dc_groom_name}</p>
                <p className="font-semibold text-gray-600">{wed_clients.dc_bride_name}</p>
              </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
