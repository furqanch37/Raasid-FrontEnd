import React from 'react';
import imgOne from '../../Assets/Images/blogs/one.svg';
import imgTwo from '../../Assets/Images/blogs/two.svg';
import imgThree from '../../Assets/Images/blogs/three.svg';
import BlogCard from './BlogCard';

const blogData = [
  {
    img: imgOne,
    title: 'The Sweet Side of Life – Exploring Desserts',
    commentsCount: 12,
  },
  { img: imgTwo, title: 'A Journey Through Exotic Fruits', commentsCount: 8 },
  {
    img: imgThree,
    title: 'Unveiling the Secrets of Gourmet Chocolate',
    commentsCount: 15,
  },
];

const BlogWrapper = () => {
  return (
    <div className="blogs-wrapper display-flex">
      {blogData.map((blog, index) => (
        <BlogCard key={index} {...blog} />
      ))}
    </div>
  );
};

export default BlogWrapper;
