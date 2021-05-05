import { GetStaticProps } from 'next';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import { FC, useMemo, useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';

import { motion } from 'framer-motion';
import renderCommonMetaTags from 'utils/renderCommonMetaTags';

import Navbar from 'components/Navibar/NaviBar';
import SectionWithContainer from 'components/SectionWithContainer/SectionWithContainer';
import TenderDetailCard from 'components/TenderDetailCard/TenderDetailCard';
import { ITender } from 'models/ITender';

import MainLayout from '../layouts/MainLayout';

interface IProps {
  statusCode?: number;
  host: string;
  tenders: ITender[];
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // const api = fetcherNextJSAPI();
    // const [] = await Promise.all([
    //   // TODO: Add the requests
    // ]);
    const tender: ITender = {
      ID: 1,
      Buyer_ID: 1,
      Buyer: {
        ID: 1,
        Name: 'Name',
        ABN: 'ABN',
        Logo: 'Logo',
        CreatedAt: '2020-08-01',
        UpdatedAt: '2020-08-01',
        DeletedAt: '2020-08-01',
      },
      PublishedAt: '2022-03-01',
      ClosingAt: '2021-04-29',
      Title: 'Title',
      HeadingImage:
        'https://images.unsplash.com/photo-1584715787746-75b93b83bf14?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
      Description: 'Description',
      State_ID: 1,
      State: {
        ID: 1,
        Name: 'City',
        Acronym: 'CIT',
      },
      City_ID: 1,
      City: {
        ID: 1,
        Name: 'Cool City',
        State_ID: 1,
      },
      Offer: 2323.23,
      DeletedAt: '2022-03-01',
      CreatedAt: '2022-03-01',
      UpdatedAt: '2022-03-01',
      SupplyCategories: [
        {
          ID: 1,
          Name: 'Name',
          Description: 'Name',
        },
        {
          ID: 1,
          Name: 'Name',
          Description: 'Other Name',
        },
      ],
    };
    return {
      props: {
        tenders: [
          tender,
          tender,
          tender,
          tender,
          tender,
          tender,
          tender,
          tender,
        ],
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

const TendersPage: FC<IProps> = ({ tenders, statusCode = null, host = '' }) => {
  const [search, setSearch] = useState<string>('');
  const filteredTender = useMemo(() => {
    return tenders.filter(tender => {
      return tender.Title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
  }, [search, tenders]);

  if (statusCode) {
    return <ErrorPage statusCode={statusCode} />;
  }

  return (
    <>
      <Head>
        {renderCommonMetaTags(
          'rfq-cres',
          'rfq-cres Description',
          undefined,
          `${host}/`,
          undefined,
          'rfq-cres',
          undefined,
        )}
      </Head>
      <MainLayout>
        <motion.div
          key="my-tenders"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
        >
          <Navbar />
          <SectionWithContainer>
            <Row className="justify-content-between">
              <Col md="auto">
                <h1 className="mb-3">Tenders</h1>
              </Col>
            </Row>
            <Row className="justify-content-md-center mt-5">
              <h4 className="text-center">Looking for current tenders?</h4>
            </Row>
            <Row className="justify-content-md-center mt-3">
              {/* I want to put searchbar in the center of this image */}
              {/* <SectionWithContainer className="position-relative">
                                <img
                                    src="images/tenders_bg.jpg"
                                    alt="Office Background"
                                    width="100%"
                                    height="500px"
                                />
                            </SectionWithContainer> */}
              <Col lg="6">
                <Form.Control
                  value={search}
                  onChange={({ target: { value } }) => {
                    setSearch(value);
                  }}
                />
              </Col>
              <Col md="auto">
                <Button>Search</Button>
              </Col>
            </Row>
            <Row className="mt-5">
              {filteredTender.map((tender: ITender) => (
                <Col key={tender.ID} md={3} className="mb-3">
                  <Link href={`/tenders/${tender.ID}`} passHref>
                    <Button
                      variant="link"
                      className="p-0 text-dark text-left radius-0"
                      as="a"
                    >
                      <TenderDetailCard tender={tender} />
                    </Button>
                  </Link>
                </Col>
              ))}
            </Row>
          </SectionWithContainer>
        </motion.div>
      </MainLayout>
    </>
  );
};

export default TendersPage;
