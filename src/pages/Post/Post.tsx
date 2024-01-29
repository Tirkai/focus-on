import { FC } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import parse from 'html-react-parser';
import databaseService, { IPostData } from '../../appwrite/databaseService';
import {
  DatabaseDocument,
  useDocument,
  useDocumentDelete,
} from 'react-appwrite';
import appwriteConfig from '../../configs/appwrite.config';

type PostModel = DatabaseDocument<IPostData>;

const Post: FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const doc = useDocument<PostModel>(
    appwriteConfig.appwriteDatabaseId,
    appwriteConfig.appwriteCollectionId,
    slug!,
  );

  const deleteHandler = useDocumentDelete();

  const handleDelete = async (post: DatabaseDocument<IPostData>) => {
    const { $id, featuredImage } = post;

    try {
      await deleteHandler.mutateAsync({
        databaseId: appwriteConfig.appwriteDatabaseId,
        collectionId: appwriteConfig.appwriteCollectionId,
        documentId: $id,
      });

      databaseService.deleteFile(featuredImage);
    } catch (e) {
      console.error(e);
    }
  };

  const { data: post } = doc;

  if (doc.error || !post) {
    navigate('/');
    return null;
  }

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  return (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={databaseService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />
          {isAuthor && (
            <div className="absolute-right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3" type={'button'}>
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500"
                onClick={() => handleDelete(post)}
                type={'button'}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className="browser-css">{parse(post.content)}</div>
        </div>
      </Container>
    </div>
  );
};

export default Post;
