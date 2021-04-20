import { FC } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import MainLayout, { MainLayoutProps } from './MainLayout';

const MainLayoutWithAnimation: FC<MainLayoutProps> = ({
  children,
  ...props
}) => {
  return (
    <MainLayout {...props}>
      <AnimatePresence>
        <motion.div
          className="flex-grow-1 d-flex flex-column align-items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </MainLayout>
  );
};

export default MainLayoutWithAnimation;
