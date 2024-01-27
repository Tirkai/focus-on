import { Client, Databases, Storage, Query, ID, Models } from 'appwrite';
import appwriteConfig from '../configs/appwrite.config';

interface PostData {
  title: string;
  slug: string;
  content: string;
  imagePreview: string;
  status: string;
  userId: string;
}

interface UpdatePostData {
  title?: string;
  content?: string;
  imagePreview?: string;
  status?: string;
}

export class DatabaseService {
  private client: Client;
  private databases: Databases;
  private bucket: Storage;

  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(appwriteConfig.appwriteUrl)
      .setProject(appwriteConfig.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async getPost(slug: string): Promise<Models.Document | false> {
    try {
      return await this.databases.getDocument(
        appwriteConfig.appwriteDatabaseId,
        appwriteConfig.appwriteCollectionId,
        slug,
      );
    } catch (error) {
      console.log('Appwrite service :: getPost() :: ', error);
      return false;
    }
  }

  // async getPosts(queries: Query[] = [Query.equal('status', 'active')]): Promise<Models.DocumentList | false> {
  //   try {
  //     return await this.databases.listDocuments(appwriteConfig.appwriteDatabaseId, appwriteConfig.appwriteCollectionId, queries);
  //   } catch (error) {
  //     console.log('Appwrite service :: getPosts() :: ', error);
  //     return false;
  //   }
  // }

  async getPosts(
    queries: string[] = [Query.equal('status', 'active').toString()],
  ): Promise<Models.DocumentList<Models.Document> | false> {
    try {
      return await this.databases.listDocuments(
        appwriteConfig.appwriteDatabaseId,
        appwriteConfig.appwriteCollectionId,
        queries,
      );
    } catch (error) {
      console.log('Appwrite service :: getPosts() :: ', error);
      return false;
    }
  }

  async createPost(data: PostData): Promise<Models.Document | false> {
    try {
      return await this.databases.createDocument(
        appwriteConfig.appwriteDatabaseId,
        appwriteConfig.appwriteCollectionId,
        ID.unique(),
        data,
      );
    } catch (error) {
      console.log('Appwrite service :: createPost() :: ', error);
      return false;
    }
  }

  async updatePost(
    slug: string,
    data: UpdatePostData,
  ): Promise<Models.Document | false> {
    try {
      return await this.databases.updateDocument(
        appwriteConfig.appwriteDatabaseId,
        appwriteConfig.appwriteCollectionId,
        slug,
        data,
      );
    } catch (error) {
      console.log('Appwrite service :: updateDocument() :: ', error);
      return false;
    }
  }

  async deletePost(slug: string): Promise<boolean> {
    try {
      await this.databases.deleteDocument(
        appwriteConfig.appwriteDatabaseId,
        appwriteConfig.appwriteCollectionId,
        slug,
      );
      return true;
    } catch (error) {
      console.log('Appwrite service :: deleteDocument() :: ', error);
      return false;
    }
  }

  async uploadFile(file: File): Promise<Models.File | false> {
    try {
      return await this.bucket.createFile(
        appwriteConfig.appwriteBucketId,
        ID.unique(),
        file,
      );
    } catch (error) {
      console.log('Appwrite service :: uploadFile() :: ', error);
      return false;
    }
  }

  async deleteFile(fileId: string): Promise<boolean> {
    try {
      await this.bucket.deleteFile(appwriteConfig.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log('Appwrite service :: deleteFile() :: ', error);
      return false;
    }
  }

  getFilePreview(fileId: string): string {
    return this.bucket.getFilePreview(appwriteConfig.appwriteBucketId, fileId)
      .href;
  }
}

const databaseService = new DatabaseService();
export default databaseService;
