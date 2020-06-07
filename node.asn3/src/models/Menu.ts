import { MenuItem } from "./MenuItem";
import { DatabaseService } from "../services/DatabaseService";

export class Menu {

  menuItems: MenuItem[];
  
  constructor() {
    this.menuItems = [];
  }
  
  // singleton
  static instance: Menu;
  static get = (): Promise<Menu> => {
    return new Promise<Menu>( async resolve => {
      if (!Menu.instance) {
        Menu.instance = new Menu();
        Menu.instance.menuItems = await Menu.instance.initMenuItems();
      }
      resolve(Menu.instance);
    })
  }

  initMenuItems = async (): Promise<MenuItem[]> => {
    return new Promise<MenuItem[]>( async resolve => {
      const db = await DatabaseService.get();
      resolve( (await db.collection('menu'))
        .map( ({ name, price, category }) => new MenuItem( name, price, category) )
      );
    });
  }

  getItem = (name: string): MenuItem => {
    const item: MenuItem | undefined = this.menuItems.find( i => i.name === name );
    if (item) return item;
    throw new Error('Menu item not found reee');
  }
}