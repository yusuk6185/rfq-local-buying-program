import { GetStaticProps } from 'next';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { motion } from 'framer-motion';
import realRequest from 'utils/realRequest';
import renderCommonMetaTags from 'utils/renderCommonMetaTags';

import SupplierProfile from 'components/SupplierProfile/SupplierProfile';
import { ISupplier } from 'models/ISupplier';

import MainLayout from '../../layouts/MainLayout';

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true, // See the "fallback" section below
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  try {
    // const api = fetcherNextJSAPI();
    // const [] = await Promise.all([
    //   // TODO: Add the requests
    // ]);
    const {
      data: { data: supplier },
    } = await realRequest(`/api/suppliers/${params?.id || '0'}`);
    // console.log('jashdkaddjhsdhakjhks');
    return {
      props: {
        supplier,
      },
      revalidate: 60, // time in seconds
    };
  } catch (error) {
    console.error('[ERROR]', error);
    return {
      props: {
        statusCode: error.status || null,
      },
      revalidate: 1, // time in seconds
    };
  }
};

interface IProps {
  statusCode?: number;
  host: string;
  supplier: ISupplier;
}

const SupplierProfilePage: FC<IProps> = ({
  supplier,
  statusCode = null,
  host = '',
}) => {
  const { isFallback } = useRouter();
  if (isFallback) {
    return <h2>IS Loading</h2>;
  }
  if (statusCode || !supplier) {
    return <ErrorPage statusCode={statusCode || 400} />;
  }
  return (
    <>
      <Head>
        {renderCommonMetaTags(
          'rfq-cres - Subscribe Page',
          'Subscribe Page - Description',
          undefined,
          `${host}/`,
          undefined,
          'Subscribe Page',
          undefined,
        )}
      </Head>
      <MainLayout>
        <motion.div
          key="homepage"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
        >
          <SupplierProfile supplier={supplier} />
        </motion.div>
      </MainLayout>
    </>
  );
};

export default SupplierProfilePage;
