import { extendObservable, action } from 'mobx'
import { getItem, setItem } from './utils/localStorage'

export default class Store {
  constructor() {
    const session = getItem('session');

    extendObservable(this, {
      session: session,
      get isLoggedIn() {
        return !!this.session
      },
      get authToken() {
        return this.isLoggedIn ? this.session.token : null;
      },
      setSession: action(session => {
        this.session = session
        setItem('session', session)
      })
    })
  }
}
