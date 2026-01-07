export interface User {
  _id?: string;
  uid?: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role?: 'student' | 'instructor' | 'admin';
}

export interface ClassItem {
  _id: string;
  name: string;
  image: string;
  instructor: string;
  instructor_img?: string;
  email?: string;
  seats: number;
  price: number;
  enrolled: number;
  status: 'pending' | 'approved' | 'denied';
  feedback?: string;
}

export interface Instructor {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: 'instructor';
  numClasses?: number;
  classesTaken?: string[];
}

export interface Booking {
  _id: string;
  courseId: string;
  name: string;
  image: string;
  price: number;
  enrolled: 'none' | 'paid';
  email: string;
  userName: string;
  userId: string;
  date?: string;
  transactionId?: string;
}

export interface PaymentHistory {
  _id: string;
  email: string;
  transactionId: string;
  price: number;
  date: string;
  quantity: number;
  cartItems: string[];
  classItems: string[];
  itemNames: string[];
  status: string;
}
