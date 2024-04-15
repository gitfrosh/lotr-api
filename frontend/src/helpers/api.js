let host;
if (process.env.NODE_ENV === "development") {
  host = "http://localhost:3001"
} else {
  host = "/"
}

export async function login(values) {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  if (values) {
    requestOptions.body = JSON.stringify(values);
  }
  try {
    const response = await fetch(
      `${`${host}/auth/login`}`,
      requestOptions
    );
    if (response.status > 399) {
      const body = await response.json();
      return {
        success: false,
        message: body.message,
      };
    } else {
      const json = await response.json();
      return json;
    }
  } catch (e) {
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}

export async function register(values) {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  if (values) {
    requestOptions.body = JSON.stringify(values);
  }
  try {
    const response = await fetch(
      `${`${host}/auth/register`}`,
      requestOptions
    );
    if (response.status > 399) {
      const body = await response.json();
      return {
        success: false,
        message: body.message,
      };
    } else {
      const json = await response.json();
      return json;
    }
  } catch (e) {
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}

export async function logout() {
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(
      `${`${host}/auth/logout`}`,
      requestOptions
    );
    if (response.status > 399) {
      const body = await response.json();
      return {
        success: false,
        message: body.message,
      };
    } else {
      const json = await response.json();
      return json;
    }
  } catch (e) {
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}

export async function getUserInfo() {
  var match = document.cookie.match(new RegExp("(^| )lotr-api=([^;]+)"));
  if (match) {
    const jwt = match[2];
    const parsedJwt = JSON.parse(atob(jwt.split(".")[1]));
    const { user } = parsedJwt;
    return user;
  }
}
