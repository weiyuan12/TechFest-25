import { Image, Search } from "lucide-react";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import TopSearches from "../components/TopSearches";
import FadeOnScroll from "../components/FadeOnScroll";
import { sendSearchTextRequest, sendSearchImageRequest } from "../api/Search";
import { useCallback, useContext, useState, useRef } from "react";
import { UserContext } from "../context/UserContext.jsx";
import SignInModal from "../components/SignInModal.jsx";
import { IconButton } from "@material-tailwind/react";
import { useNavigate } from "react-router";


export default function Home() {
  const navigate  = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [displaySignInPage, setDisplaySignInPage] = useState(false);
  const [query, setQuery] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const inputFile = useRef(null);
  const signIn = useCallback(() => {
    setDisplaySignInPage(true);
    console.log("Sign in");
  }, [displaySignInPage]);
  const onButtonClick = () => {
    inputFile.current.click();
  };
  const handleFileChange = (event) => {
    event.preventDefault();
    const fileUpload = event.target.files[0];
    setFile(fileUpload)
    setImagePreview(URL.createObjectURL(fileUpload));
    console.log(fileUpload);
  };
  const handleCallback = (username) => {
    setUser(username);
    setDisplaySignInPage(false);
  };
  const removeImage = () => {
    setImagePreview(null);
    setFile(null)
  }

  async function handleSearch(event) {
    event.preventDefault();
    if (file) {
      const response = await sendSearchImageRequest(file, user)
    }
    else {
      const response = await sendSearchTextRequest(query, user)
    }
    navigate("/search");
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <Header user={user} signIn={signIn} />
      <main className="flex flex-col w-full mt-18">
        <SignInModal
          isOpen={displaySignInPage}
          onClose={() => setDisplaySignInPage(false)}
          callbackUserName={handleCallback}
        />
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
                {imagePreview && (
                      <div className="mt-2 relative flex flex-row gap-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="h-24 rounded-md"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="h-6 bg-gray-800 bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-70"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-x"
                          >
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                          </svg>
                        </button>
                      </div>
                    )}
                <form className="w-full" onSubmit={handleSearch}>
                  <div className="flex items-center bg-white rounded-lg border-2 border-blue-600 shadow-lg">
                    <input
                      type="text"
                      placeholder="Search for a claim, news story, or topic..."
                      className="w-full px-6 py-4 text-2xl text-black bg-transparent rounded-full focus:outline-none"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />

                    {/* Image Upload Button */}
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer mx-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                    >
                      <input
                        id="image-upload"
                        ref={inputFile}
                        onChange={handleFileChange}
                        type="file"
                        accept="image/*"
                        className="hidden"
                      />
                      <IconButton
                        onClick={onButtonClick}
                        id="upload"
                        type="button"
                      >
                        <Image className="stroke-blue-600 stroke-2 h-8 w-8 transition-transform duration-200 transform hover:scale-105" />
                      </IconButton>
                    </label>

                    {/* Search Button */}
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-lg transition-transform duration-200 transform hover:scale-105 mr-2 flex items-center justify-center cursor-pointer"
                    >
                      {/* <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                      </svg> */}
                      <Search
                        size={28}
                        viewBox="0 0 24 24"
                        className="transition-transform duration-200 transform hover:scale-105"
                      />
                    </button>
                  </div>
                  <div className="mt-4 text-center text-gray-500">
                    Examples:{" "}
                    <span className="font-medium">
                      "COVID-19 vaccine safety"
                    </span>
                    ,<span className="font-medium">"climate change facts"</span>
                    ,
                    <span className="font-medium">
                      "viral social media claim"
                    </span>
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
