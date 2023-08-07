
import Realm from "realm"
import { TransactionType } from "../components/types"


export class Transaction extends Realm.Object<TransactionType> {

    _id!: Realm.BSON.ObjectId;
    merchant!: string;
    price!: number
    date!: string;
    category!: string[];
    location!: string;

    static schema = {
        name: 'Transaction',
        properties: {
            _id: 'int',
            merchant: 'string',
            price: 'int',
            date: 'string',
            category: 'array',
            location: 'string'

        },
        primaryKey: '_id',
    }
}



