import {
    CREATE_POST,
    RETRIEVE_POSTS,
    RETRIEVE_FRIENDS_POSTS,
    RETRIEVE_POST,
    UPDATE_POST,
    DELETE_POST,
} from './types';

import postService from '../Services/post-service';

export const createPost = (datas) => async (dispatch) => {
    try {
        const res = await postService.createPosts(datas);

        dispatch({
            type: CREATE_POST,
            payload: res.data
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const retrieveAllPosts = () => async (dispatch) => {
    try {
        const res = await postService.allPosts();
        dispatch({
            type: RETRIEVE_POSTS,
            payload: res.data
        });
    } catch (err) {
        return Promise.reject(err);
    }
};

export const retrieveMyPosts = (userId) => async (dispatch) => {
    try {
        const res = await postService.myPosts(userId);
        dispatch({
            type: RETRIEVE_POSTS,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
};

export const retrieveFriendsPosts = () => async (dispatch) => {
    try {
        const res = await postService.friendsPosts();
        dispatch({
            type: RETRIEVE_FRIENDS_POSTS,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
};

export const retrieveOnePost = (postId) => async (dispatch) => {
    try {
        const res = await postService.onePost(postId);
        dispatch({
            type: RETRIEVE_POST,
            payload: res.data
        });
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
    }
};

export const updatePost = (postId, data) => async (dispatch) => {
    try {
        const res = await postService.updatePosts(postId, data);

        dispatch({
            type: UPDATE_POST,
            payload: data
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deletePost = (postId) => async (dispatch) => {
    try {
        await postService.deletePost(postId);

        dispatch({
            type: DELETE_POST,
            payload: postId
        });
    } catch (err) {
        return Promise.reject(err);
    }
};