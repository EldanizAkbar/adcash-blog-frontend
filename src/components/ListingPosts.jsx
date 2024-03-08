import React, { useState, useContext } from 'react';
import UpdatePostModal from './UpdatePostModal';
import DeletePostModal from './DeletePostModal';
import { BlogContext } from '../context';

const ListingPosts = () => {
    // State variables for modals, selected post, and filter categories
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [filterCategories, setFilterCategories] = useState([]);
    const { posts, deletePost, categories } = useContext(BlogContext); // Include categories from context

    // Handle opening the update modal
    const handleUpdate = (post) => {
        setSelectedPost(post);
        setShowUpdateModal(true);
    };

    // Handle confirming deletion of post
    const handleConfirmDelete = (post) => {
        setSelectedPost(post);
        setShowDeleteModal(true);
    };

    // Cancel delete operation
    const cancelDelete = () => {
        setShowDeleteModal(false);
    };

    // Confirm delete operation
    const confirmDelete = async () => {
        try {
            await deletePost(selectedPost.id);
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    // Create a new array with posts in reverse order
    const reversedPosts = [...posts].reverse();

    // Filter posts by multiple categories
    const filteredPosts = reversedPosts.filter((post) => {
        if (filterCategories.length === 0) return true;
        return filterCategories.some((filterCategory) =>
            post.categories.some((category) => category.name === filterCategory)
        );
    });

    // Handle toggling of filter categories
    const handleCategoryToggle = (categoryName) => {
        if (filterCategories.includes(categoryName)) {
            setFilterCategories((prevCategories) =>
                prevCategories.filter((category) => category !== categoryName)
            );
        } else {
            setFilterCategories((prevCategories) => [...prevCategories, categoryName]);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-purple-900 mb-6">Posts</h2>
            {posts.length === 0 && <p className="text-lg text-purple-900 text-center">
                No posts available. Create a new post to get started.
            </p>}
            {posts.length > 0 && (
                <div className="mb-4">
                    <label htmlFor="filterCategories" className="text-center mb-3 block text-lg font-semibold text-purple-900 mb-2">
                        Filter by Category:
                    </label>
                    <div className="flex flex-wrap gap-4 justify-between mx-auto max-w-[900px] mb-10">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className={`mx-auto text-center max-w-[180px] hover:bg-purple-500 transition category-container border rounded-lg p-2 cursor-pointer ${filterCategories.includes(category.name) ? 'bg-purple-500' : 'border-purple-500'
                                    }`}
                                onClick={() => handleCategoryToggle(category.name)}
                            >
                                <span className={`text-lg font-semibold transition ${filterCategories.includes(category.name) ? 'text-white' : 'text-purple-600'
                                    }`}>
                                    {category.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {filteredPosts.length === 0 && posts.length > 0 && (
                    <p className="text-lg text-purple-900 text-center col-span-full">
                        No posts available with selected categories.
                    </p>
                )}
                {filteredPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-lg p-6 border-[1px] border-[#ffb32c] hover:shadow-xl transition mt-10">
                        <h3 className="text-xl font-semibold text-[#ffb32c] mb-2">{post.title}</h3>
                        <p className="text-sm text-black-600 mb-4 break-words min-h-[40px]">{post.content}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.categories.map((category) => (
                                <span
                                    key={category.id}
                                    className="text-sm text-white font-semibold bg-purple-600 p-1 rounded-lg"
                                >
                                    {category.name}
                                </span>
                            ))}
                        </div>
                        <div className="flex justify-end gap-3">
                            {/* Button to update post */}
                            <button
                                onClick={() => handleUpdate(post)}
                                className="bg-[#ffb32c] hover:bg-[#ffb32c] text-white font-semibold px-2 py-2 md:px-4 rounded-lg shadow-md transform transition-all hover:scale-105"
                            >
                                Update
                            </button>
                            {/* Button to delete post */}
                            <button
                                onClick={() => handleConfirmDelete(post)}
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-2 py-2 md:px-4 rounded-lg shadow-md transform transition-all hover:scale-105"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Modal for updating a post */}
            {showUpdateModal && (
                <UpdatePostModal
                    post={selectedPost}
                    onClose={() => setShowUpdateModal(false)}
                />
            )}
            {/* Modal for deleting a post */}
            {showDeleteModal && (
                <DeletePostModal
                    post={selectedPost}
                    onCancel={cancelDelete}
                    onDelete={confirmDelete}
                />
            )}
        </div>
    );
};

export default ListingPosts;
