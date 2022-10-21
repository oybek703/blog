import Head from 'next/head'
import { FC, PropsWithChildren } from 'react'

interface ILayoutProps {
	title?: string
	keywords?: string
	description?: string
}

const Layout: FC<PropsWithChildren<ILayoutProps>> = ({ title, children, keywords, description }) => {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name="keywords" content={keywords} />
				<meta name="description" content={description} />
			</Head>
			<main className="container mx-auto my-7">{children}</main>
		</div>
	)
}

Layout.defaultProps = {
	title: 'Yoriqulov personal blog',
	keywords: 'yoriqulov, programming, sport',
	description: 'About me.'
}

export default Layout
