import { useState, FC } from 'react'
import {useParams, useNavigate} from "react-router-dom"
import { useEffect } from 'react'
import Container from "../../components/Container/Container"
import PostForm from '../../components/PostForm/PostForm'
import databaseService from '../../appwrite/databaseService'

const EditPost:FC = () => {
  const [post, setPost] = useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      databaseService.getPost(slug).then((post) => {
        if (post) {
          setPost(post)
        }else {
          navigate("/")
        }
      })
    }
  }, [slug, navigate])
  return (
    <div className='py-6'>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  )
};

export default EditPost;
