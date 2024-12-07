import type { FC } from 'react';

interface Page {
  title: string;
}
const Home: FC<Page> = ({ title }) => {
  return <div />;
};
export default Home;
