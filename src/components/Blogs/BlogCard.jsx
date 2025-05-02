import React from 'react';
import tag from '../../Assets/Images/blogs/tag.svg';
import user from '../../Assets/Images/blogs/user.svg';
import chat from '../../Assets/Images/blogs/chat.svg';
import { Link } from 'react-router-dom';

const BlogCard = ({ img, title, commentsCount }) => {
  return (
    <div className="blog-card display-flex">
      <div className="blog-card-image">
        <Link to="/blog-details">
          {' '}
          <img src={img} alt="blog" />{' '}
        </Link>
      </div>
      <div className="blog-card-details display-flex">
        <div className="blog-card-row-one display-flex">
          <img src={tag} alt="tag" />
          <img src={user} alt="user" />
        </div>
        <h1>{title}</h1>
        <div className="blog-card-row-three">
          <Link to="/blog-details" className="link"  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Read More
          </Link>
          <div className="display-flex" style={{ gap: '10px' }}>
            <img src={chat} alt="chat" />
            <p>{commentsCount < 10 ? `0${commentsCount}` : commentsCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
