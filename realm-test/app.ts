import Realm from 'realm'
import { TodoItem } from './src/realm-object-types';


const dotenv = require('dotenv');
dotenv.config();

const APP_ID = process.env.APP_ID || "";
(async () => {


  const USER_EMAIL = process.env.USER_EMAIL || "";
  const USER_PASSWORD = process.env.USER_PASSWORD || "";

  const app = new Realm.App({ id: APP_ID });
  const credentials = Realm.Credentials.emailPassword(USER_EMAIL, USER_PASSWORD);
  try {
    const user = await app.logIn(credentials);
    if (user) console.log('Success');

    // create new dog
    const realm = await Realm.open({
      schema: [TodoItem],
      sync: { user, flexible: true },
      //disableFormatUpgrade: undefined
    });

    //realm.objects("todoitem").addListener((e) => console.log('Todo Listner', e))

    
    await realm.subscriptions.update((subs) => {
      const todoItems = realm
      .objects("todoitem")
      // .filtered('name == "Clifford" && age > 5');
      subs.add(todoItems);
      console.log('Retrieving Subscription for TodoItems:', todoItems);
    });

    
    const dog = realm.write(() => {
      return realm.create("todoitem", { subject: "This is task 3" });
    });
    

  } catch (err) {
    console.error("Failed to log in", err);
  }
})(); 