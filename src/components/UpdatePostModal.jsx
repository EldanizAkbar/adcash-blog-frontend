import React, { useState, useContext, useEffect } from 'react';
import { BlogContext } from '../context';

const UpdatePostModal = ({ post, onClose }) => {
  // State for form fields
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // State for form validation errors
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  const [categoryError, setCategoryError] = useState('');

  // Context for categories and updatePost function
  const { categories, updatePost } = useContext(BlogContext);

  // Set selected categories from post data
  useEffect(() => {
    setSelectedCategories(post.categories.map(category => category.id));
  }, [post]);

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Category Validation
    if (selectedCategories.length === 0) {
      setCategoryError('Please select at least one category');
      return;
    }

    // Title Validation
    if (title.trim() === '') {
      setTitleError('Title cannot be empty');
      return;
    } else if (title.length > 30) {
      setTitleError('Title must be less than 30 characters');
      return;
    }

    // Content Validation
    if (content.trim() === '') {
      setContentError('Content cannot be empty');
      return;
    } else if (content.length > 140) {
      setContentError('Content must be less than 140 characters');
      return;
    }

    // Reset any previous errors
    setTitleError('');
    setContentError('');
    setCategoryError('');

    try {
      // Call updatePost function from context
      await updatePost(post.id, {
        title,
        content,
        categories: selectedCategories,
      });
      // Close the modal after successful update
      onClose();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(prev => prev.filter(id => id !== categoryId));
    } else {
      setSelectedCategories(prev => [...prev, categoryId]);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#ffb32c]">Update Post</h2>
          {/* Close Button */}
          <span
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-gray-600 transition text-2xl font-semibold"
          >
            &times;
          </span>
        </div>
        {/* Form */}
        <form onSubmit={handleUpdate}>
          {/* Categories */}
          <div className="mb-4">
            <label htmlFor="categories" className="block text-sm font-semibold text-gray-600 mb-2">
              Categories:
            </label>
            {/* Category Buttons */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategoryChange(category.id)}
                  className={`text-sm font-semibold bg-purple-600 text-white p-2 rounded-lg ${selectedCategories.includes(category.id) ? 'bg-opacity-100' : 'bg-opacity-50'}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            {/* Category Error Message */}
            {categoryError && <p className="text-red-500 text-sm mt-1">{categoryError}</p>}
          </div>
          {/* Title Input */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-semibold text-gray-600 mb-2">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500 ${titleError && 'border-red-400'}`}
            />
            {/* Title Error Message */}
            {titleError && <p className="text-red-500 text-sm mt-1">{titleError}</p>}
          </div>
          {/* Content Textarea */}
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-semibold text-gray-600 mb-2">
              Content:
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500 ${contentError && 'border-red-400'}`}
              rows="5"
            ></textarea>
            {/* Content Error Message */}
            {contentError && <p className="text-red-500 text-sm mt-1">{contentError}</p>}
          </div>
          {/* Submit and Cancel Buttons */}
          <div className="flex justify-end">
            {/* Cancel Button */}
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md mr-2 transform transition-all hover:scale-105"
            >
              Cancel
            </button>
            {/* Update Button */}
            <button
              type="submit"
              className="bg-[#ffb32c]  text-white font-semibold py-2 px-4 rounded-lg shadow-md transform transition-all hover:scale-105"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePostModal;
