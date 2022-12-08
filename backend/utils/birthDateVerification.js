const filterBySlash = (line) => {
  const results = [];
  const lines = line.split("\n");
  lines.forEach((line) => {
    if (line.includes("/")) {
      results.push(line);
    }
  });

  return results;
};

const checkIfDate = (arr) => {
  const results = [];
  arr.forEach((line) => {
    const split = line.split("/");
    if (split.length === 3) {
      results.push(line);
    }
  });

  return results;
};

const findBirthDate = (data) => {
  if (!data) {
    console.log("Error: No data found.");
    return null;
  }

  const filteredArr = filterBySlash(data);

  if (filteredArr.length === 0) {
    console.log("Error: No data found.");
    return null;
  }

  const dateArr = checkIfDate(filteredArr);

  if (dateArr.length === 0) {
    console.log("Error: No data found.");
    return null;
  }

  return dateArr.sort((a, b) => {
    return Date.parse(a) - Date.parse(b);
  })[0];
};

const verifyBirthDate = (data) => {
  const currentDate = new Date();
  const birthDate = new Date(findBirthDate(data));
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const m = currentDate.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
    age--;
  }

  return {
    isAdult: age >= 18,
    birthDate: birthDate,
  };
};

export { verifyBirthDate };
