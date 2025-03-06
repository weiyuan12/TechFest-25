import { useState } from "react";
import { Search } from 'lucide-react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
		<div className="flex w-full h-screen justify-center items-center">
			<div className="w-full flex-1 max-w-3xl border border-red-500">
				<form className="relative">
					<div className="flex items-center bg-white rounded-lg border-2 border-blue-500 shadow-lg hover:shadow-xl transition-shadow duration-200">
						<input
							type="text"
							placeholder="Search for a claim, news story, or topic..."
							className="w-full px-5 py-4 text-lg rounded-l-lg focus:outline-none"
						/>
						<button
							type="submit"
							className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-r-lg transition-colors duration-200"
						>
							<Search size={24} />
						</button>
					</div>
				</form>

				<div className="mt-4 text-center text-gray-500">
					Examples: "COVID-19 vaccine safety", "climate change facts", "viral
					social media claim"
				</div>
			</div>
		</div>
  );
}
