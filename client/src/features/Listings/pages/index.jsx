import React, { useEffect, useState } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../@use/useQuery';
import listingApi from '../../../api/listingApi';
import Header from '../../../components/Header';
import ListListingsLocation from '../components/ListListingsLocation';
import FilterBox from '../components/ListListingsLocation/FilterBox/FilterBox';
import ListingSort from '../components/ListListingsLocation/ListingSort/ListingSort';
import './style.scss';
import queryString from 'query-string'



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
}

function ListingsLocation(props) {
    const listing_types = [
        { id: 1, name: 'Homestay', value: 'type-1' },
        { id: 2, name: 'Nhà riêng', value: 'type-2' },
        { id: 3, name: 'Biệt thự', value: 'type-3' },
        { id: 4, name: 'Chung cư', value: 'type-4' },
        { id: 5, name: 'Studio', value: 'type-5' },
        { id: 6, name: 'Căn hộ dịch vụ', value: 'type-6' },
        { id: 7, name: 'Nhà tập thể/ Cư xá', value: 'type-7' },
    ];

    const star = [
        { id: 1, name: '1 star', value: 'star-1' },
        { id: 2, name: '2 stars', value: 'star-2' },
        { id: 3, name: '3 stars', value: 'star-3' },
        { id: 4, name: '4 stars', value: 'star-4' },
        { id: 5, name: '5 stars', value: 'star-5' },
    ];

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
    const [filterType, setFilterType] = useState(() => {
        let initFilterType = [];
        if (qs.pt.length > 1) {
            initFilterType = qs.pt.map(item => parseInt(item));
        } else if (qs.pt.length == 1) {
            initFilterType.push(parseInt(qs.pt));
        }
        return initFilterType;
    });
    const [filterStar, setFilterStar] = useState(() => {
        let initFilterStar = [];
        if (qs.st.length > 1) {
            initFilterStar = qs.st.map(item => parseInt(item));
        } else if (qs.st.length == 1) {
            initFilterStar.push(parseInt(qs.st));
        }
        return initFilterStar;
    });
    const [listings, setListings] = useState([]);




    const fetchListings = async () => {
        try {
            const params = {
                city_id: id,
                limit: postsPerPage,
                page: query.get('page') || 1,
            }
            setLoading(true);
            await listingApi.getListingsLocation(params).then(response => {
                setLoading(false);
                setListings(response.data.data.data);
                setTotalPages(response.data.data.last_page);
                window.scrollTo(0, 0)
            });

        } catch (error) {
            console.log(error.message);
        }
    };

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
        history.push(`/location/${id}/?page=${event.selected + 1}`)
    };

    const handleFilter = (e, type) => {
        console.log(type);
        switch (type) {
            case 'type':

                if (e.target.checked) {
                    let tmpPTCheck = [...filterType, parseInt(e.target.id)];
                    filterByType(tmpPTCheck)
                    setFilterType(tmpPTCheck);
                    history.replace({
                        pathname: props.location.pathname,
                        search: queryString.stringify({ pt: tmpPTCheck, st: filterStar })
                    })
                } else {
                    const ids = filterType.filter((id) => id !== parseInt(e.target.id));
                    ids.length > 0 ? filterByType(ids) : fetchListings();
                    setFilterType(ids);
                    history.replace({
                        pathname: props.location.pathname,
                        search: queryString.stringify({ pt: ids, st: filterStar })
                    })
                }
                console.log(filterType);
                break;
            case 'star':
                if (e.target.checked) {
                    let tmpPTStar = [...filterStar, parseInt(e.target.id)];
                    filterByRating(tmpPTStar);
                    setFilterStar(tmpPTStar);
                    history.replace({
                        pathname: props.location.pathname,
                        search: queryString.stringify({ pt: filterType, st: tmpPTStar })
                    })
                } else {
                    const stars = filterStar.filter((id) => id !== parseInt(e.target.id));
                    stars.length > 0 ? filterByRating(stars) : fetchListings();
                    setFilterStar(stars);
                    history.replace({
                        pathname: props.location.pathname,
                        search: queryString.stringify({ pt: filterType, st: stars })
                    })
                }
                console.log(filterStar);
                break;
            default:
                break;
        }
    }

    const filterByType = async (ids) => {
        const params = {
            city_id: id,
            limit: 10,
            list_type_id: ids
        }
        setLoading(true);
        await listingApi.filterByListingType(params).then(res => {
            setLoading(false);
            setListings(res.data.data.data)
            setTotalPages(res.data.data.last_page);
            window.scrollTo(0, 0)
        })
    }

    const filterByRating = async (stars) => {
        const params = {
            city_id: id,
            limit: 10,
            rate: stars
        }
        setLoading(true);
        await listingApi.filterByRating(params).then(res => {
            setLoading(false);
            setListings(res.data.data.data)
            setTotalPages(res.data.data.last_page);
            window.scrollTo(0, 0)
        })
    }

    useEffect(() => {
        console.log('token', qs.pt)
        console.log(props.location.pathname);
        fetchListings();

        return () => {
            setListings([]);
        }
    }, [currentPage]);

    return (
        <div className="k-main" style={main}>
            <Header />
            <div className="container" style={{ marginTop: '100px' }}>
                <div className="row">
                    <div className="col-md-4">
                        <FilterBox
                            listing_types={listing_types}
                            star={star}
                            handleFilter={handleFilter}
                            filterType={filterType}
                            filterStar={filterStar}
                        />
                        <button onClick={filterByType}>Search</button>
                    </div>

                    <div className="col-md-8">

                        <ListingSort />
                        <ListListingsLocation
                            loggedInUser={loggedInUser}
                            isLoggedIn={isLoggedIn}
                            listings={listings}
                            loading={loading}
                        />
                        {totalPages > 0 ? <ReactPaginate
                            previousLabel={
                                <MdArrowBackIosNew />
                            }
                            nextLabel={
                                <MdArrowForwardIos />
                            }

                            // initialPage={1}
                            // initialPage={currentPage}
                            forcePage={query.get('page') - 1}
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


        </div>
    );
}

export default ListingsLocation;

