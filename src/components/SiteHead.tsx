import Head from 'next/head';

export default function SiteHead({ title = 'My first App' }) {
    return (
        <Head>
            <title>{title}</title>
            <meta name='robots' content='noindex' />
        </Head>
    );
}
