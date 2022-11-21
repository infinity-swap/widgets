
![Logo](https://infinityswap-documentation.web.app/img/logo-dark.png)


## Installation

Install infinityswapwidget with npm

```bash
  npm install --save @infinityswapofficial/infinityswapwidget
```



### Adding the Swap Widget to Your React App

Next, embed the React component in your application.



```javascript
import { SwapWidget } from '@infinityswap/widgets'

function App() {
  return (
    <div>
      <SwapWidget />
    </div>
  )
}
```

### Customizing the Swap Widget

You can change the appearance of the swap widgets to what best fits you. By passing your theme into the theme Prop, you can customize the theme of the SwapWidget.
You can customize the colors, font, and border radius of the swap widget to match the look and feel of your dApp.



```javascript
import { SwapWidget } from '@infinityswap/widgets'

const theme = {
    primary: "rgba(32, 122, 249, 1)",
    error: "rgb(255 42 87)",
    inputContainer: "#4E4E5A",
    inputBorder: "rgba(138, 154, 185, 0.1)",
    container: "#222633",
    dialog: "#222633",
    textDark: "#fff",
    textWhite: "rgb(255 42 87)",
    textGrey: "#868c99",
    disabled: "rgba(232, 235, 241, 1)",
    interactive: "#4E4E5A",
    interactiveBorder: "rgba(138, 154, 185, 0.2)",
    interactiveBorderRadius: "9999px",
    width: "360px",
}
function App() {
  return (
    <div>
      <SwapWidget theme={theme} />
    </div>
  )
}
```

### Customizing the Default Input and Output Tokens


It is possible to pre-populate input and output token fields by setting the `defaultInputAmount`, `defaultOutputTokenSymbol`, and `defaultOutputTokenSymbol` variables.

See example below,



```javascript

function App() {
  return (
    <div>
      <SwapWidget 
        theme={theme} 
        defaultInputAmount="1"
        defaultOutputTokenSymbol="TKN1"
        defaultInputTokenSymbol="T-ICP"
      />
    </div>
  )
}
```
### Swap Widget API  Reference (Optional props)


| Prop Name                  | Prop Type.          | Default Value.       | Description                                     |
| :--------------------------| :--------------     | :------------------- | :---------------------------------------------- |
| `theme`                    | `object`            |    `lightTheme`                  | Theme prop defines the theme of the widget|
| `onConnectWallet`          | `() => void`          |                      | If passed, allows you to add custom behavior when the user clicks on the 'Connect your wallet to swap' button. |
| `defaultInputAmount`       | `number`              | 0                    | Default amount for inToken |
| `defaultOutputTokenSymbol` | `string`            |                      | The default output token symbol for the output token field eg. ` defaultOutputTokenSymbol="icp" ` |
| `defaultInputTokenSymbol`  | `string`            |                      |  The default input token symbol for the input token field eg. ` defaultInputTokenSymbol="icp" `                              |
| `onError`                | `(e) => void`         |                      | Widget error handler for Javascript errors.|
|`onSuccess`                   | `(e) => void`         |                      | A handler that is called when a transaction succeeds
|




## License

[MIT](https://choosealicense.com/licenses/mit/)

