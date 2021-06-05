import { GetStaticProps } from 'next';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';

import { motion } from 'framer-motion';
import moment from 'moment';
import currencyFormat from 'utils/curencyFormat';
import realRequest from 'utils/realRequest';
import renderCommonMetaTags from 'utils/renderCommonMetaTags';

import SectionWithContainer from 'components/SectionWithContainer/SectionWithContainer';
import { useAuth } from 'contexts/authContext';
import { IProposal } from 'models/IProposal';

import MainLayout from '../../layouts/MainLayout';

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true, // See the "fallback" section below
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const {
      data: { data: proposal },
    } = await realRequest.get<{ data: IProposal }>(
      `/api/proposals/${params?.id || '0'}`,
    );
    return {
      props: {
        proposal,
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
  proposal: IProposal;
}

const ProposalDetailPage: FC<IProps> = ({
  proposal,
  statusCode = null,
  host = '',
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  if (router.isFallback) {
    return <h2>...Loading</h2>;
  }
  if (statusCode || !proposal) {
    return <ErrorPage statusCode={statusCode || 400} />;
  }

  const handleChooseTheProposal = async () => {
    setLoading(true);
    try {
      await realRequest.put(`/api/proposals/${proposal.ID}`, {
        ApprovedAt: moment().utc().toISOString(),
      });
      router.back();
    } finally {
      setLoading(false);
    }
  };

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
          <SectionWithContainer>
            <h4>{proposal.Tender?.Title}</h4>
            <div>
              <small className="d-block">ESTIMATED DELIVERY</small>
              <span>
                {moment(proposal.Tender?.ClosingAt).format('DD/MM/YYYY')}
              </span>
              <Row className="justify-content-between align-items-center">
                <Col md="auto">
                  <Row className="align-items-center">
                    <Col md="auto">
                      <img
                        className="img-thumbnail"
                        src={proposal.Supplier?.Logo}
                        alt={proposal.Supplier?.Name}
                        width={80}
                      />
                    </Col>
                    <Col md="auto">
                      <strong className="d-block">
                        {proposal.Supplier?.Name}
                      </strong>
                      <ul className="pl-0 list-style-type-none">
                        {(proposal?.Supplier?.SupplyCategories || []).map(
                          supplyCategory => (
                            <li key={supplyCategory.ID} md="auto">
                              <Badge variant="primary">
                                <p className="m-0 p-1">{supplyCategory.Name}</p>
                              </Badge>
                            </li>
                          ),
                        )}
                      </ul>
                    </Col>
                  </Row>
                </Col>
                <Col md="auto">
                  <Row>
                    <Col md="auto">
                      <Button size="sm" variant="outline-success">
                        <strong>4</strong> Attachments
                      </Button>
                    </Col>
                    <Col md="auto">
                      <Button
                        as="a"
                        size="sm"
                        variant="outline-primary"
                        href={`mailto:${proposal?.Supplier?.User?.Email}`}
                      >
                        Contact the local business
                      </Button>
                    </Col>
                    {user?.Buyer_ID === proposal?.Tender?.Buyer_ID &&
                      !proposal.ApprovedAt && (
                        <Col md="auto">
                          <Button
                            disabled={loading}
                            onClick={handleChooseTheProposal}
                            size="sm"
                            variant="outline-success"
                          >
                            Choose the Proposal
                          </Button>
                        </Col>
                      )}
                    {proposal.ApprovedAt && (
                      <Col md="auto">
                        <Badge variant="success" pill>
                          <p className="m-0 p-2 font-weight-bold">Approved</p>
                        </Badge>
                      </Col>
                    )}
                  </Row>
                </Col>
              </Row>
            </div>
            <Row className="pt-5 mb-n3">
              <Col md={6} className="mb-3">
                <h4 className="font-weight-bold mb-3">Description</h4>
                <div
                  dangerouslySetInnerHTML={{ __html: proposal.Description }}
                />
              </Col>
              <Col md={6} className="mb-3">
                <Card body>
                  <h5 className="font-weight-bold mb-3">Required products</h5>
                  <ul className="pl-0 list-style-type-none mb-n3">
                    {(proposal.ProposalTenderProducts || []).map(
                      proposalTenderProduct => (
                        <li key={proposalTenderProduct.ID} className="mb-3">
                          <Card body>
                            <Row className="align-items-center justify-content-between">
                              <Col>
                                <h3 className="m-0">
                                  {proposalTenderProduct.TenderProduct?.Name}
                                </h3>
                              </Col>
                              <Col md="auto">
                                <strong className="mr-2">Offer:</strong>
                                <span>
                                  {currencyFormat(proposalTenderProduct.Offer)}
                                </span>
                              </Col>
                            </Row>
                          </Card>
                        </li>
                      ),
                    )}
                  </ul>
                </Card>
              </Col>
            </Row>
          </SectionWithContainer>
        </motion.div>
      </MainLayout>
    </>
  );
};

export default ProposalDetailPage;
