import { Search } from "lucide-react";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import TopSearches from "../components/TopSearches";
import FadeOnScroll from "../components/FadeOnScroll";
import { sendSearchRequest } from "../api/Search";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext.jsx";

export default function Home() {
  const {user, setUser} = useContext(UserContext)
  const [query, setQuery] = useState("")
  async function handleSearch (){
    event.preventDefault()
    try {
      const response = await sendSearchRequest(query); // Declare response with const
      console.log(response.data);
    } catch (error) {
        console.error("Error fetching search results:", error);
    }
  } 
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <Header/>
      <main className="flex flex-col w-full mt-18">
        <FadeOnScroll>
          <section className="flex flex-col md:flex-row w-full p-4">
            <div className="w-full md:w-1/2  flex justify-center items-center p-4 md:p-8">
              <Carousel className="w-full h-96 md:h-5/6 rounded-xl shadow-lg"></Carousel>
            </div>
            <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center items-center">
              <div className="max-w-4xl w-full space-y-6">
                <div className="text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Find the truth in a sea of information
                  </h1>
                  <p className="text-lg text-gray-600 mb-6">
                    Our intelligent search helps you verify claims and combat
                    misinformation instantly.
                  </p>
                </div>

                <form className="w-full" onSubmit={handleSearch}>
                  <div className="flex items-center bg-white rounded-lg border-2 border-blue-500 shadow-lg hover:shadow-xl transition-shadow duration-200">
                    <input
                      type="text"
                      placeholder="Search for a claim, news story, or topic..."
                      className="w-full px-5 py-4 text-lg rounded-l-lg text-black focus:outline-none"
                      value={query}
                      onChange={(e)=> setQuery(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 rounded-r-lg transition-colors duration-200"
                    >
                      <Search size={24} />
                    </button>
                  </div>
                  <div className="mt-4 text-center text-gray-500">
                    Examples: "COVID-19 vaccine safety", "climate change facts",
                    "viral social media claim"
                  </div>
                </form>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="text-blue-600 font-semibold mb-2">
                      Text Analysis
                    </div>
                    <p className="text-sm text-gray-600">
                      Understand the credibility of information sources
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="text-blue-600 font-semibold mb-2">
                      AI Detection
                    </div>
                    <p className="text-sm text-gray-600">
                      Identify potentially AI-generated content
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeOnScroll>
        <FadeOnScroll>
          <TopSearches />
        </FadeOnScroll>
      </main>
    </div>
  );
}
