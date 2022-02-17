import Layout from '../components/Layout';
import ShadowedWrapper from '../components/ui/ShadowedWrapper';

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1 className="text-2xl text-center">Hello Next.js 👋</h1>
    <ShadowedWrapper className="p-2 w-24 rounded-xl m-4">Hello</ShadowedWrapper>
  </Layout>
);

export default IndexPage;
