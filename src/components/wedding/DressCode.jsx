function DressCode({ wed_clients }) {
  const hasSpecific =
    (wed_clients.dc_groom_code && wed_clients.dc_groom_name) ||
    (wed_clients.dc_bride_code && wed_clients.dc_bride_name);

  return (
    <section className="bg-white py-14 px-6 text-center font-serif">
      <div className="relative text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-wide relative inline-block">
          Dress Code
          <span className="relative block h-[4px] mt-2 overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black to-transparent animate-underlineGlow" />
          </span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="black-border-glow bg-white rounded-3xl shadow-md p-8 w-full max-w-2xl mx-auto border border-gray-200">
          {hasSpecific ? (
            <>
              {/* Groom */}
              {wed_clients.dc_groom_code && (
                <>
                  <h3 className="text-2xl font-semibold text-gray-800 font-serif mb-4">Groom</h3>
                  <div
                    className="w-38 h-6 rounded-md mx-auto mb-3 border border-gray-300"
                    style={{ backgroundColor: wed_clients.dc_groom_code }}
                  />
                  <p className="font-semibold text-gray-600">{wed_clients.dc_groom_name}</p>
                </>
              )}

              {/* Divider if both exist */}
              {wed_clients.dc_groom_code && wed_clients.dc_bride_code && (
                <hr className="my-10 border-t border-gray-400 opacity-60" />
              )}

              {/* Bride */}
              {wed_clients.dc_bride_code && (
                <>
                  <h3 className="text-2xl font-semibold text-gray-800 font-serif mb-4">Bride</h3>
                  <div
                    className="w-38 h-6 rounded-md mx-auto mb-3 border border-gray-300"
                    style={{ backgroundColor: wed_clients.dc_bride_code }}
                  />
                  <p className="font-semibold text-gray-600">{wed_clients.dc_bride_name}</p>
                </>
              )}
            </>
          ) : (
            <>
            <div
              className="w-38 h-6 rounded-md mx-auto mb-3 border border-gray-300"
              style={{ backgroundColor: wed_clients.dc_groom_code }}
            />
              <p className="font-semibold text-gray-600">{wed_clients.dc_groom_name}</p>

              <hr className="my-10 border-t border-gray-400 opacity-60" />

              <div
                className="w-38 h-6 rounded-md mx-auto mb-3 border border-gray-300"
                style={{ backgroundColor: wed_clients.dc_bride_code }}
              />
              <p className="font-semibold text-gray-600">{wed_clients.dc_bride_name}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default DressCode;
