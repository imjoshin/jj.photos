import * as React from "react";
import { Header } from "../components/index/header";
import { Page } from "../components/page/Page";

const IndexPage = () => {
    return (
        <Page title="JJ Photos">
            <Header />
            <div>
                Content
            </div>
        </Page>
    )
}

export default IndexPage;
