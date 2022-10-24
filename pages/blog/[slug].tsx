import { FC } from 'react'
import { GetServerSideProps, GetStaticPaths } from 'next'
import { readdirSync, readFileSync } from 'fs'
import Layout from '@components/Layout'
import { CategoryTypes, postsFolder, Routes } from '@commons/index'
import matter from 'gray-matter'
import { join } from 'path'
import { IPost } from '@interfaces/post.interface'
import Link from 'next/link'
import CategoryLabel from '@components/CategoryLabel'
import { marked } from 'marked'

const SinglePost: FC<ISinglePostProps> = ({ slug, frontMatter, content }) => {
	return (
		<Layout title={frontMatter.title}>
			<Link href={Routes.blog}>
				<a className="p-2 bg-gray-600 text-white rounded font-bold">Go Back</a>
			</Link>
			<div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
				<div className="flex justify-between items-center mt-4">
					<h1 className="text-5xl mb-7">{frontMatter.title}</h1>
					<CategoryLabel category={frontMatter.category as CategoryTypes} />
				</div>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img className="w-full rounded" src={frontMatter.cover_image} alt={frontMatter.title} />
			</div>
			<div className="flex justify-between items-center bg-gray-100 p-2 my-8">
				<div className="flex justify-center items-center">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={frontMatter.author_image}
						alt={frontMatter.title}
						className="mx-4 w-10 h-10 object-cover rounded-full"
					/>
					<h4>{frontMatter.author}</h4>
				</div>
				<div className="mr-4">{frontMatter.date}</div>
			</div>
			<div className="blog-text mt-2" dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
		</Layout>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = readdirSync(postsFolder).map(filename => ({ params: { slug: filename.replace('.md', '') } }))
	return {
		paths,
		fallback: false
	}
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getStaticProps: GetServerSideProps<ISinglePostProps> = async ({ params }) => {
	if (!params || !params.slug) return { notFound: true }
	const { content, data: frontMatter } = matter(readFileSync(join(postsFolder, `${params.slug}.md`), 'utf-8'))
	return {
		props: {
			slug: params.slug,
			frontMatter,
			content
		}
	}
}

interface ISinglePostProps {
	slug: string | unknown
	frontMatter: IPost
	content: string
}

export default SinglePost
