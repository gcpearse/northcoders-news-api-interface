const formatWord = (number) => {
  if (number === 1) return "vote";
  return "votes";
};

const lengthenDate = (date) => {
  const day = date.split("-")[2];
  const month = date.split("-")[1];
  const year = date.split("-")[0];
  const reformattedDate = new Date(`${month}/${day}/${year}`).toDateString().split(" ");
  const numDay = Number(reformattedDate[2]);
  const lengthenedDate = [];
  const days = {
    "Mon": "Monday",
    "Tue": "Tuesday",
    "Wed": "Wednesday",
    "Thu": "Thursday",
    "Fri": "Friday",
    "Sat": "Saturday",
    "Sun": "Sunday",
  };
  const months = {
    "Jan": "January",
    "Feb": "February",
    "Mar": "March",
    "Apr": "April",
    "May": "May",
    "Jun": "June",
    "Jul": "July",
    "Aug": "August",
    "Sep": "September",
    "Oct": "October",
    "Nov": "November",
    "Dec": "December"
  };
  for (let day in days) {
    if (reformattedDate[0] === day) {
      lengthenedDate.push(days[day]);
    }
  }
  if (numDay === 1 || numDay === 21 || numDay === 31) {
    lengthenedDate.push(`${numDay}st`);
  } else if (numDay === 2 || numDay === 22) {
    lengthenedDate.push(`${numDay}nd`);
  } else if (numDay === 3 || numDay === 23) {
    lengthenedDate.push(`${numDay}rd`);
  } else {
    lengthenedDate.push(`${numDay}th`);
  }
  for (let month in months) {
    if (reformattedDate[1] === month) {
      lengthenedDate.push(months[month]);
    }
  }
  lengthenedDate.push(year);
  return lengthenedDate.join(" ");
};

export { formatWord, lengthenDate };
