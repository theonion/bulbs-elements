export default function () {
  // If parent has analytics manager that
  // child should use, (e.g. reading list)
  if (this === null) {
    console.debug('Error: need to bind context to get parent.');
    return null;
  }

  const parent = this.closest('bulbs-reading-list-item');

  if (parent === null) {
    console.debug('Error: couldn\'t find a parent in the reading list.');
    return null;
  }

  return parent.gaTracker;
}

