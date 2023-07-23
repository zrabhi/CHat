export const baseURL = "http://localhost:3000/api";

export const postRequest = async (url: string, body: any) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const data = await response.json();
  if (!response.ok)
  {
    let message;
    if (data?.message)
        message = data.message;
    else
        message =  data;
    return ({error:true, message:message});
  }
  return data;
};

export {};