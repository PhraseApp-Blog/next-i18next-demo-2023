import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Head from 'next/head';
import Link from 'next/link';

export default function Home({ data, locale }) {
  const { t } = useTranslation();

  return (
    <div>
      <Head>
        <title>{t('app_title')}</title>
      </Head>
      <div className='grid grid-rows-4 p-4 md:grid-rows-2 md:p-0 grid-flow-col gap-4'>
        {data.map((news, id) => (
          <div
            key={id}
            className='mt-6 p-6 border-2 border-red-100 hover:border-red-200 shadow-lg hover:shadow-md rounded-md flex flex-col gap-4'
          >
            <p className='font-mono bg-red-100 px-2 w-fit rounded-md'>
              {news.date}
            </p>
            <Link
              href={{
                pathname: '/news/[slug]',
                query: { slug: news.slug },
              }}
              locale={locale}
            >
              <h3 className='text-2xl font-bold text-red-900 hover:underline cursor-pointer'>
                {news.title}
              </h3>
            </Link>

            <p className='italic'>{news.description}</p>
            <Link
              href={{
                pathname: '/news/[slug]',
                query: { slug: news.slug },
              }}
              locale={locale}
              className='p-2 mt-4 w-fit bg-red-800 hover:bg-red-900 text-white
              rounded-md font-semibold uppercase'
            >
              {t('button_label')}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { locale } = context;
  const res = await fetch('http://localhost:3001/' + locale);
  const data = await res.json();

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      data,
      locale,
    },
  };
};
