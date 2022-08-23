export function isString(x: any): x is string {
  return typeof x === 'string';
}

export function queryParamsDictionary() {
  const url = window.location.hash;
  const query = url.slice(1);
  const dic = Object.fromEntries(new URLSearchParams(query));
  return dic;
}
