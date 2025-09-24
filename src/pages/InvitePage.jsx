import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { FaWhatsapp } from "react-icons/fa";
import { supabase } from "../supabaseClient"
import OpeningScreenTemplate from "../components/wedding/OpeningScreenTemplate"

export default function InvitePage() {
  const { slug } = useParams()
  const [wed_clients, setClient] = useState(null)
  const [loading, setLoading] = useState(true)

    function getPublicUrl(path) {
    if (!path) return "";
    const { data } = supabase.storage.from("ecard").getPublicUrl(path);
    return data?.publicUrl || "";
  }

    function formatDateWithOrdinal(dateString) {
      const date = new Date(dateString)

      const day = date.getDate()
      const month = date.toLocaleString('default', { month: 'long' })
      const year = date.toLocaleString('default', { year: 'numeric' })

      const getOrdinal = (n) => {
        if (n > 3 && n < 21) return 'th'
        switch (n % 10) {
          case 1: return 'st'
          case 2: return 'nd'
          case 3: return 'rd'
          default: return 'th'
        }
      }

      return `${day}${getOrdinal(day)} ${month} ${year}`
      }

  useEffect(() => {
    async function fetchClient() {
      const { data, error } = await supabase
        .from('etsy_wed_clients')
        .select("*")
        .eq("slug", slug)
        .single()

      console.log("DATA:", data)
      console.log("ERROR:", error)

      if (error) {
        console.error("Client not found:", error.message)
      } else {
        setClient(data)
        // OG meta tags dynamically
        document.title = data.names ? `Wedding | ${data.names}` : "Wedding Invitation";

        const setMeta = (property, content) => {
          if (!content) return;
          let tag = document.querySelector(`meta[property='${property}']`);
          if (!tag) {
            tag = document.createElement("meta");
            tag.setAttribute("property", property);
            document.head.appendChild(tag);
          }
          tag.setAttribute("content", content);
        };

        setMeta("og:title", `Wedding of ${data.names}`);
        setMeta("og:description",`${formatDateWithOrdinal(data.date)}`);
        setMeta("og:image", getPublicUrl(data.og));
        setMeta("og:type", "website");
        setMeta("og:url", `https://milov.com/${slug}`);

        const setNameMeta = (name, content) => {
          if (!content) return;
          let tag = document.querySelector(`meta[name='${name}']`);
          if (!tag) {
            tag = document.createElement("meta");
            tag.setAttribute("name", name);
            document.head.appendChild(tag);
          }
          tag.setAttribute("content", content);
        };

        setNameMeta("twitter:card", "summary_large_image");
        setNameMeta("twitter:title", `Wedding of ${data.names}`);
        setNameMeta("twitter:description",`${formatDateWithOrdinal(data.date)}`);
        setNameMeta("twitter:image", getPublicUrl(data.og));
      }
      setLoading(false)
    }

    fetchClient()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-12 h-12 border-4 border-dashed rounded-full border-gray-500 animate-spin"></div>
          <p className="text-black font-light tracking-wider text-sm md:text-base">Loading wedding details...</p>
        </div>
      </div>
    )
  }

  if (!wed_clients) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500 text-lg font-semibold text-center">Oops! <br /> Couple not found.
        Please order first if not yet!</p>
        <a
          href="https://"
          target="_blank"
          rel="noopener noreferrer"
          className="float-animation opacity-90 fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition-all duration-300 flex item-center gap-2"
        >
            <p className="text-sm font-medium">Click to Order!</p>
        </a>
      </div>
    )
  }

  return(
    <>
      <OpeningScreenTemplate wed_clients={wed_clients} />
    </>
  )
}
