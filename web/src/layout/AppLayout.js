import Head from 'next/head';
import React from "react";

export default function AppLayout({ children }) {

	return (
		<>
			<Head>
				<title>MovieHut</title>
				<meta name="Your movie search engine" />
				<link rel="icon" type="image/png" sizes="32x32" href="../unnamed.png"></link>
			</Head>
			{children}
		</>
	);
}