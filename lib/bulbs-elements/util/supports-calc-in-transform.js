// Older versions of IE do not support css calc in transforms.
// We can detect this feature by setting the transform style of
// an element to a calc string. In non-supporting browsers, further
// reads of this property will return an empty string.
let { style } = document.createElement('div');
style.transform = 'translateX(calc(100% - 10px))';

// This CANNOT be checked in the assignment expression.
// non-supporting browsers will return the string with calc
// from the assignment, and then the empty string on access.
export default style.transform !== '';
