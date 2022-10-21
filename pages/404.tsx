import { FC } from 'react'
import Layout from '@components/Layout'
import Image from 'next/image'

const NotFound: FC = () => {
	return (
		<Layout title="Page not found">
			<div className="flex flex-col items-center mt-20">
				<Image src="/images/logo.png" alt="DevSpace logo" width={40} height={40} className="bg-gray-800 rounded-2xl" />
				<h1 className="text-6xl my-5">Not found!</h1>
				<h2 className="text-4xl text-gray-400 mb-5">This page does not exist!</h2>
			</div>
		</Layout>
	)
}

export default NotFound
