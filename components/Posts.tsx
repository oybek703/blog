import { FC } from 'react'
import { IPost } from '@interfaces/post.interface'
import Image from 'next/image'
import Link from 'next/link'
import CategoryLabel, { Colors } from '@components/CategoryLabel'
import { Routes } from '@commons/index'

interface IPostProps {
	post: IPost
	slug: string
}

const Posts: FC<IPostProps> = ({ post, slug }) => {
	return (
		<div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
			<Image className="mb-4 rounded" src={post.cover_image} width={600} height={420} alt={post.title} />
			<div className="flex justify-between items-center">
				<span className="font-light text-gray-600">{post.date}</span>
				<CategoryLabel category={post.category as keyof typeof Colors} />
			</div>
			<div className="mt-2">
				<Link href={`${Routes.blog}/${slug}`}>
					<a className="text-2xl text-gray-600 font-bold hover:underline">{post.title}</a>
				</Link>
				<p className="mt-2 text-gray-600">{post.excerpt}</p>
			</div>
			<div className="mt-2 flex justify-between items-center">
				<Link href={`${Routes.blog}/${slug}`}>
					<a className="bg-blue-600 text-white whitespace-nowrap font-bold px-2 py-1 rounded hover:bg-blue-900">
						Read more
					</a>
				</Link>
				<div className="flex items-center">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						className="mx-4 w-9 h-9 object-cover rounded-full hidden sm:block"
						src={post.author_image}
						alt="Author image"
					/>
					<div className="text-gray-600 font-bold mx-2">{post.author}</div>
				</div>
			</div>
		</div>
	)
}

export default Posts
