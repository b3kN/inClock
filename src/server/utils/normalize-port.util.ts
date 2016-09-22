export function normalizePort(input) {
  let port = parseInt(input, 10);

  if (isNaN(port)) {
    return input;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}
