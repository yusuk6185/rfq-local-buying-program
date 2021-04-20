import { FC } from 'react';
import { Container } from 'react-bootstrap';

import cx from 'classnames';

type SectionWithContainerProps = {
  containerProps?: any;
  className?: string;
  style?: any;
  role?: string;
  noPadding?: boolean;
};
const SectionWithContainer: FC<SectionWithContainerProps> = ({
  className,
  containerProps,
  noPadding,
  children,
  ...props
}) => {
  return (
    <section
      className={cx(!noPadding && 'py-4 py-md-5', 'w-100', className)}
      {...props}
    >
      <Container {...containerProps}>{children}</Container>
    </section>
  );
};

export default SectionWithContainer;
