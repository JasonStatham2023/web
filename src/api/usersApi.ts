import request from './request';
import {CustomResponse} from '../types/response.module';

class UsersApi {
  login({account, password}: { account: string; password: string }): Promise<CustomResponse<any>> {
    return request.post('/users/login', {
      account,
      password
    });
  }


  register({account, password, email, inviteCode}: {
		account: string;
		password: string;
		email: string;
		inviteCode: number;
	}): Promise<CustomResponse<any>> {
    return request.post('/users/register', {
      account,
      password,
      email,
      inviteCode,
    });
  }

  activateAccount({email, authCode}: { email: string; authCode: string }): Promise<CustomResponse<any>> {
    return request.post('/users/activateAccount', {email, authCode});
  }

  sendPasswordResetEmail({email}: { email: string }): Promise<CustomResponse<any>> {
    return request.post('/users/sendPasswordResetEmail', {email});
  }


  resetPassword({email, authCode, password}: {
		email: string;
		authCode: string;
		password: string;
	}): Promise<CustomResponse<any>> {
    return request.post('/users/resetPassword', {
      email,
      authCode,
      password
    });
  }
}

export const usersApi = new UsersApi();