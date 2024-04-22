import React from "react";
import { useSelector } from "react-redux";
import CommentCard from "./components/CommentCard";
import InputComment from "./components/InputComment";

function App() {
  const { comments } = useSelector((state) => state.comment);

  console.log('comments', comments)

  return (
    <div className="min-h-screen flex items-center justify-center bg-ultra-light-grey md:p-4 max-sm:p-4">
      <div className="max-w-xl w-full flex flex-col gap-2">
        {comments?.map((cmt) => (
          <React.Fragment key={cmt.id}>
            <CommentCard cmt={cmt} />
          </React.Fragment>
        ))}
        <InputComment buttonTitle={"Send"} />
      </div>
      {/* <p className="text-primary-color">Hello world</p> */}
    </div>
  );
}

export default App;
