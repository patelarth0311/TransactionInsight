import * as Realm from "realm-web";
import { useState, useEffect } from "react";

export function useApp() {
    const [app, setApp] = useState<any>(null);
    // Run in useEffect so that App is not created in server-side environment
    useEffect(() => {
    
      setApp(Realm.getApp("transactionz-hzfgi"));
    
    }, []);

    return app;
  }