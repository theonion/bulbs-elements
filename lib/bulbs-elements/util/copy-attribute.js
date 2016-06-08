export default function copyAttribute(attribute, from, to) {
  to.setAttribute(attribute, from.getAttribute(attribute));
}
