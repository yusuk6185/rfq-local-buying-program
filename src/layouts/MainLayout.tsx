import { FC } from 'react';

import cx from 'classnames';

export interface MainLayoutProps {
  className?: string;
}

const MainLayout: FC<MainLayoutProps> = ({ children, className }) => {
  return (
    <div className={cx('main-layout flex-column d-flex', className)}>
      <div className="main-layout-content flex-grow-1 position-relative">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
