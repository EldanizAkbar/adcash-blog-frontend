import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { set } from 'react-hook-form';

// Create context
export const BlogContext = createContext();

// Context Provider component
export const BlogContextProvider = ({ children }) => {
    // State for categories and posts
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch categories and posts on component mount
    useEffect(() => {
        fetchCategories();
        fetchPosts();
    }, []);

    // Fetch all categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://stark-mountain-97075-931483a868a1.herokuapp.com/api/categories/');
            setCategories(response.data.categories);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Add a new category
    const addCategory = async (newCategoryName) => {
        try {
            await axios.post(
                'https://stark-mountain-97075-931483a868a1.herokuapp.com/api/categories/',
                { name: newCategoryName },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            fetchCategories(); // Fetch updated list of categories
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    // Fetch all posts
    const fetchPosts = async () => {
        try {
            const response = await axios.get('https://stark-mountain-97075-931483a868a1.herokuapp.com/api/posts/');
            setPosts(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    // Add a new post
    const addPost = async (newPost) => {
        try {
            await axios.post(
                'https://stark-mountain-97075-931483a868a1.herokuapp.com/api/posts/',
                newPost,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            fetchPosts(); // Fetch updated list of posts
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    // Delete a post
    const deletePost = async (postId) => {
        try {
            await axios.delete(`https://stark-mountain-97075-931483a868a1.herokuapp.com/api/posts/${postId}/`);
            fetchPosts(); // Fetch updated list of posts
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    // Update a post
    const updatePost = async (postId, updatedPost) => {
        try {
            await axios.put(
                `https://stark-mountain-97075-931483a868a1.herokuapp.com/api/posts/${postId}/`,
                updatedPost,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            fetchPosts(); // Fetch updated list of posts
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    

    // Provide the context values to the children components
    return (
        <BlogContext.Provider value={{ categories, addCategory, posts, addPost, deletePost, updatePost, isLoading }}>
            {children}
        </BlogContext.Provider>
    );
};
