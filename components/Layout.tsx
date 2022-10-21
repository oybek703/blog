import Head from 'next/head'
import { FC, PropsWithChildren } from 'react'
import Header from '@components/Header'

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
				<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
			</Head>
			<Header />
			<main className="container mx-auto my-7">{children}</main>
		</div>
	)
}

Layout.defaultProps = {
	title: 'Development blog',
	keywords: 'programming, coding, news',
	description: 'About programming.'
}

export default Layout
