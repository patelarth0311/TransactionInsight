"use client"

import {
    usePlaidLink,
    PlaidLinkOptions,
    PlaidLinkOnSuccess,
  } from 'react-plaid-link';

import { useEffect } from 'react';
import { useState } from 'react';
import {myAxios} from '../axiosConfig'
import { link } from 'fs';
import { Dashboard } from './Dashboard';
import * as Realm from "realm-web";
import { useApp } from '../RealmApp';

export function Landing() {
    const app = useApp()
    const [user, setUser] = useState()
    const credentials = Realm.Credentials.anonymous();
        // Authenticate the user

        useEffect(() => {
          if (app) {
            login().then((res) => {
              setUser(res)
            })
          }
        },[app])
        var login = async () => await app.logIn(credentials)

    return <div className="font-['poppins'] bg-neutral-50">
     {(app && app.users) &&<Dashboard></Dashboard>
   
     }

    </div>

}

