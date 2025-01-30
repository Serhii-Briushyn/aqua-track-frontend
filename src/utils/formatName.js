export const formatName = (name, email) => {
  if (name) {
    const firstName = name.split(" ")[0];

    return firstName.length > 10 ? `${firstName.slice(0, 10)}...` : firstName;
  } else if (email) {
    const emailPrefix = email.split("@")[0];

    return emailPrefix.length > 10
      ? `${emailPrefix.slice(0, 10)}...`
      : emailPrefix;
  }

  return "User";
};
