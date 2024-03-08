import React from 'react';

const DeletePostModal = ({ post, onCancel, onDelete }) => {
    const { title } = post;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                {/* Modal Header */}
                <h2 className="text-xl font-semibold text-center text-red-600 mb-4">Delete Post</h2>
                {/* Confirmation Message */}
                <p className="text-sm text-center text-gray-600 mb-6">
                    Are you sure you want to delete the post <strong>{title}</strong>?
                </p>
                {/* Buttons for Delete and Cancel */}
                <div className="flex justify-center">
                    {/* Delete Button */}
                    <button
                        onClick={onDelete}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md mr-3"
                    >
                        Delete
                    </button>
                    {/* Cancel Button */}
                    <button
                        onClick={onCancel}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeletePostModal;
