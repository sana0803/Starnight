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
            <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            </Head>
            <LoadingComponent />
        </>

    );

}

export default graph;