import React, { useEffect, useState } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory, useRouteMatch } from 'react-router-dom';
import useQuery from '../../../@use/useQuery';
import listingApi from '../../../api/listingApi';
import Header from '../../../components/Header';
import ListListingsLocation from '../components/ListListingsLocation';
import FilterBox from '../components/ListListingsLocation/FilterBox/FilterBox';
import ListingSort from '../components/ListListingsLocation/ListingSort/ListingSort';
import './style.scss';
import queryString from 'query-string';
import Loading from '../../../components/Loading/Loading';
import { listing_types, UserListingFilter } from '../../../app/constant';
import Footer from '../../../components/Footer';



ListingsLocation.propTypes = {

};

const main = {
    height: '100%',
    width: '100%',
    // position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    // opacity: 0,
    background: '#f6f6f6',
}

function ListingsLocation(props) {
    // const listing_types = [
    //     { id: 1, name: 'Homestay', value: 'type-1' },
    //     { id: 2, name: 'Nhà riêng', value: 'type-2' },
    //     { id: 3, name: 'Biệt thự', value: 'type-3' },
    //     { id: 4, name: 'Chung cư', value: 'type-4' },
    //     { id: 5, name: 'Studio', value: 'type-5' },
    //     { id: 6, name: 'Căn hộ dịch vụ', value: 'type-6' },
    //     { id: 7, name: 'Nhà tập thể/ Cư xá', value: 'type-7' },
    // ];

    const star = [
        { id: 1, name: '1 star', value: 'star-1' },
        { id: 2, name: '2 stars', value: 'star-2' },
        { id: 3, name: '3 stars', value: 'star-3' },
        { id: 4, name: '4 stars', value: 'star-4' },
        { id: 5, name: '5 stars', value: 'star-5' },
    ];

    const match = useRouteMatch();

    const history = useHistory();
    const { id } = useParams();
    const qs = queryString.parse(props.location.search);
    const query = useQuery();
    const loggedInUser = useSelector((state) => state.userSlice.current);
    const isLoggedIn = !!loggedInUser.id;

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(() => { return qs.page || 0 });
    const [postsPerPage] = useState(() => { return qs.limit || 10 });
    const [totalPages, setTotalPages] = useState(0);
    const [totalListing, setTotalListing] = useState(0);
    const [listings, setListings] = useState([]);
    const [city, setCity] = useState();
    const [cityId, setCityId] = useState();
    const [sort, setSort] = useState(() => {
        let s = null;
        if (qs.sort) {
            s = (qs.sort == 'asc') ? 'asc' : 'desc';
        }
        return s;
    });
    const [checkin_date, set_checkin_date] = useState(() => {
        return qs.checkin_date || null;
    });
    const [checkout_date, set_checkout_date] = useState(() => {
        return qs.checkout_date || null;
    });

    const [filterType, setFilterType] = useState(() => {
        let initFilterType = [];
        if (qs.pt) {
            if (qs.pt.length > 1) {
                initFilterType = qs.pt.map(item => parseInt(item));
            } else if (qs.pt.length == 1) {
                initFilterType.push(parseInt(qs.pt));
            }
        }
        return initFilterType;
    });

    const [filterStar, setFilterStar] = useState(() => {
        let initFilterStar = [];
        if (qs.st) {
            if (qs.st.length > 1) {
                initFilterStar = qs.st.map(item => parseInt(item));
            } else if (qs.st.length == 1) {
                initFilterStar.push(parseInt(qs.st));
            }
        }
        return initFilterStar;
    });


    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
        historyReplace({ pt: filterType, st: filterStar, sort: sort, page: event.selected + 1, checkin_date: checkin_date, checkout_date: checkout_date });
    };

    const handleFilter = (e, type) => {
        console.log(type);
        switch (type) {
            case UserListingFilter.TYPE:

                if (e.target.checked) {
                    let tmpPTCheck = [...filterType, parseInt(e.target.id)];
                    setFilterType(tmpPTCheck);
                    historyReplace({ pt: tmpPTCheck, st: filterStar, sort: sort, page: 1, checkin_date: checkin_date, checkout_date: checkout_date });
                    filterListing(filterStar, tmpPTCheck, sort);
                } else {
                    const ids = filterType.filter((id) => id !== parseInt(e.target.id));
                    setFilterType(ids);
                    historyReplace({ pt: ids, st: filterStar, sort: sort, page: 1, checkin_date: checkin_date, checkout_date: checkout_date });
                    filterListing(filterStar, ids, sort)
                }
                break;
            case UserListingFilter.STAR:
                if (e.target.checked) {
                    let tmpPTStar = [...filterStar, parseInt(e.target.id)];
                    setFilterStar(tmpPTStar);
                    historyReplace({ pt: filterType, st: tmpPTStar, sort: sort, page: 1, checkin_date: checkin_date, checkout_date: checkout_date });
                    filterListing(tmpPTStar, filterType, sort)
                } else {
                    const stars = filterStar.filter((id) => id !== parseInt(e.target.id));
                    setFilterStar(stars);
                    historyReplace({ pt: filterType, st: stars, sort: sort, page: 1, checkin_date: checkin_date, checkout_date: checkout_date })
                    filterListing(stars, filterType, sort)
                }
                break;
            default:
                break;
        }
    }

    const filterListing = async (rate, list_type_id, sort = '', page = 1) => {
        try {
            const params = {
                city_id: cityId || id,
                limit: postsPerPage,
                rate: rate,
                list_type_id: list_type_id,
                page: page,
                sort: sort,
                checkin_date: checkin_date,
                checkout_date: checkout_date,
            }
            setLoading(true);
            await listingApi.filterListing(params).then(res => {
                setListings(res.data.data.data)
                setTotalPages(res.data.data.last_page);
                setTotalListing(res.data.data.total);
                setCity(res.data.city);
                window.scrollTo(0, 0);
                setLoading(false);
            })
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleChange = e => {
        historyReplace({ pt: filterType, st: filterStar, sort: e.value, page: 1, checkin_date: checkin_date, checkout_date: checkout_date });
        filterListing(filterStar, filterType, e.value);
        setSort(e.value);
    }

    const historyReplace = (params) => {
        history.replace({
            pathname: props.location.pathname,
            search: queryString.stringify(params)
        })
    }

    const handleSave = async (listing_id) => {

        if (isLoggedIn) {
            try {
                const params = {
                    listing_id: listing_id,
                    user_id: loggedInUser.id
                }
                setLoading(true);
                await listingApi.favoriteListing(params).then(res => {
                    let tmp = [...listings];
                    let index = tmp.findIndex(listing => listing.listing_id === listing_id);
                    if (index != -1) {
                        tmp[index].saved = !tmp[index].saved;
                        setListings(tmp);
                    }
                    setLoading(false);
                }).catch(err => {
                    console.log(err.message);
                    setLoading(false);
                })
            } catch (err) {
                console.log(err.message);
            }
        }
    }

    // useEffect(() => {
    //     const getNameCity = () => {
    //         try {
    //             listingApi.getNameCity(id).then(res => setCity(res.data.data));
    //         } catch (err) {
    //             console.log(err.message);
    //         }
    //     }

    //     getNameCity();

    //     return () => {
    //         setCity(null);
    //     }
    // }, [cityId]);

    useEffect(() => {
        filterListing(filterStar, filterType, sort, query.get('page'));

        return () => {
            setListings([]);
        }
    }, [currentPage]);

    return (
        <div className="k-main" style={main}>
            {loading && <Loading />}
            <Header
                path={match.path}
                historyReplace={historyReplace}
                filterListing={filterListing}
                set_checkin_date={set_checkin_date}
                set_checkout_date={set_checkout_date}
                setCityId={setCityId}
            />
            <div className="container" style={{ marginTop: '80px', paddingTop: '20px' }}>
                <div className="row">
                    <div className="col-md-4">
                        <FilterBox
                            listing_types={listing_types}
                            star={star}
                            handleFilter={handleFilter}
                            filterType={filterType}
                            filterStar={filterStar}
                        />
                    </div>

                    <div className="col-md-8">

                        <ListingSort
                            totalListing={totalListing}
                            handleChange={handleChange}
                            sort={sort}
                            city={city}
                        />
                        <ListListingsLocation
                            handleSave={handleSave}
                            isLoggedIn={isLoggedIn}
                            listings={listings}
                        />
                        {(totalPages > 0 && listings.length > 0) ? <ReactPaginate
                            previousLabel={
                                <MdArrowBackIosNew />
                            }
                            nextLabel={
                                <MdArrowForwardIos />
                            }

                            forcePage={(query.get('page') != undefined) ? query.get('page') - 1 : 0}
                            breakLabel={"..."}
                            pageCount={totalPages}
                            marginPagesDisplayed={3}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination justify-content-center"}
                            pageClassName={"page-item"}
                            pageLinkClassName={"page-link"}
                            previousClassName={totalPages === 0 ? "page-item disabled" : "page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={totalPages === 0 ? "page-item disabled" : "page-item"}
                            nextLinkClassName={"page-link"}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                            activeClassName={"active"}
                        /> : null}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ListingsLocation;

