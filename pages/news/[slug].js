import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

export default function NewsDetail({ data }) {
  const { t } = useTranslation();
  return (
    <div className='mt-6 py-6 px-20'>
      <div className='flex justify-between'>
        <Link
          href='/'
          className='underline underline-offset-2 underine-red hover:no-underline text-red-900'
        >
          ⏎ {t('homepage_nav_link_label')}
        </Link>
        <p className='font-mono bg-red-100 px-2 w-fit'>{data.date}</p>
      </div>

      <article className='container'>
        <h1 className='mt-6 text-4xl font-bold'>{data.title}</h1>
        <div className='mt-6'>
          <p>{data.content}</p>
        </div>
      </article>
    </div>
  );
}

export const getStaticPaths = async ({ locales }) => {
  const res = await fetch('http://localhost:3001/');
  const data = await res.json();

  const paths = data.flatMap((news) => {
    return locales.map((locale) => ({
      params: {
        slug: news.slug,
      },
      locale,
    }));
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const newsSlug = context.params.slug;
  const currentLocale = context.locale;

  const res = await fetch(`http://localhost:3001/${currentLocale}/${newsSlug}`);
  const data = await res.json();

  return {
    props: {
      ...(await serverSideTranslations(currentLocale, ['common'])),
      data,
    },
  };
};
