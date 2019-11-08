import { requestToAPI } from "../services/backend-api-services";

export const getRandomWords = () => {
  return requestToAPI('/words', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then(parsed => {
      if (parsed.message) throw parsed.message;
      return parsed;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
}