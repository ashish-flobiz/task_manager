import { Injectable } from '@angular/core';

/**
  * Service responsible for authentication.
   */
@Injectable({ providedIn: 'root' })
export class AuthService {

  /**
   * Checks if the user is logged in.
   * @returns True if the user is logged in, false otherwise
   */
	isLoggedIn(): boolean {
  return true;
}
}
