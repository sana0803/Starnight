import dynamic from 'next/dynamic';
import LoadingComponent from '../components/LoadingComponent/LoadingComponent';
import Head from 'next/head'

const DynamicComponent = dynamic(() =>
import('../components/IndexPageComponent/IndexPage'), {
loading: function loadingComponent() {
  return <LoadingComponent />;
},
});

const Index = () => {
  
  return (
    <>
      <Head>
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      <DynamicComponent />
    </>
  );
}

export default Index;