import React, { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
	children?: ReactNode
	title?: string
}

const Layout = ({
	children,
	title = 'Taylor Vincent, full stack developer portfolio',
}: Props): JSX.Element => (
	<div className="dark:text-white dark:bg-gray-900">
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</Head>
		{children}
	</div>
)

// <meta property="og:image" content="/portfolio-og.jpg" />
// <meta property="og:title" content={title} />
// <meta property="og:description" content="A full description of the page." />
// <meta property="og:image:width" content="1200" />
// <meta property="og:image:height" content="630" />

export default Layout
