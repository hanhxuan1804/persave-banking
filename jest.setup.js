import '@testing-library/jest-dom';

// If you need more sophisticated behavior for the mock, you can define it here
global.Request = class {
  constructor(input, init) {
    this.input = input;
    this.init = init;
  }
};

global.Headers = class {
  constructor(headers) {
    this.headers = headers;
  }

  set(key, value) {
    this.headers[key] = value;
  }
};

global.Response = class {
  constructor(body, init) {
    this.body = body;
    this.init = init;
  }
};
