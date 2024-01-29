import { useState, FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Container from '../../components/Container/Container';
import PostForm from '../../components/PostForm/PostForm';
import databaseService, { IPostData } from '../../appwrite/databaseService';
import { DatabaseDocument, useDocument } from 'react-appwrite';
import appwriteConfig from '../../configs/appwrite.config';

type Post = DatabaseDocument<IPostData>

const EditPost: FC = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const doc = useDocument<Post>(
    appwriteConfig.appwriteDatabaseId,
    appwriteConfig.appwriteCollectionId,
    slug!,
  );

  const {  data  } = doc;

  // useEffect(() => {
  //   if (slug) {
  //     databaseService.getPost(slug).then((post) => {
  //       if (post) {
  //         setPost(post);
  //       } else {
  //         navigate('/');
  //       }
  //     });
  //   }
  // }, [slug, navigate]);

  return (
    <div className="py-6">
      {JSON.stringify(data)}
      {/* <Container>
        <PostForm post={post} />
      </Container> */}
    </div>
  );
};

export default EditPost;
