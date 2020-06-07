export class DatabaseService {

  // Dummy handler
  databaseInstance: null;

  constructor() {}

  // singleton
  static instance: DatabaseService;
  static get = (): Promise<DatabaseService> => {
    return new Promise<DatabaseService>( resolve => {
      if (!DatabaseService.instance) {
        DatabaseService.instance = new DatabaseService();
      }
      resolve(DatabaseService.instance);
    });
  }

  // Dummy db data
  menu = [
    { name: 'Chicken Fried Rice', category: 'Chicken', price: '10.80' },
    { name: 'Nasi Lemak', category: 'Chicken', price: '12.10' },
    { name: 'Chicken Tikka Masala', category: 'Chicken', price: '12.10' },
    { name: 'Chicken Cacciatore', category: 'Chicken', price: '13.30' },
    { name: 'Korean Fried Chicken', category: 'Chicken', price: '16.00' },
    { name: 'Chicken Kiev', category: 'Chicken', price: '10.80' },
    { name: 'Beef Fried Rice', category: 'Beef', price: '10.80' },
    { name: 'Mongolian Beef', category: 'Beef', price: '11.40' },
    { name: 'Beef Brisket', category: 'Beef', price: '14.00' },
    { name: 'Eye Fillet Steak', category: 'Beef', price: '40.00' },
    { name: 'Hamburger', category: 'Beef', price: '13.30' },
    { name: 'Beef Rendang', category: 'Beef', price: '11.40' },
    { name: 'Vegetable Fried Rice', category: 'Vegetarian', price: '9.80' },
    { name: 'Dumplings', category: 'Vegetarian', price: '8.80' },
    { name: 'Roti Canai', category: 'Vegetarian', price: '9.80' },
    { name: 'Garden Salad', category: 'Vegetarian', price: '9.60' },
    { name: 'Mushroom Risotto', category: 'Vegetarian', price: '15.00' },
    { name: 'Minestrone Soup', category: 'Vegetarian', price: '10.80' },
    { name: 'Coffee', category: 'Drinks', price: '4.00' },
    { name: 'Tea', category: 'Drinks', price: '3.50' },
    { name: 'Sprite', category: 'Drinks', price: '3.00' },
    { name: 'Fanta', category: 'Drinks', price: '3.00' },
    { name: 'Corona Extra', category: 'Drinks', price: '8.00' },
    { name: 'Red Bull', category: 'Drinks', price: '4.00' },
  ];

  log = {
    order: () => { console.log('Order Logged') },
    payment: () => { console.log('Payment logged') }
  }

  collection = (collection: 'menu'): Promise<any[]> => {
    return new Promise<any[]>( resolve => resolve(this[collection]) );
  }
}