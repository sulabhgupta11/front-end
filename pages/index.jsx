import React, { useState } from 'react';
import TopBar from "../components/TopBar";
import Products from './products/productCatalog';
import Search from "../components/Search";



export default Home

function Home(props) {
    const [searchContext, setSearchContext] = useState([])
    return (
        <div style={{ widht: "100%" }}>
            <TopBar />
            <div style={{ minWidth: "30%" }}>
                <Search onSearch={setSearchContext} />
            </div>
            <div style={{ marginLeft: "20%" }}>
                <Products searchContext={searchContext} />
            </div>
        </div>
    );
}