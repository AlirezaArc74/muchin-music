import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const DefaultLayout: FC<IProps> = ({children}) => {
  return (
    <div>

    </div>
  )
};
export default DefaultLayout;
