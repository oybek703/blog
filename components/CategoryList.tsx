import { CategoryTypes, Routes } from '@commons/index'
import { FC } from 'react'
import Link from 'next/link'

interface ICategoryListProps {
	categories: CategoryTypes[]
}
const CategoryList: FC<ICategoryListProps> = ({ categories }) => {
	return (
		<div className="w-full p-5 bg-white rounded-lg shadow-md mt-2">
			<h3 className="text-2xl bg-gray-800 text-white p-3 rounded">Categories</h3>
			<ul className="divide-y divide-gray-300">
				{categories.map(category => (
					<Link href={`${Routes.blog}/category/${category.toLowerCase()}`} key={category}>
						<a className="p-4 block cursor-pointer hover:bg-gray-50">{category}</a>
					</Link>
				))}
			</ul>
		</div>
	)
}

export default CategoryList
