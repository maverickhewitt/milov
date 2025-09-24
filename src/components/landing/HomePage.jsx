
function HomePage(){

  return(

    <main id="home" className="min-h-screen bg-orange-300 text-white flex flex-col justify-center items-center px-4">
        <h1 className="mt-10 text-5xl md:text-6xl font-bold tracking-tight text-center">
        Milov
      </h1>
      
      {/* <h5 className="mt-1 text-lg md:text-xl tracking-tight text-center text-orange-400">By Maverick Hewitt Larsson(12345678)</h5> */}
        <p className="mt-12 text-xl md:text-xl text-center text-white"> 
          Send love with digital invites.
        </p>

        <p className="text-xl md:text-xl text-center text-white"> 
          Share moments with creative posters.
        </p>

        <a href="#product" className="glow-button-white mt-12 bg-white text-orange-500 px-6 py-3 min-w-[300px] fo-bold text-center rounded-2xl shadow hover:bg-orange-100 transition">
        Order Now          
        </a>
      
    </main>
  );
}

export default HomePage