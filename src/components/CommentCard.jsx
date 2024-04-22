/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/prop-types */
import React from "react";
import Button from "./Button";
import { RiReplyFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import InputComment from "./InputComment";
import { deleteReply, editReply, setReplyingTo } from "../store/commentSlice";
import { useForm } from "react-hook-form";

const CommentCard = (props) => {
  const dispatch = useDispatch();
  const { currentUser, replyingTo } = useSelector((state) => state.comment);
  const { register, watch, handleSubmit } = useForm();

  console.log("watch()", watch("content"));
  return (
    <>
      <div key={props.cmt.id}>
        <div className="pb-5 p-4 bg-white rounded-md flex gap-3">
          <div className="rounded-md bg-ultra-light-grey p-3 gap-2 flex flex-col text-center text-sm h-full text-light-grayish-color font-medium">
            <span
              className="hover:cursor-pointer"
              onClick={() => {
                dispatch(
                  editReply({
                    targetId: props.cmt.id,
                    type: 1,
                    score: props.cmt.score + 1,
                  })
                );
              }}
            >
              +
            </span>
            <p className="text-primary-color">{props.cmt.score}</p>
            <span
              className="hover:cursor-pointer"
              onClick={() => {
                dispatch(
                  editReply({
                    targetId: props.cmt.id,
                    type: 1,
                    score: props.cmt.score - 1,
                  })
                );
              }}
            >
              -
            </span>
          </div>
          <div className="flex flex-col px-1.5 max-sm:flex-col-reverse">
            <div className="flex gap-3 items-center justify-between pb-1">
              <div className="flex gap-3 items-center">
                <img
                  src={props.cmt.user.image.webp}
                  alt={props.cmt.user.username}
                  width={30}
                  height={30}
                />
                <p className="text-sm text-dark-blue font-semibold pb-0">
                  {props.cmt.user.username}
                </p>
                {props.cmt.user.username === currentUser.username ? (
                  <span className="bg-primary-color rounded-sm text-xs text-white px-1">
                    you
                  </span>
                ) : null}
                <p className="text-xs text-grayish-blue">
                  {props.cmt.createdAt}
                </p>
              </div>
              {props.cmt.user.username === currentUser.username ? (
                <div className="flex">
                  <Button
                    isOutline
                    type="button"
                    label={"Delete"}
                    variant={"outline-danger"}
                    class={"m-0 pe-0"}
                    onClick={() =>
                      dispatch(deleteReply({ targetId: props.cmt.id, type: 1 }))
                    }
                    icon={<MdDelete fontSize={16} />}
                  />
                  {console.log("props", props)}
                  <Button
                    type="button"
                    label={"Edit"}
                    variant={"outline"}
                    class={"m-0 p-0"}
                    // onClick={() => dispatch(editReply({targetId: props.cmt.id, }))}
                    icon={<FaPencil fontSize={16} />}
                  />
                </div>
              ) : (
                <Button
                  type="button"
                  label={"Reply"}
                  variant={"outline"}
                  class={"m-0 p-0"}
                  onClick={() => {
                    dispatch(setReplyingTo([...replyingTo, props.cmt.id]));
                  }}
                  icon={<RiReplyFill fontSize={16} />}
                />
              )}
            </div>
            <p className="text-sm text-grayish-blue">
              {props.cmt.replyingTo ? (
                <span className="text-primary-color font-medium">
                  @{props.cmt.replyingTo}
                </span>
              ) : null}{" "}
              {props.cmt.content}
            </p>
          </div>
        </div>
      </div>
      {replyingTo.includes(props.cmt.id) ? (
        <InputComment buttonTitle={"Reply"} parentComment={props.cmt} />
      ) : null}

      {!!props.cmt.replies ? (
        <div className="ms-8 ps-8 flex flex-col gap-4 border-l-2">
          {props.cmt.replies?.map((rpl) => {
            return (
              <React.Fragment key={rpl.id}>
                <CommentCard cmt={rpl} />
              </React.Fragment>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default CommentCard;
