import { FC } from 'react'
import { Routes } from '@commons/index'
import Link from 'next/link'

interface IPaginationProps {
	page: number
	numPages: number
}

const Pagination: FC<IPaginationProps> = ({ numPages, page }) => {
	const isFirst = page === 1
	const isLast = page === numPages
	const prevPage = `${Routes.blog}/page/${page - 1}`
	const nextPage = `${Routes.blog}/page/${page + 1}`
	if (numPages === 1) return null
	return (
		<div className="mt-6">
			<ul className="flex pl-0 list-none my-2">
				{!isFirst && (
					<Link href={prevPage}>
						<a className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer">
							Previous
						</a>
					</Link>
				)}
				{Array.from({ length: numPages }, (_, i) => (
					<Link key={i} href={`${Routes.blog}/page/${i + 1}`}>
						<a
							className={`relative block py-2 px-3 
							leading-tight bg-white border border-gray-300 mr-1
							${
								i + 1 === page
									? 'cursor-not-allowed hover:outline-none border-gray-200 bg-gray-700 text-white'
									: 'hover:bg-gray-200 cursor-pointer text-gray-800 text-gray-800'
							}`}
						>
							{i + 1}
						</a>
					</Link>
				))}
				{!isLast && (
					<Link href={nextPage}>
						<a className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer">
							Next
						</a>
					</Link>
				)}
			</ul>
		</div>
	)
}

export default Pagination
