import { createSlice } from "@reduxjs/toolkit";
import { currentUser, staticData } from "../staticData";

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: staticData,
    currentUser: currentUser,
    replyingTo: [],
    loading: false,
  },
  reducers: {
    setReplyingTo: (state, action) => ({
      ...state,
      replyingTo: action.payload,
    }),
    updateReplies: (state, action) => ({
      ...state,
      comments: [
        ...state.comments
          .map((cmt) =>
            cmt.id === action.payload.targetId
              ? { ...cmt, replies: [...cmt.replies, action.payload] }
              : { ...cmt }
          )
          .flat(1),
      ],
      loading: true,
    }),
    editReply: (state, action) => ({
      ...state,
      comments: [
        ...state.comments
          .map((cmt) =>
            cmt.replies.map((reply) =>
              reply.id === action.payload.targetId
                ? {
                    ...reply,
                    ...(action.payload.type === 0
                      ? { content: action.payload.content }
                      : { score: action.payload.score }),
                  }
                : { ...reply }
            )
          )
          .flat(1),
      ],
    }),
    deleteReply: (state, action) => ({
      ...state,
      ...(action.payload.type === 0
        ? {
            comments: [
              ...state.comments.filter(
                (comment) => comment.id !== action.payload.targetId
              ),
            ],
          }
        : {
            ...state.comments,
            comments: [
              ...state.comments
                .map((cmt) => ({
                  ...cmt.replies.filter(
                    (comment) => comment.id !== action.payload.targetId
                  ),
                }))
                .flat(1),
            ],
          }),
    }),
  },
});

// this is for dispatch
export const { setReplyingTo, updateReplies, deleteReply, editReply } =
  commentSlice.actions;

// this is for configureStore
export default commentSlice.reducer;
