export interface RegisterData {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface BackendRegisterResponse {
  message: string;
  errors?: {
    [key: string]: string[];
  };
}

export interface BackendLoginResponse {
  message: string;
  errors?: {
    [key: string]: string[];
  };
  token?: string;
}

export interface LoginData {
  email: string;
  password: string;
}
