import React, { useState, useContext } from 'react';
import AddCategoryModal from './AddCategoryModal';
import { BlogContext } from '../context';

const AddPost = () => {
  // State variables for form inputs, errors, and modal visibility
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const { categories, addPost } = useContext(BlogContext);
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [isPostAdded, setIsPostAdded] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isCreating, setIsCreating] = useState(false); // State for tracking post creation

  // Handle form submission
  const handleAddPost = async (e) => {
    e.preventDefault();
    setTitleError('');
    setContentError('');
    setCategoryError('');

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

    // Set isCreating to true to show "Creating..." in the button
    setIsCreating(true);

    try {
      // Get IDs of selected categories
      const selectedCategoryIds = categories
        .filter((category) => selectedCategories.includes(category.name))
        .map((category) => category.id);

      // Add post with selected data
      await addPost({
        title,
        content,
        categories: selectedCategoryIds,
      });

      // Reset form values and show success message
      setIsPostAdded(true);
      setTitle('');
      setContent('');
      setSelectedCategories([]);
      setIsCreating(false); // Reset isCreating after post is added

      setTimeout(() => {
        setIsPostAdded(false);
      }, 1500);
    } catch (error) {
      console.error('Error adding post:', error);
      setIsCreating(false); // Reset isCreating on error
    }
  };

  // Show modal for adding new category
  const handleShowAddCategoryModal = () => {
    setShowAddCategoryModal(true);
  };

  // Close modal for adding new category
  const handleCloseAddCategoryModal = () => {
    setShowAddCategoryModal(false);
  };

  // Toggle visibility of the form
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  // Close the form
  const closeForm = () => {
    setIsFormVisible(false);
    setTitle('');
    setContent('');
    setSelectedCategories([]);
    setTitleError('');
    setContentError('');
    setCategoryError('');
    setIsPostAdded(false);
  };

  // Toggle selected categories
  const toggleCategory = (categoryName) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(selectedCategories.filter((category) => category !== categoryName));
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  return (
    <div className="mx-2 bg-gradient-to-b from-purple-900 to-purple-600 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center rounded-xl">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6 sm:p-8 w-full max-w-[900px]">


        <div className={`form-container ${isFormVisible ? 'show' : ''}`}>
          <button
            onClick={closeForm}
            className="mb-10 block mx-auto bg-purple-600 md:hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-all md:hover:scale-105"
          >
            Close
          </button>

          <h2 className="text-3xl font-bold text-purple-900 mb-4">Create a New Post</h2>

          <form onSubmit={handleAddPost} className="space-y-4">
            <div>
              <label htmlFor="category" className="block text-lg font-semibold text-purple-900 mb-4">
                Select Category:
              </label>
              <div className="flex flex-wrap gap-4 justify-between">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`mx-auto text-center min-w-[180px] md:hover:bg-purple-500 transition category-container border rounded-lg p-2 cursor-pointer ${selectedCategories.includes(category.name) ? 'bg-purple-500' : 'border-purple-500'
                      }`}
                    onClick={() => toggleCategory(category.name)}
                  >
                    <span className={`text-lg font-semibold transition ${selectedCategories.includes(category.name) ? 'text-white' : 'text-purple-600'
                      }`}>
                      {category.name}
                    </span>
                  </div>
                ))}
              </div>
              {categoryError && <p className="text-red-500 text-sm mt-1 text-center mt-3">{categoryError}</p>}
              <div
                className="mt-10 mx-auto sm:max-w-[200px] category-container border border-purple-500 rounded-lg p-2 bg-purple-500 md:hover:bg-purple-900 transition  flex items-center justify-center cursor-pointer"
                onClick={handleShowAddCategoryModal}
              >
                <span className="text-lg font-semibold transition text-white text-center">Create New Category</span>
              </div>
            </div>
            <div>
              <label htmlFor="selectedCategory" className="block text-lg font-semibold text-purple-900 mb-2">
                Selected Category:
              </label>
              <input
                id="selectedCategory"
                type="text"
                value={selectedCategories.join(', ') || 'None'}
                readOnly
                className="block w-full py-2 px-4 rounded-lg transition shadow-md border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="title" className="block text-lg font-semibold text-purple-900 mb-2">
                Title:
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => { setTitle(e.target.value), setTitleError('') }}
                className={`block w-full py-2 px-4 rounded-lg shadow-md border transition  border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ${titleError && "border-red-400"} `}
              />
              {titleError && <p className="text-red-500 text-sm mt-1">{titleError}</p>}
            </div>
            <div>
              <label htmlFor="content" className="block text-lg font-semibold text-purple-900 mb-2">
                Content:
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => { setContent(e.target.value), setContentError('') }}
                className={`block w-full py-2 px-4 rounded-lg shadow-md border transition  border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ${contentError && "border-red-400"} resize-none`}
                rows="5"
              ></textarea>
              {contentError && <p className="text-red-500 text-sm mt-1">{contentError}</p>}
            </div>

            <div className='flex items-center gap-5'>
              <button
                type="submit"
                className={`block bg-purple-600 md:hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-all md:hover:scale-105 ${isCreating ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isCreating}
              >
                {isCreating ? 'Creating...' : 'Create'}
              </button>
              {isPostAdded && <p className="text-green-500 text-sm mt-1">Post added successfully!</p>}
            </div>
          </form>
        </div>
        {!isFormVisible && (
          <button
            onClick={toggleFormVisibility}
            className="block mx-auto bg-purple-600 md:hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-all md:hover:scale-105"
          >
            Create a Post
          </button>
        )}
      </div>
      {showAddCategoryModal && (
        <AddCategoryModal onClose={handleCloseAddCategoryModal} />
      )}
    </div>
  );
};

export default AddPost;
