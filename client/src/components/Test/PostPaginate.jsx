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
            const params = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODIzYTg1NjVjYWU2MjkwMzcyNWJjZjFiYmJhYmI5NmZlYzZkZTcwMjQ0YjhhMzBkNDQ0MjBjM2NjYzY3MmJiYmRkYzA1NjllY2E2OWU5YmYiLCJpYXQiOjE2Mzg0MjExMDMsIm5iZiI6MTYzODQyMTEwMywiZXhwIjoxNjY5OTU3MTAzLCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.mxaFE8Djb0B1DPO3e_Gw3n64470PnSS24He09sodlqczaiK3_EpHLJ0Co3OL_yocJaaik12bjPKk0jLeGqF0xSxq1CCi82XMqiBwsL87cendy9cUMOoT_bzoReVhmj1DERnJgGxn1EwqXk7t0mPcLsWIIZFpsVIPa7Avjf340gz88yeWq0o_0XLDBdh-Fl-NM2DTLHE2VHvSa12599fET9hAmlDwyVlrW_AtHyq54k6IHZWgZ5tuBfgFYGvtLHuvSJpw2YOWIT93fbeT-T1-bj1ku9n1vVwmRwvbfU4ASO0vbpAI7pqSmPg0qQyndWO1x0xtILe5VlHsiOYLzH9JET9UM3u-HNbYJvRMDEptY2xMDKI8su-8lGStvrQqbQeorqClAul1yU2lsT-YAZUDXry954F2u776dL9dbLZA59etIXH_D4kcJxcdjOHHY63sN3KKpC48zUPxtxW3DZZY-7jD_wJzij8-RKshEUzqkrEh9sZHwDUtxW_Ma9f8LkkSkiikrWhTmnG9dlR1CaGjzDD7wKx4ghs4okLV6jkyLgKxeq4960scDCwQnviJNXd-9clTOM-Byxe6D7KJ5iksI2l9veof-MP1WnbCq7dAcKcWJY1OS-5b8VlNHgkr7oXoUqzibQCfxCM8D41GaOecDneJXBws7vGu6EtZzWmjYAo',
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