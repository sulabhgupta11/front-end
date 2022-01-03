import React, { useReducer } from 'react';
import Slider from '@mui/material/Slider';


const searchReducer = (state, action) => {
    switch (action.type) {
        case 'term':
            return {
                ...state,
                searchText: action.payload
            }

        default:
            if (state.filters != null && action.payload.value == null) {
                return {
                    ...state,
                    filters: state.filters.filter(filter => filter.key !== action.type)
                }
            }
            const index = state.filters.length > 0 ? state.filters.findIndex(filter => filter.key === action.type) : -1; //finding index of the item
            if (index != -1) {
                const newFilters = [...state.filters];
                newFilters[index].value = action.payload.value
                return {
                    ...state,
                    filters: newFilters,
                }
            }
            else {
                return {
                    ...state,
                    filters: [...state.filters, action.payload]
                }
            }
    }
}

const Search = ({ onSearch }) => {

    const [state, dispatch] = useReducer(searchReducer, { filters: [], searchText: '' })
    const onSearchClick = () => {
        onSearch(state)
    }

    const onFilterChange = (type, event) => {
        if (type == 'brand') {
            dispatch({ type: type, payload: { key: 'brand', type: 'term', value: event.target.value } })
        }
        if (type == 'productType') {
            dispatch({ type: type, payload: { key: 'productType', type: 'term', value: event.target.value } })
        }
        if (type == 'term') {
            dispatch({ type: type, payload: event.target.value })
        }

    }

    const onPriceChange = (event, newValue) => {
        if (newValue[0] == 0 && newValue[1] == 0) {
            dispatch({ type: 'price', payload: { key: 'price', type: 'range', value: null } })
        }
        else {
            dispatch({ type: 'price', payload: { key: 'price', type: 'range', value: newValue } })
        }
    }

    const resetFilter = (type) => {
        dispatch({ type: type, payload: { key: type, type: 'term', value: null } })
    }

    function valuetext(value) {
        return `Rs.${value}`;
    }

    const selecteBrand = state.filters.length > 0 ? state.filters.find(filter => filter.key == 'brand') : null
    const selectedProductType = state.filters.length > 0 ? state.filters.find(filter => filter.key == 'productType') : null
    const selectedRange = state.filters.length > 0 ? state.filters.find(filter => filter.key == 'price') : { value: [0, 0] }
    const searchText = state.searchText


    return (
        <>
            <section style={{ position: "fixed" }} id="sidebar">
                <h6 style={{ color: "brown" }} className="p-1 border-bottom">Search Products</h6>
                <div className="input-group">
                    <input type="text" value={searchText} name="search" id="search" onChange={(e) => onFilterChange('term', e)} className="form-control" placeholder="Search Here" />
                    <div className="input-group-addon">
                        <button style={{ height: "40px" }} type="button" onClick={onSearchClick}><i className="fas fa-search"></i></button>
                    </div>
                </div>

                <form>
                    <div className="form-inline border" >
                        <br />
                        <span style={{ display: "flex" }}><h6 style={{ color: "brown" }} >Product Brand</h6> <a style={{ marginLeft: "4rem", fontWeight: "bold", color: "blue", fontSize: "13px" }} onClick={() => resetFilter('brand')} href="#">Clear All</a></span>
                        <div style={{ color: "blue" }} className=" rounded p-2 my-2" onChange={(e) => onFilterChange('brand', e)}>
                            <input type="radio" value="Apple" name="brand" checked={selecteBrand ? selecteBrand.value == 'Apple' : false} /> Apple
                            <br />
                            <input type="radio" value="Samsung" name="brand" checked={selecteBrand ? selecteBrand.value == 'Samsung' : false} /> Samsung
                            <br />
                            <input type="radio" value="RealMe" name="brand" checked={selecteBrand ? selecteBrand.value == 'RealMe' : false} /> RealMe
                            <br />
                            <input type="radio" value="Redmi" name="brand" checked={selecteBrand ? selecteBrand.value == 'Redmi' : false} /> Redmi
                            <br />
                            <input type="radio" value="Vivo" name="brand" checked={selecteBrand ? selecteBrand.value == 'Vivo' : false} /> Vivo
                        </div>
                        <br />
                        <span style={{ display: "flex" }}><h6 style={{ color: "brown" }} >Product Type</h6> <a style={{ marginLeft: "4rem", fontWeight: "bold", color: "blue", fontSize: "13px" }} onClick={() => resetFilter('productType')} href="#">Clear All</a></span>
                        <div style={{ color: "blue" }} className=" rounded p-sm-2 my-2" onChange={(e) => onFilterChange('productType', e)}>
                            <input type="radio" value="Mobile" name="productType" checked={selectedProductType ? selectedProductType.value == 'Mobile' : false} /> Mobile
                            <br />
                            <input type="radio" value="Laptop" name="productType" checked={selectedProductType ? selectedProductType.value == 'Laptop' : false} /> Laptop
                            <br />
                            <input type="radio" value="Ipad" name="productType" checked={selectedProductType ? selectedProductType.value == 'Ipad' : false} /> Ipad
                            <br />
                            <input type="radio" value="Headphones" name="productType" checked={selectedProductType ? selectedProductType.value == 'Headphones' : false} /> Headphones
                        </div>


                        <div>
                            <h6 style={{ color: "brown" }} >Price Range</h6>
                            <div style={{ paddingTop: ".5rem", paddingLeft: "1rem", width: "15rem" }}>
                                <Slider
                                    getAriaLabel={() => 'Price Range'}
                                    value={selectedRange ? selectedRange.value : [0, 0]}
                                    onChange={onPriceChange}
                                    valueLabelDisplay="auto"
                                    step={5}
                                    max="1000000"
                                    getAriaValueText={valuetext}
                                />
                            </div>
                        </div>

                        <div style={{ paddingTop: "0.5rem", marginLeft: "4rem" }}>
                            <button className="btn-md btn-primary rounded " type="button" onClick={onSearchClick}>Apply Filters</button>
                        </div>
                        <br />
                    </div>
                </form>
            </section>
        </>
    );
}

export default Search;