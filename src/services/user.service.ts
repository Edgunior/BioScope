import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { OrderModel } from '../models/order.model';

@Injectable({
  providedIn: 'root' 
})
export class UserService {
  constructor() {}




  retrieveUsers(): UserModel[] {
    if (!localStorage.getItem('users')) {
      const arr: UserModel[] = [
        {
          email: 'user@example.com',
          firstName: 'Example',
          lastName: 'User',
          phone: '+3816123456789',
          address: 'Vojvode Stepe 62, Kraljevo',
          password: 'user123',
          orders: []
        }
      ];

      localStorage.setItem('users', JSON.stringify(arr));
    }

    return JSON.parse(localStorage.getItem('users')!);
  }

  createUser(model: UserModel): boolean {
    const users = this.retrieveUsers();

    for (let u of users) {
      if (u.email === model.email) return false;
    }

    users.push(model);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): boolean {
    for (let user of this.retrieveUsers()) {
      if (user.email === email && user.password === password) {
        localStorage.setItem('active', user.email);
        return true;
      }
    }

    return false;
  }

  getActiveUser(): UserModel | null {
    if (!localStorage.getItem('active')) return null;

    for (let user of this.retrieveUsers()) {
      if (user.email == localStorage.getItem('active')) {
        return user;
      }
    }

    return null;
  }

  createOrder(order: OrderModel): boolean {
    const storedUsers = localStorage.getItem('users');
    const activeEmail = localStorage.getItem('active');

    if (!storedUsers) {
        console.error('No users found in localStorage!');
        return false;
    }

    if (!activeEmail) {
        console.error('No active user found in localStorage!');
        return false;
    }

    const users = JSON.parse(storedUsers);
    console.log('Retrieved users:', users);
    console.log('Active user email:', activeEmail);

    for (let user of users) {
        if (user.email === activeEmail) {
            if (!user.orders) {
                user.orders = [];
            }
            user.orders.push(order);
            localStorage.setItem('users', JSON.stringify(users));
            console.log('Order saved successfully:', order);
            return true;
        }
    }

    console.error('Active user not found in user list!');
    return false;
}



changeOrderStatus(state: 'poručeno' | 'plaćeno' | 'otkazano', id: number): boolean {
  const active = this.getActiveUser();
  if (active) {
      const arr = this.retrieveUsers();
      for (let user of arr) {
          if (user.email === active.email) {
              for (let order of user.orders) {
                  if (order.id === id) {
                      order.status = state;
                  }
              }
              localStorage.setItem('users', JSON.stringify(arr));
              return true;
          }
      }
  }
  return false;
}

changeRating(r: boolean, id: number): boolean {
  const active = this.getActiveUser();
  if (active) {
    const arr = this.retrieveUsers();
    for (let user of arr) {
      if (user.email === active.email) {
        for (let order of user.orders) {
          if (order.id === id && order.status === 'plaćeno') {
            order.rating = r ? 1 : -1;
          }
        }
        localStorage.setItem('users', JSON.stringify(arr));
        return true;
      }
    }
  }
  return false;
}



changePassword(newPassword: string): boolean {
  const arr = this.retrieveUsers();
  for (let user of arr) {
      if (user.email === localStorage.getItem('active')) {
          user.password = newPassword;
          localStorage.setItem('users', JSON.stringify(arr));
          return true;
      }
  }
  return false;
}


}
