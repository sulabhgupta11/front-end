import React, { useState } from 'react';
import Products from './products/productCatalog';
import Search from "../Components/Search";
import TopBar from "../Components/TopBar";


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