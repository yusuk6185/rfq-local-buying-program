import { GetStaticProps } from 'next';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import { FC } from 'react';
import {Button, Card, Col, Form, Row} from 'react-bootstrap';

import { motion } from 'framer-motion';

import NaviBar from 'components/Navibar/NaviBar';
import SectionWithContainer from 'components/SectionWithContainer/SectionWithContainer';
import SupplierDetailCard from 'components/TenderDetailCard/SupplierDetailCard';
import TenderDetailCard from 'components/TenderDetailCard/TenderDetailCard';
import { ISupplier } from 'models/ISupplier';
import { ITender } from 'models/ITender';

import MainLayout from '../layouts/MainLayout';
import renderCommonMetaTags from '../utils/renderCommonMetaTags';

interface IProps {
  statusCode?: number;
  host: string;
  tenders: ITender[];
  suppliers: ISupplier[];
}

const LoginPage: FC<IProps> = ({
  statusCode = null,
  host = '',
}) => {
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
          key="homepage"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
        >
          <SectionWithContainer className="bg-primary vh-100 d-flex align-items-center justify-content-between">
            <Row>
              <Col className="offset-md-4" md={4}>
                <Card>
                  <Card.Body className="p-4">
                    <Form>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" />
                      </Form.Group>
                      <Button className="w-100 mt-3 mb-3">Login</Button>
                      <p className="text-center">
                        Don't you have an account? <br/>
                        <Link href="/subscribe" passHref>
                          <a>Create one!</a>
                        </Link>
                      </p>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </SectionWithContainer>
        </motion.div>
      </MainLayout>
    </>
  );
};

export default LoginPage;
