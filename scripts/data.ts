import { mkdirSync, readdirSync, readFileSync, writeFile } from 'fs'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const matter = require('gray-matter')
import { join } from 'path'

function postData() {
	const posts = readdirSync('posts').map(filename => {
		const slug = filename.replace('.md', '')
		const { data: frontMatter } = matter(readFileSync(join('posts', filename), 'utf-8'))
		Object.assign(frontMatter, { slug })
		return frontMatter
	})
	return JSON.stringify(posts)
}

try {
	readdirSync('cache')
} catch (e: unknown) {
	mkdirSync('cache')
}

writeFile(join('cache', 'data.json'), postData(), function (err) {
	if (err) console.log(err.message)
	console.log('Posts cached!')
})
