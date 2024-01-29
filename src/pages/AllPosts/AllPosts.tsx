import { FC, useState } from 'react';
import { useEffect } from 'react';
import Container from '../../components/Container/Container';
import PostCard from '../../components/PostCard/PostCard';
import databaseService, { IPostData } from '../../appwrite/databaseService';

const AllPosts: FC = () => {
  const [posts, setPosts] = useState<IPostData[]>([]);

  

  useEffect(() => {
    databaseService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-1/4" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
