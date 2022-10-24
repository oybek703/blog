import Layout from '@components/Layout'
import { GetStaticProps } from 'next'
import { readdirSync, readFileSync } from 'fs'
import React from 'react'
import matter from 'gray-matter'
import { join } from 'path'

const Home: React.FC<IHomeProps> = ({ posts }) => {
	console.log(posts)
	return (
		<Layout>
			<h1 className="text-red-500 text-3xl">About me</h1>
		</Layout>
	)
}

export const getStaticProps: GetStaticProps<IHomeProps> = async () => {
	const postsFolder = 'posts'
	const posts = readdirSync(postsFolder).map(filename => {
		const slug = filename.replace('.md', '')
		const { data: frontMatter } = matter(readFileSync(join(postsFolder, filename)))
		return {
			slug,
			frontMatter
		}
	})
	return {
		props: {
			posts
		}
	}
}

interface IHomeProps {
	posts: { slug: string; frontMatter: object }[]
}

export default Home
