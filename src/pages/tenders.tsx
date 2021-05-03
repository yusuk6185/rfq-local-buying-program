import { GetStaticProps } from 'next';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import { FC, useState, useMemo, useEffect } from 'react';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import MainLayout from 'layouts/MainLayout';
import moment from 'moment';
import { $enum } from 'ts-enum-util';
import renderCommonMetaTags from 'utils/renderCommonMetaTags';

import NavBar from 'components/Navibar/NaviBar';
import SectionWithContainer from 'components/SectionWithContainer/SectionWithContainer';
import TenderDetailCard from 'components/TenderDetailCard/TenderDetailCard';
import { ITender } from 'models/ITender';

import styles from '../styles/tenders.module.css';

interface IProps {
  statusCode?: number;
  host: string;
  tenders: ITender[];
}

enum TenderState {
  closed = 'Closed',
  active = 'Active',
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

function SearchBar(props) {
  const [innerSearch, setInnerSearch] = useState('');
  return (
    <div className={styles.searchbar}>
      <input
        aria-labelledby="search-button"
        name="search"
        id="search"
        type="search"
        placeholder="Tenders"
        value={innerSearch}
        onChange={e => setInnerSearch(e.target.value)}
        className={styles.search}
      />
      <Button
        className={styles.searchbtn}
        onClick={() => props.onSubmit(innerSearch)}
      >
        Search
      </Button>
    </div>
  );
}

const TendersPage: FC<IProps> = ({ tenders, statusCode = null, host = '' }) => {
  const [tenderFilter, setTenderFilter] = useState<TenderState>();
  const [search, setSearch] = useState('');
  const [tenderss, setTenders] = useState([]);
  const [searchedTender, setSearchedTender] = useState([]);
  const filteredTender = useMemo(() => {
    switch (tenderFilter) {
      case TenderState.closed:
        return tenders.filter(tender => {
          return moment().startOf('day').isAfter(moment(tender.ClosingAt));
        });
      case TenderState.active:
        return tenders.filter(tender => {
          return moment()
            .startOf('day')
            .isSameOrBefore(moment(tender.ClosingAt));
        });
      default:
        return tenders;
    }
  }, [tenderFilter, tenders]);

  useEffect(() => {
    setSearchedTender(
      tenderss.filter((tender: ITender) =>
        tender.Title.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search]);

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
        <SectionWithContainer>
          <NavBar />
        </SectionWithContainer>
        <SectionWithContainer>
          <h1>Tenders</h1>
          <SectionWithContainer className="searchbarcontainer">
            <img
              src="images/tenders_bg.jpg"
              alt="Office Background"
              width="100%"
              height="500px"
            />
            <div>
              <SearchBar onSubmit={setSearch} onClick={setTenders} />
              {/* I added onclick just to erase error for the git commit */}
            </div>
          </SectionWithContainer>
          <Row className="justify-content-between">
            <Col md="auto">
              <h1 className="mb-3">Tenders List</h1>
            </Col>
            <Col md="auto">
              <ButtonGroup size="sm">
                <Button
                  onClick={() => setTenderFilter(undefined)}
                  variant={
                    tenderFilter === undefined ? undefined : 'outline-primary'
                  }
                >
                  All
                </Button>
                {$enum(TenderState).map(value => (
                  <Button
                    onClick={() => setTenderFilter(value)}
                    key={value}
                    variant={
                      value === tenderFilter ? 'primary' : 'outline-primary'
                    }
                  >
                    {value}
                  </Button>
                ))}
              </ButtonGroup>
            </Col>
          </Row>
          <Row>
            {/* 
          I want to show this when search is executed
          */}
            <Row>
              {searchedTender.map((tender: ITender) => (
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
      </MainLayout>
    </>
  );
};

export default TendersPage;
