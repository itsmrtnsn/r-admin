'use client';

import { motion } from 'framer-motion';

const MotionProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className='h-full scroll-smooth'
    >
      {children}
    </motion.div>
  );
};

export default MotionProvider;
