import React, { useState, useContext } from 'react';
import { BlogContext } from '../context';

const AddCategoryModal = ({ onClose }) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [error, setError] = useState(null);
  const { categories, addCategory } = useContext(BlogContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for empty category name
    if (!newCategoryName.trim()) {
      setError('Category name cannot be empty');
      return;
    }

    // Validation for length
    if (newCategoryName.length > 15) {
      setError('Category name must be up to 15 characters');
      return;
    }

    // Validation for only letters with no spaces
    const pattern = /^[a-zA-Z]+$/;
    if (!pattern.test(newCategoryName)) {
      setError('Category name can only contain letters with no spaces');
      return;
    }

    // Validation for uniqueness
    if (categories.some(category => category.name === newCategoryName)) {
      setError('Category name already exists');
      return;
    }

    try {
      await addCategory(newCategoryName);
      onClose();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6 sm:p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-purple-900 mb-4">Add Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter category name"
            value={newCategoryName}
            onChange={(e) => {
              setNewCategoryName(e.target.value);
              setError(null); // Clear error on input change
            }}
            className={`block w-full py-2 px-4 rounded-lg shadow-md border ${error ? 'border-red-500 focus:border-red-500' : 'border-purple-400 focus:border-purple-600'
              } focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg mr-2"
            >
              Create
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
