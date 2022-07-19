export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validateAndSet= (
  setValues = () => null,
  setErr = () => null,
  type,
  values = {},
  event = {}
) => {
  if (
    (event.target.name === "email" || type === "email") &&
    !validateEmail(event.target.value)
  ) {
    setErr((pre) => ({
      ...pre,
      [event.target.name]: "Please input valid email !",
    }));
    return;
  }
  if (
    event.target.name === "password_confirmation" &&
    values?.password !== event.target.value
  ) {
    setErr((pre) => ({
      ...pre,
      [event.target.name]: "Password does not match !",
    }));
    return;
  }
  setValues((pre) => ({
    ...pre,
    [event.target.name]: event.target.value,
  }));
  setErr((pre) => ({
    ...pre,
    [event.target.name]: null,
  }));
};



export function orderIds(id1, id2) {
  if (id1 > id2) {
      return id1 + "-" + id2;
  } else {
      return id2 + "-" + id1;
  }
}