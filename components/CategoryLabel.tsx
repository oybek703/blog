import { FC } from 'react'
import Link from 'next/link'
import { CategoryTypes, Colors, Routes } from '@commons/index'

interface ICategoryLabelProps {
	category: CategoryTypes
}

const CategoryLabel: FC<ICategoryLabelProps> = ({ category }) => {
	return (
		<Link href={`${Routes.blog}/category/${category.toLowerCase()}`}>
			<a className={`px-2 py-1 text-gray-100 font-bold rounded bg-${Colors[category]}-600`}>{category}</a>
		</Link>
	)
}

export default CategoryLabel
