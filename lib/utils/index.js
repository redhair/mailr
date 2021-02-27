export function getSubscriberCounts(subscribers, dayOffset) {
  let freqs = {};
  for (let i = 0; i < subscribers.length; i++) {
    let sub = subscribers[i];
    let created = new Date(sub.created_at);
    let now = new Date();
    let prevDate = new Date();
    prevDate.setDate(prevDate.getDate() - dayOffset);
    if (created > prevDate && created < now) {
      if (!freqs[created.getDate()]) {
        freqs[created.getDate()] = {
          count: 1,
          name: getNameOfWeekday(created.getDay()),
        };
      } else {
        freqs[created.getDate()] = {
          count: (freqs[created.getDate()].count += 1),
          name: getNameOfWeekday(created.getDay()),
        };
      }
    }
  }

  return freqs;
}

export function lastXDays(x) {
  let result = [];
  let d = new Date();

  for (let i = 0; i < x; i++) {
    result.push({ number: d.getDate(), name: getNameOfWeekday(d.getDay()) });
    d.setDate(d.getDate() - 1);
  }

  return result;
}

export function getNameOfWeekday(i) {
  let weekday = new Array(7);
  weekday[0] = 'Sunday';
  weekday[1] = 'Monday';
  weekday[2] = 'Tuesday';
  weekday[3] = 'Wednesday';
  weekday[4] = 'Thursday';
  weekday[5] = 'Friday';
  weekday[6] = 'Saturday';

  return weekday[i];
}
