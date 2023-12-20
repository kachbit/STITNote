# STITNote

scripted tabbed interface tree notation. STITNote


a tab script interface of tree notation for a nested hierarchy storage format. utilized for nodex, filetreeUI and menubarUI
<br>

syntax
```yaml
root{/* optonal js object (metadata)  */}
  child"alternative string metadata"
  'non-text charcters, including spaces go inside single quotes'
```
<br>

menubar example:
```yaml
File // this is the root node. there is no metadata
  'New File'{"action": "createFile()"} // metadata set as object. name is inside of single quotes because there is a space
  'Open file'"open()" // metadata set as string
  subsubnode // no meta data 

```
<br>
parsing algorithm v1 (doesn't support metadata):

```javascript
function stitparse(tabString) {
    // Remove single line comments
  const lines1 = tabString.split('\n').map(line => line.replace(/\/\/.*/, ''));
  // Join lines after removing single line comments
  const stringWithoutSingleLineComments = lines1.join('\n');
  // Remove inline comments
  const stringWithoutComments = stringWithoutSingleLineComments.replace(/\/\/.*/g, '');
  const cleanedString= stringWithoutComments;
  const lines = cleanedString.split('\n').filter(line => line.trim() !== ''); // Filter out empty lines
  const root = {};
  const stack = [{ level: -1, node: root }];
  lines.forEach(line => {
    const lineLevel = line.search(/\S/);
    const nodeName = line.trim().replace(/"/g, '\"'); // Escape double quotes
    while (lineLevel <= stack[stack.length - 1].level) {
      stack.pop();
    }
    if (lineLevel > stack[stack.length - 1].level) {
      const newNode = { [nodeName]: null };
      stack[stack.length - 1].node[nodeName] = newNode[nodeName] = {};
      stack.push({ level: lineLevel, node: newNode[nodeName] });
    }
  });
  return JSON.stringify(root, null, 2);
}
```

## Timeline

### 12/20/23
- created the first algorithm to parse files after days of prompting

will incorperate [ENFON](https://github.com/kachbit/ENFON) support
