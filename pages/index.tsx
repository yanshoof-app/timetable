import Button from '../components/forms/Button';
import Layout from '../components/Layout';
import ShadowedWrapper from '../components/ui/ShadowedWrapper';

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1 className="text-2xl text-center">Hello Next.js 👋</h1>
    <ShadowedWrapper className="p-2 w-24 rounded-xl m-4">Hello</ShadowedWrapper>
    <Button>Click Me</Button>
    <Button variant="secondary">Click Me Too</Button>
  </Layout>
);

export default IndexPage;
