export async function register(previousState, formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    console.log({ email, password });
    // sending these email and password to backend
    const res = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await res.json();
    if (data?.error) {
      return { ...previousState, error: data.error };
    }
    return { error: null, success: data };
  } catch (error) {
    return { ...previousState, error: "Something went wrong" };
  }
}

export async function login(previousState, formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    console.log({ email, password });
    // sending these email and password to backend
    const res = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await res.json();
    if (data?.error) {
      return { ...previousState, error: data.error };
    }
    return { error: null, success: data };
  } catch (error) {
    return { ...previousState, error: "Something went wrong" };
  }
}
