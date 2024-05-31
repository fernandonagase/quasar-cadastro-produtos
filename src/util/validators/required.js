export default function (message) {
  function requires(value) {
    return !!value || message;
  }
  return requires;
}
