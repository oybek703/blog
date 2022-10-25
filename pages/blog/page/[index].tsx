import Layout from '@components/Layout'
import { GetStaticPaths, GetStaticProps } from 'next'
import { readdirSync, readFileSync } from 'fs'
import React from 'react'
import matter from 'gray-matter'
import { join } from 'path'
import { IPost } from '@interfaces/post.interface'
import Posts from '@components/Posts'
import { postsFolder } from '@commons/index'
import { POST_PER_PAGE } from '@config/index'

const BlogPage: React.FC<IHomeProps> = ({ posts, page, numPages }) => {
	return (
		<Layout>
			<h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
				{posts.map((post, index) => (
					<Posts slug={post.slug} key={index} post={post.frontMatter} />
				))}
			</div>
		</Layout>
	)
}

export const getStaticPaths: GetStaticPaths = () => {
	const pages = readdirSync(postsFolder)
	const paths = []
	const numPages = Math.ceil(pages.length / POST_PER_PAGE)
	for (let i = 0; i <= numPages; i++) {
		paths.push({ params: { index: i.toString() } })
	}
	return {
		paths,
		fallback: false
	}
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getStaticProps: GetStaticProps<IHomeProps> = ({ params }) => {
	if (!params) return { notFound: true }
	let posts = readdirSync(postsFolder)
		.map(filename => {
			const slug = filename.replace('.md', '')
			const { data: frontMatter } = matter(readFileSync(join(postsFolder, filename)))
			return {
				slug,
				frontMatter
			}
		})
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		.sort((a, b) => new Date(b.frontMatter.date) - new Date(a.frontMatter.date))
	const page = parseInt(params.index as string) || 1
	const pageIndex = page - 1
	const numPages = Math.ceil(posts.length / POST_PER_PAGE)
	posts = posts.slice(pageIndex * POST_PER_PAGE, (pageIndex + 1) * POST_PER_PAGE)
	return {
		props: {
			posts,
			page,
			numPages
		}
	}
}

interface IHomeProps {
	posts: {
		slug: string
		frontMatter: IPost
	}[]
	numPages: number
	page: number
}

export default BlogPage
