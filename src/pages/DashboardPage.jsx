import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import RSVPTable from "../components/wedding/RSVPTable";
import WishesTable from "../components/wedding/WishesTable";

export default function DashboardPage() {
  const { slug, suffix } = useParams();
  const [activeTab, setActiveTab] = useState("rsvp");
  const [rsvpData, setRsvpData] = useState([]);
  const [wishesData, setWishesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  function getPublicUrl(path) {
    if (!path) return "";
    const { data } = supabase.storage.from("ecard").getPublicUrl(path);
    return data?.publicUrl || "";
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErrorMsg("");

      const { data: clientData, error: clientErr } = await supabase
        .from("etsy_wed_clients")
        .select("wed_client_id, names, og")
        .eq("slug", slug)
        .single();

      if (clientErr || !clientData) {
        setErrorMsg("Client not found. Please check your invitation link.");
        setLoading(false);
        return;
      }

      const clientId = clientData.wed_client_id;

      const { data: rsvp, error: rsvpErr } = await supabase
        .from("etsy_wed_rsvp")
        .select("*")
        .eq("wed_client_id", clientId)
        .order("created_at", { ascending: false });

      if (rsvpErr) {
        console.error("RSVP fetch error:", rsvpErr.message);
      } else {
        setRsvpData(rsvp);
      }

      const { data: wishes, error: wishesErr } = await supabase
        .from("wed_wishes")
        .select("*")
        .eq("wed_client_id", clientId)
        .order("created_at", { ascending: false });

      if (wishesErr) {
        console.error("Wishes fetch error:", wishesErr.message);
      } else {
        setWishesData(wishes);
        document.title = clientData.names ? `Dashboard Wedding | ${clientData.names}` : "Dashboard Wedding";

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

        setMeta("og:title", `Dashboard Wedding of ${clientData.names}`);
        setMeta("og:description",`Check out your RSVP and Wishes List Here!`);
        setMeta("og:image", getPublicUrl(clientData.og));
        setMeta("og:type", "website");
        setMeta("og:url", `https://milov.com/${suffix}/${slug}`);

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
        setNameMeta("twitter:title", `Dashboard Wedding of ${clientData.names}`);
        setNameMeta("twitter:description",`Check out your RSVP and Wishes List Here!`);
        setNameMeta("twitter:image", getPublicUrl(clientData.og));
      }
      setLoading(false);
    };

    if (slug) fetchData();
  }, [slug]);

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800">
      <div className="text-center mb-2">
        <h1 className="text-3xl font-bold tracking-tight">Wedding Dashboard</h1>
        <p className="mt-2 text-lg text-gray-500">{slug}</p>
      </div>

      <div className="flex justify-center space-x-3 my-6">
        <button
          className={`px-4 py-2 rounded-full font-medium transition border ${
            activeTab === "rsvp"
              ? "bg-black text-white border-black"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("rsvp")}
        >
          RSVP
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-400 italic">Loading data...</p>
      ) : errorMsg ? (
        <p className="text-center text-red-500">{errorMsg}</p>
      ) : activeTab === "rsvp" ? (
        <RSVPTable data={rsvpData} />
      ) : (
        <WishesTable data={wishesData} />
      )}
    </div>

  );
}
