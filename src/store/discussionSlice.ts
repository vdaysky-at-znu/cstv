import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import {IUser} from "@/database/models/user";
import { IDiscussion } from "@/database/models/discussion";

// Type for our state
export interface DiscussionState {
    discussions: {[key: string]: IDiscussion}
}

// Initial state
const initialState: DiscussionState = {
    discussions: {},
};

// Actual Slice
export const discussionSlice = createSlice({
    name: "discussion",
    initialState,
    reducers: {
        // Action to set the authentication status
        setDiscussionState(state, action) {
            state.discussions = action.payload;
        },
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.discussion,
            };
        },
        "ADD_DISCUSSION": (state, action) => {
            state.discussions[action.payload.id] = action.payload.discussion;
            const parent = state.discussions[action.payload.discussion.replyToId];
            if (parent != null) {
                if (action.payload.created) {
                    parent.replyCount++;
                }
                console.log("Set parent reply count to", parent.replyCount);
            } else {
                console.log("Parsent with id", action.payload.discussion.replyToId, "not found", JSON.stringify(state.discussions));
                
            }
        }
    },
});

export const { setDiscussionState } = discussionSlice.actions;

export const selectReplies = (toId: number) => {
    return (state: AppState) => {
        return Object.keys(state.discussion.discussions)
        .map(commentId => state.discussion.discussions[commentId])
        .filter(
            comment => comment.replyToId == toId
        )
    };
}

export const selectDiscussionById = (id: number) => {
    return (state: AppState) => {
        return state.discussion.discussions[id];
    }
}

export const selectRootDiscussions = (state: AppState) => {
    return Object.keys(state.discussion.discussions).map(dId => state.discussion.discussions[dId]).filter(d => d.replyToId == null);
}
export default discussionSlice.reducer;
