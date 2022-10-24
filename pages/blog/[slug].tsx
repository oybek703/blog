import { FC } from 'react'
import { GetServerSideProps, GetStaticPaths } from 'next'
import { readdirSync, readFileSync } from 'fs'
import Layout from '@components/Layout'
import { postsFolder } from '@commons/index'
import matter from 'gray-matter'
import { join } from 'path'
import { IPost } from '@interfaces/post.interface'

const SinglePost: FC<ISinglePostProps> = ({ slug, frontMatter, content }) => {
	console.log(frontMatter)
	return (
		<Layout>
			<h1>{slug}</h1>
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
