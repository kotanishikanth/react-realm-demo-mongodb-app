import Realm from "realm"

export class TodoItem extends Realm.Object<TodoItem> {
  _id!: Realm.BSON.ObjectId;
  subject!: string;
  //isCompleted!: boolean;

  static schema = {
    name: "todoitem",
    primaryKey: "_id",
    properties: {
      _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },  
      "subject": "string"
      //isCompleted: "bool",
    },
  };
}
