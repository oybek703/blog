export enum Routes {
	home = '/',
	blog = '/blog',
	about = '/about'
}

export const postsFolder = 'posts'
export const cacheFolder = 'cache'

export enum Colors {
	JavaScript = 'yellow',
	CSS = 'blue',
	Python = 'green',
	PHP = 'gray',
	Ruby = 'red'
}

export type CategoryTypes = keyof typeof Colors
