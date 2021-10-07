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
      <meta name="google-site-verification" content="KvlcKlucdM-Fvv2b8dOcmUWynCBXhySnSl2l2qK0zao" />      </Head>
      <DynamicComponent />
    </>
  );
}

export default Index;