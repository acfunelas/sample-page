import { config } from '../config/app'

const request = async (action, options, isNotJSON) => {
  let paramOptions = options ? options : {};
  const isHeadersNull = paramOptions.headers === null ? true : false;

  if (!paramOptions.headers) {
    paramOptions.headers = {};
  }

  let defaultHeaders = {
    "x-api-key": config.live,
  };

  if (isNotJSON !== true && isHeadersNull !== true) {
    defaultHeaders["Accept"] = "application/json";
    defaultHeaders["Content-Type"] = "application/json";
  }

  const { headers, ...others } = paramOptions;

  let opt = {
    headers: {
        ...defaultHeaders,
        ...headers,
    },
    mode: 'cors',
    ...others,
  }

  let response = await fetch(action.toLowerCase().includes("http") ? action : config.api_root + action, opt);
  let responseJSON = null;

  if (isNotJSON !== true) {
    responseJSON = await response.json();
  }
  else {
    responseJSON = response;
  }

  if (responseJSON.force_logout === true) {
    window.location.reload(false);
    return {success: false};
  }
  else {
    return responseJSON;
  }
}

const obj = {
  request,
}

export default obj;