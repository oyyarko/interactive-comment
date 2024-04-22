export const addorUpdateComment = ({ id, newReply, comments }) => {
    const commentIndex = comments.findIndex(comment => comment.id === id);

    if (commentIndex !== -1) {
      // Make a copy of the comment object to ensure immutability
      const updatedComment = { ...comments[commentIndex] };
    
      const existingReplyIndex = updatedComment.replies.findIndex(reply => reply.id === newReply.id);
      if (existingReplyIndex !== -1) {
        // Update existing reply
        updatedComment.replies[existingReplyIndex] = newReply;
      } else {
        // Add new reply
        updatedComment.replies.push(newReply);
      }
    
      // Update the comments array with the modified comment
      const updatedComments = [...comments];
      updatedComments[commentIndex] = updatedComment;
    
      console.log(updatedComments);
    } else {
      console.log("Comment not found.");
    }
  return comments;
  //   console.log(
  //     "meow",
  //     array.some((obj) => obj.id === id)
  //       ? array.map((obj) => (obj.id === id ? { ...obj, ...content } : obj))
  //       : [...array, { id: content.id, ...content }]
  //   );
  //   return array.some((obj) => obj.id === id)
  //     ? array.map((obj) => (obj.id === id ? { ...obj, ...content } : obj))
  //     : [...array, { id: content.id, ...content }];
};
