
export class NotificationSession {

  constructor () {
    this.sessionKey = this.getSessionKey();
    this.ls = global.localStorage;
    this.session = JSON.parse(this.ls.getItem(this.sessionKey) || '{}');
    this.checkSession();
  }

  getSessionKey () {
    let site = window.location.hostname.split('.com')[0] || 'onioninc';
    return site + '-notificationsSession';
  }

  checkSession () {
    let now = Date.now();
    if ('sessionStart' in this.session) {
      let sessionStart = this.session.sessionStart || now;
      let diff = (now - sessionStart) / 3600000;
      if (diff > 12) { this.newSession(now); }
    }
    else {
      this.newSession(now);
    }
  }

  newSession (sessionTime) {
    this.session = {
      active: true,
      ids: [],
      sessionStart: sessionTime,
    };
  }

  updateSession () {
    this.ls.setItem(this.sessionKey, JSON.stringify(this.session));
  }

  setItem (key, value) {
    this.session[key] = value;
    this.updateSession();
  }

  getItem (key) {
    return this.session[key];
  }
}
