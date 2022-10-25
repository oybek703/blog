import Layout from '@components/Layout'
import { GetStaticPaths, GetStaticProps } from 'next'
import { readdirSync, readFileSync } from 'fs'
import React from 'react'
import matter from 'gray-matter'
import { join } from 'path'
import { IPost } from '@interfaces/post.interface'
import Link from 'next/link'
import Post from '@components/Post'
import { CategoryTypes, postsFolder, Routes } from '@commons/index'
import CategoryList from '@components/CategoryList'

const CategoryName: React.FC<ICategoryNameProps> = ({ posts, categories, category }) => {
	return (
		<Layout>
			<div className="flex justify-between">
				<div className="w-3/4 mr-10">
					<h1 className="text-5xl border-b-4 p-5 font-bold">Posts in {category}</h1>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
						{posts.map((post, index) => (
							<Post slug={post.slug} key={index} post={post.frontMatter} />
						))}
					</div>
					<Link href={Routes.blog}>
						<a className="bg-gray-900 w-28 flex mt-2 justify-center text-white text-center rounded p-2 font-bold">
							All Posts
						</a>
					</Link>
				</div>
				<div className="w-1/4">
					<CategoryList categories={categories} />
				</div>
			</div>
		</Layout>
	)
}

export const getStaticPaths: GetStaticPaths = () => {
	const paths = readdirSync(postsFolder).map(filename => {
		const { data: frontMatter } = matter(readFileSync(join(postsFolder, filename), 'utf-8'))
		return {
			params: {
				categoryName: frontMatter.category.toLowerCase()
			}
		}
	})
	return {
		paths,
		fallback: false
	}
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getStaticProps: GetStaticProps<ICategoryNameProps> = ({ params }) => {
	if (!params) return { notFound: true }
	const categoryName = params.categoryName
	let categories: CategoryTypes[] = []
	const posts = readdirSync(postsFolder)
		.map(filename => {
			const slug = filename.replace('.md', '')
			const { data: frontMatter } = matter(readFileSync(join(postsFolder, filename), 'utf-8'))
			categories.push(frontMatter.category)
			return {
				slug,
				frontMatter
			}
		})
		.filter(({ frontMatter }) => frontMatter.category.toLowerCase() === categoryName)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		.sort((a, b) => new Date(b.frontMatter.date) - new Date(a.frontMatter.date))
	categories = Array.from(new Set(categories))
	const category = categories.find(category => category.toLowerCase() === categoryName)
	return {
		props: {
			posts,
			category,
			categories
		}
	}
}

interface ICategoryNameProps {
	posts: {
		slug: string
		frontMatter: IPost
	}[]
	category: string
	categories: CategoryTypes[]
}

export default CategoryName
