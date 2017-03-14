export default function () {
  // If parent has analytics manager that
  // child should use, (e.g. reading list)
  if (this === null) {
    console.debug('Error: need to bind context to get parent.');
    return;
  }

  const parent = this.closest('bulbs-reading-list-item');
  const { gaTracker } = parent;

  return gaTracker;
}

