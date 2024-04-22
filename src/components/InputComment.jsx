import Button from "./Button";
import { v4 as uuidv4 } from "uuid";
import { setReplyingTo, updateReplies } from "../store/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

/* eslint-disable react/prop-types */
const InputComment = (props) => {
  const dispatch = useDispatch();
  const { currentUser, replyingTo, comments } = useSelector(
    (state) => state.comment
  );

  const { register, watch, handleSubmit } = useForm();

  const handleCancelInput = () => {
    dispatch(
      setReplyingTo(
        replyingTo.filter(function (item) {
          return item !== props.parentComment.id;
        })
      )
    );
  };

  const onSubmit = (data) => {
    dispatch(
      updateReplies({
        content: watch("comment"),
        targetId: props.parentComment.id,
        id: uuidv4(),
        user: currentUser,
        createdAt: "A moment ago", //new Date(),
        score: 0,
      })
    );
    handleCancelInput();
  };
  console.log("comments", comments);

  return (
    <div className="flex items-start pb-5 p-4 bg-white rounded-md gap-3">
      <img
        src={currentUser.image.webp}
        alt={currentUser.username}
        width={30}
        height={30}
      />
      <textarea
        {...register("comment")}
        placeholder="Add a comment"
        rows={4}
        id="comment"
        className="block p-2.5 w-full text-sm text-grayish-blue bg-white rounded-lg border border-light-grey focus:border-dark-blue focus:outline-none"
      >
        {props.value}
      </textarea>
      <div className="flex flex-col">
        <Button
          type="button"
          onClick={handleSubmit(onSubmit)}
          label={props.buttonTitle}
          variant={"default"}
        />
        <Button
          type="button"
          label={"Cancel"}
          variant={"danger"}
          onClick={() => handleCancelInput()}
        />
      </div>
    </div>
  );
};

export default InputComment;
