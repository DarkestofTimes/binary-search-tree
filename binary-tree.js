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
  return {
    root: buildTree(mergeSort(array), 0, array.length - 1, null),

    toInsert(...array) {
      const insert = (root, value) => {
        if (root == null) {
          root = Node(value);
          return root;
        }
        if (value == root.value) {
          root.count++;
          return root;
        } else if (value < root.value) {
          root.left = insert(root.left, value);
        } else {
          root.right = insert(root.right, value);
        }
        return root;
      };
      let newArray = [];
      if (Array.isArray(array[0])) {
        newArray = [...array[0]];
      } else {
        newArray = [...array];
      }

      newArray.forEach((item) => {
        insert(this.root, item);
      });
    },

    toRemove(...array) {
      const remove = (node, value) => {
        if (node == null) {
          return node;
        }

        if (value < node.value) {
          node.left = remove(node.left, value);
          return node;
        } else if (value > node.value) {
          node.right = remove(node.right, value);
          return node;
        }

        if (node.left == null) {
          let temp = node.right;
          delete node;
          return temp;
        } else if (node.right === null) {
          let temp = node.left;
          delete node;
          return temp;
        } else {
          let parent = node;
          let successor = node.right;
          while (successor.left !== null) {
            parent = successor;
            successor = successor.left;
          }
          if (parent !== node) {
            parent.left = successor.right;
          } else {
            parent.right = successor.right;
          }
          node.value = successor.value;

          delete successor;
          return node;
        }
      };

      let newArray = [];
      if (Array.isArray(array[0])) {
        newArray = [...array[0]];
      } else {
        newArray = [...array];
      }

      newArray.forEach((item) => {
        remove(this.root, item);
      });
    },

    toFind(...array) {
      const find = (node, value) => {
        if (node == null) {
          return node;
        }

        if (value < node.value) {
          node.left = find(node.left, value);
          return node;
        } else if (value > node.value) {
          node.right = find(node.right, value);
          return node;
        }
        console.log(node);
        return node;
      };
      let newArray = [];
      if (Array.isArray(array[0])) {
        newArray = [...array[0]];
      } else {
        newArray = [...array];
      }

      newArray.forEach((item) => {
        find(this.root, item);
      });
    },

    levelOrder(func) {
      const newArray = [];
      const que = [];
      const node = this.root;
      if (node == null) return;
      que.push(node);

      while (que.length !== 0) {
        if (!func) {
          newArray.push(que[0].value);
        } else {
          func(que[0]);
        }
        if (que[0].left) que.push(que[0].left);
        if (que[0].right) que.push(que[0].right);
        que.shift(0);
      }
      if (!func) {
        console.log(newArray, "levelOrder");
        return newArray;
      }
    },

    inOrder(func) {
      const newArray = [];
      const node = this.root;

      const traverse = (node, func, array) => {
        if (node == null) return;

        traverse(node.left, func, array);
        if (func) {
          func(node);
        } else {
          array.push(node.value);
        }
        traverse(node.right, func, array);
        return node;
      };
      traverse(node, func, newArray);

      if (!func) {
        console.log(newArray, "inOrder");
        return newArray;
      }
    },

    preOrder(func) {
      const newArray = [];
      const node = this.root;

      const traverse = (node, func, array) => {
        if (node == null) return;

        if (func) {
          func(node);
        } else {
          array.push(node.value);
        }
        traverse(node.left, func, array);
        traverse(node.right, func, array);
        return node;
      };
      traverse(node, func, newArray);

      if (!func) {
        console.log(newArray, "preOrder");
        return newArray;
      }
    },

    postOrder(func) {
      const newArray = [];
      const node = this.root;

      const traverse = (node, func, array) => {
        if (node == null) return;

        traverse(node.left, func, array);
        traverse(node.right, func, array);
        if (func) {
          func(node);
        } else {
          array.push(node.value);
        }
        return node;
      };
      traverse(node, func, newArray);

      if (!func) {
        console.log(newArray, "postOrder");
        return newArray;
      }
    },

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        this.prettyPrint(
          node.right,
          `${prefix}${isLeft ? "│   " : "    "}`,
          false
        );
      }
      console.log(
        `${prefix}${isLeft ? "└── " : "┌── "}${node.value}${
          node.count > 1 ? "(" + node.count + ")" : ""
        }`
      );
      if (node.left !== null) {
        this.prettyPrint(
          node.left,
          `${prefix}${isLeft ? "    " : "│   "}`,
          true
        );
      }
    },
  };
};

const Node = (value) => {
  return {
    value: value,
    count: 1,
    left: null,
    right: null,
  };
};

const buildTree = (array, start, end) => {
  let mid = Math.floor((start + end) / 2);
  let midSub = Math.floor((start + end) / 2);
  if (start > end) return null;
  let count = 0;

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

const newTree = Tree(generateArray(100));
newTree.toInsert(3, 15, 76, 89, 54, 98);
newTree.toRemove(3, 13, 17, 25, 68);
newTree.toFind(4, 12, 15, 25, 64);
newTree.prettyPrint();
newTree.levelOrder();
newTree.preOrder();
newTree.inOrder();
newTree.postOrder();
console.log(newTree.root);
