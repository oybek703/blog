import { IPost } from '@interfaces/post.interface'
import { FC } from 'react'
import Post from '@components/Post'

interface ISearchResultsProps {
	results: IPost[]
	term?: string
}

const SearchResults: FC<ISearchResultsProps> = ({ results, term }) => {
	if (!term && !results.length) return null
	return (
		<div
			className={`absolute top-20 right-0 
									md:right-10 z-10 border-4
									border-gray-500 bg-white max-h-screen overflow-y-auto
									text-black w-full md:w-6/12 rounded-2xl`}
		>
			<div className="p-5">
				<h2 className="text-3xl mb-3">{results.length} results</h2>
				{results.map(result => (
					<Post forSearch slug={result.slug || ''} post={result} key={result.title} />
				))}
			</div>
		</div>
	)
}

export default SearchResults
