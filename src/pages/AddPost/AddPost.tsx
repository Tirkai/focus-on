import { FC } from "react";
import Container from "../../components/Container/Container";
import PostForm from "../../components/PostForm/PostForm";

const AddPost:FC = () => {
  return (
    <div className='py-6'>
      <Container>
        <PostForm />
      </Container>
    </div>
  )
};

export default AddPost;
