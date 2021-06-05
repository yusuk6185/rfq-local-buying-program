import { FC, HTMLAttributes } from 'react';
import { Col, Row } from 'react-bootstrap';

import { ISupplier } from 'models/ISupplier';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  supplier: ISupplier;
}
const SupplierDetailCard: FC<IProps> = ({ supplier, ...props }) => {
  return (
    <div {...props}>
      <Row noGutters>
        <Col md={3} className="pr-2">
          <img src={supplier.Logo} alt={supplier.Name} />
        </Col>
        <Col md={8}>
          <h3>{supplier.Name}</h3>
        </Col>
      </Row>
      <div>
        <small className="font-weight-bold">SERVICES OFFERED</small>
        <ul className="pl-3">
          {(supplier.SupplyCategories || []).map(supplyCategory => (
            <li key={supplyCategory.ID}>
              <small>{supplyCategory.Name}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SupplierDetailCard;
