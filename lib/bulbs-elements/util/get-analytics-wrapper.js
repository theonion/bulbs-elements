export default function () {
  // If parent has analytics manager that
  // child should use, (e.g. reading list)
  if (this) {
    const parent = this.closest('bulbs-reading-list-item');
    const { gaTracker } = parent;
    
    return gaTracker;
  }
}

