export class Fight {
  constructor(eventList) {
    this.eventList = eventList;
  }
  getFights() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `http://ufc-data-api.ufc.com/api/v1/us/events`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}
