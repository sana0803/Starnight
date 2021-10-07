import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";
import GraphComponent from "../components/SearchComponents/GraphComponent";

const graph: NextPage = () => {

    return (
        <>
            {/* <GraphComponent />
            <div>test</div> */}
            <Head>
            <title>별나린밤</title>
                <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
                <meta name="google-site-verification" content="KvlcKlucdM-Fvv2b8dOcmUWynCBXhySnSl2l2qK0zao" />            </Head>
            <LoadingComponent />
        </>

    );

}

export default graph;