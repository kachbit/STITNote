scripted interface tree notation sitren


a tab script interface of tree notation for a nested hierarchy storage format. utlized for nodex, filetreeUI and menubarUI
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
will incorperate [ENFON](https://github.com/kachbit/ENFON) support
