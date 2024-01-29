
import { Client, Account, ID, Models } from 'appwrite';
import { appwriteClient } from './appwrite-connector';

export interface IUser {
  email: string;
  password: string;
  name: string;
}

export class AuthService {
  private client: Client;
  private account: Account;

  constructor() {
    // this.client = new Client();
    this.client = appwriteClient;
    // this.client
    //   .setEndpoint(appwriteConfig.appwriteUrl)
    //   .setProject(appwriteConfig.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({
    email,
    password,
    name,
  }: IUser): Promise<Models.Session | null> {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }: Pick<IUser, 'email' | 'password'>) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  async getCurrentUser(): Promise<Models.User<Models.Preferences> | null> {
    try {
      return await this.account.get();
    } catch (error) {
      console.log('Appwrite service :: getCurrentUser() :: ', error);
    }
    return null;
  }
  async logout(): Promise<void> {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log('Appwrite service :: logout() :: ', error);
    }
  }
}

const authService = new AuthService();

export default authService;
