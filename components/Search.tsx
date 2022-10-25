import { useEffect, useState } from 'react'
import { FaSearch, FaSpinner } from 'react-icons/fa'
import { IPost } from '@interfaces/post.interface'
import SearchResults from '@components/SearchResults'
import { useRouter } from 'next/router'

const Search = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [term, setTerm] = useState<string>('')
	const [searchResults, setSearchResults] = useState<IPost[]>([])

	const router = useRouter()
	useEffect(
		function () {
			setTerm('')
		},
		[router]
	)

	async function fetchResults() {
		try {
			if (term) {
				setLoading(true)
				const response = await fetch(`/api/search?q=${term}`)
				const results: IPost[] = await response.json()
				setSearchResults(results)
				setLoading(false)
			}
		} catch (e: unknown) {
			if (e instanceof Error) {
				console.log(e.message)
			}
		}
	}

	useEffect(
		function () {
			const timeOutId = setTimeout(async () => await fetchResults(), 500)
			return () => clearTimeout(timeOutId)
		},
		//eslint-disable-next-line
		[term]
	)

	return (
		<div className="relative bg-gray-600 p-4">
			<div className="container mx-auto flex items-center justify-center md:justify-end">
				<div className="relative text-gray-600 w-72">
					<form>
						<input
							type="text"
							value={term}
							onChange={event => setTerm(event.target.value)}
							placeholder="Search posts..."
							className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-72"
						/>
						{loading ? (
							<FaSpinner className="absolute loaderIcon cursor-pointer top-0 right-0 text-black mt-3 mr-4" />
						) : (
							<FaSearch className="absolute cursor-pointer top-0 right-0 text-black mt-3 mr-4" />
						)}
					</form>
				</div>
			</div>
			{term && <SearchResults term={term} results={searchResults} />}
		</div>
	)
}

export default Search
