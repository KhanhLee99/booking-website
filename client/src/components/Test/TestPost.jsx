import React from 'react';
import PropTypes from 'prop-types';

TestPost.propTypes = {
};

function TestPost(props) {
    const { posts, loading } = props;
    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <ul className='list-group mb-4'>
            {posts.map(post => (
                <li key={post.id} className='list-group-item'>
                    {post.name}
                </li>
            ))}
        </ul>
    );
}

export default TestPost;