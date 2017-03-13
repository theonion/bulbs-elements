export default function () {
  // If parent has analytics manager that
  // child should use, (e.g. reading list)
  const parent = this.closest('bulbs-reading-list-item');
  const { gaTracker } = parent;
  if (gaTracker) {
  	return gaTracker;
  }

  // Global default
  else {
  	return window.analyticsManager;
  }
}

