export default function moveChildren(from, to) {
  Array.prototype.forEach.call(
    Array.prototype.slice.call(from.childNodes),
    child => to.appendChild(child)
  );
}
