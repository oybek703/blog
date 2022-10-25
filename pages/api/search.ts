import type { NextApiRequest, NextApiResponse } from 'next'
import { readdirSync, readFileSync } from 'fs'
import { cacheFolder, postsFolder } from '@commons/index'
import matter from 'gray-matter'
import { join } from 'path'
import { IPost } from '@interfaces/post.interface'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { q } = req.query
	let posts: IPost[]
	if (process.env.NODE_ENV === 'production') {
		posts = JSON.parse(readFileSync(join(cacheFolder, 'data.json'), 'utf-8'))
	} else {
		posts = readdirSync(postsFolder).map(filename => {
			const slug = filename.replace('.md', '')
			const { data: frontMatter } = matter(readFileSync(join(postsFolder, filename), 'utf-8'))
			Object.assign(frontMatter, { slug })
			return frontMatter as IPost
		})
	}
	const results = posts.filter(
		({ title, excerpt, author, date, category }) =>
			title.toLowerCase().indexOf(q as string) != -1 ||
			excerpt.toLowerCase().indexOf(q as string) != -1 ||
			author.toLowerCase().indexOf(q as string) != -1 ||
			date.toLowerCase().indexOf(q as string) != -1 ||
			category.toLowerCase().indexOf(q as string) != -1
	)
	res.status(200).json(results)
}
