const generateArray = (number) => {
  const array = [];
  for (let i = 0; i < number; i++) {
    array.push(Math.floor(Math.random() * 100));
  }
  return array;
};

/* const filterArray = (array) => {
  const newSet = new Set(array);
  const filtered = Array.from(newSet);
  return filtered;
}; */

const Tree = (array) => {
  const root = buildTree(mergeSort(array), 0, array.length - 1, null);
  console.log(mergeSort(array));
  console.log(new Set(mergeSort(array)));
  prettyPrint(root);
  return root;
};

const Node = (value) => {
  return {
    value: value,
    count: 0,
    left: null,
    right: null,
  };
};

const buildTree = (array, start, end) => {
  let mid = Math.floor((start + end) / 2);
  let midSub = Math.floor((start + end) / 2);
  if (start > end) return null;
  let count = 1;

  const root = Node(array[mid]);

  while (mid < end && array[mid] === array[mid + 1]) {
    mid++;
    count++;
  }

  while (start < midSub && array[midSub] === array[midSub - 1]) {
    midSub--;
    count++;
  }

  root.count = count;
  root.left = buildTree(array, start, midSub - 1);
  root.right = buildTree(array, mid + 1, end);

  return root;
};

const mergeSort = (array) => {
  if (array.length <= 1) return array;

  const mid = Math.floor(array.length / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid);

  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  return merge(sortedLeft, sortedRight);
};

const merge = (left, right) => {
  let result = [];
  let leftI = 0;
  let rightI = 0;

  while (leftI < left.length && rightI < right.length) {
    if (left[leftI] < right[rightI]) {
      result.push(left[leftI]);
      leftI++;
    } else {
      result.push(right[rightI]);
      rightI++;
    }
  }

  return result.concat(left.slice(leftI)).concat(right.slice(rightI));
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(
    `${prefix}${isLeft ? "└── " : "┌── "}${node.value}${
      node.count > 1 ? "(" + node.count + ")" : ""
    }`
  );
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

console.log(Tree(/* filterArray( */ generateArray(100) /* ) */));
