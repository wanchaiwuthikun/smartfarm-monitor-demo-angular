import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserCredential} from '@firebase/auth-types';
import {SignIn} from '@modules/authentication/models/signIn';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {User} from '@models/user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  user: any;

  constructor(private firebaseAuth: AngularFireAuth,
              private firebaseFireStore: AngularFirestore,
              private router: Router
              ) {
    this.setUserDataToLocalStorage();
  }

  private setUserDataToLocalStorage(): void {
    this.firebaseAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.setLocalStorage('smart-farm-user', JSON.stringify(user));
      } else {
        this.setLocalStorage('smart-farm-user', null);

      }
    });
  }

  setUserData(user: User): Promise<any>{
    const userRef: AngularFirestoreDocument<any> = this.firebaseFireStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  async signInWithEmailAndPassword(signInData: SignIn): Promise<any> {
    const {email, password} = signInData;
    return await this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  async signOut(): Promise<void> {
       this.firebaseAuth.signOut().then(() => {
         this.removeLocalStorage('user');
         this.router.navigate(['auth']);
       });

  }

  setLocalStorage(name: string, data: string | null): void {
    localStorage.setItem(name, JSON.stringify(data));
  }

  removeLocalStorage(name: string): void {
    localStorage.removeItem(name);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('smart-farm-user') as string);
    return (user !== null);
  }
}
