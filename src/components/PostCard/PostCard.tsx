import { FC } from 'react';
import { Link } from 'react-router-dom';
import databaseService from '../../appwrite/databaseService';
interface IPostCardProps {
  $id: string;
  title: string;
  imagePreview: string;
}

const PostCard: FC<IPostCardProps> = ({ $id, title, imagePreview }) => {
  return (
    <Link to={`/post/${$id}`}>
      <article className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={databaseService.getFilePreview(imagePreview)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </article>
    </Link>
  );
};

export default PostCard;
