import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TestPost from './TestPost';
import { FastField } from 'formik';
import TestPaginate from './TestPaginate';

PostPaginate.propTypes = {

};

function PostPaginate(props) {
    const [posts, setPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(2);
    const [postsPerPage] = useState(3);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('access_token');
            const params = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    limit: postsPerPage,
                    page: currentPage
                }
            }
            setLoading(true);
            const response = await axios.get('http://127.0.0.1:8000/api/city', params);
            setPost(response.data.data.data);
            setLoading(false);
            setTotalPages(response.data.data.last_page);
            console.log(response.data.data.data);
        }

        fetchData();
    }, [currentPage]);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className='container mt-5'>
            <TestPost
                posts={posts}
                loading={loading}
            />
            <TestPaginate
                totalPages={totalPages}
                paginate={paginate}
            />
        </div>
    );
}

export default PostPaginate;