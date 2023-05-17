import { useMediaQuery } from 'react-responsive';

export const useTableOrMobile = () => {
  return useMediaQuery({ query: '(max-width: 1020px)' });
};
