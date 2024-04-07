# Mobile Sheet
A minimal typescript implementation of mobile sheets

## Plain Typescript
### Installation
```
$ npm i @royalzsoftware/mobile-sheet
```

## Angular

### Installation
```
$ npm i @royalzsoftware/mobile-sheet.angular
```

### Use the sheet
1. Import the MobileSheet Component, exposed from the library.
2. Provide the SHEET_CONFIGURATION Injection token, to configure dock points and transition speed.
3. Then add following tag.
```
<mobile-sheet>

<div #handle>
Your handle to drag the sheet
</div>

</mobile-sheet>
```

### Style the sheet
The mobile sheet component has ViewEncapsulation.None. Style the sheet by overriding styles on the #sheet selector.
The handle is client code and you can change it yourself without dealing with the library.