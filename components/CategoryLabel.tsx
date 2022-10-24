import { FC } from 'react'
import Link from 'next/link'
import { Routes } from '@commons/index'

export enum Colors {
	JavaScript = 'yellow',
	CSS = 'blue',
	Python = 'green',
	PHP = 'gray',
	Ruby = 'red'
}

interface ICategoryLabelProps {
	category: keyof typeof Colors
}

const CategoryLabel: FC<ICategoryLabelProps> = ({ category }) => {
	return (
		<div className={`px-2 py-1 text-gray-100 font-bold rounded bg-${Colors[category]}-600`}>
			<Link href={`${Routes.blog}/category/${category.toLowerCase()}`}>{category}</Link>
		</div>
	)
}

export default CategoryLabel
