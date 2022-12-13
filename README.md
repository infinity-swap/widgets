![Logo](https://infinityswap-documentation.web.app/img/logo-dark.png)

# WIP: InfinitySwap Widgets

The @infinityswap/widgets package [coming soon] is an npm package of React components used to provide subsets of the InfinitySwap Protocol functionality in a small and configurable user interface element.

# Swap Widget

The Swap Widget bundles the whole swapping experience into a single React component that developers can easily embed in their app with a few lines of code.

You can customize the theme (colors, fonts, and more) to match the style of your application.

<img width="431" alt="Screenshot 2022-12-08 at 14 51 54" src="https://user-images.githubusercontent.com/25309184/206477889-ad2369bc-9240-4c07-9a28-51a224ecb8b6.png">
## Installation

Install infinityswapwidget with npm

```bash
  npm install --save @infinityswapofficial/infinityswapwidget
```

### Adding the Swap Widget to Your React App

Next, embed the React component in your application.

```javascript
import { SwapWidget } from "@infinityswap/widgets";

function App() {
  return (
    <div>
      <SwapWidget />
    </div>
  );
}
```

### Customizing the Swap Widget

You can change the appearance of the swap widgets to what best fits you. By passing your theme into the theme Prop, you can customize the theme of the SwapWidget.
You can customize the colors, font, and border radius of the swap widget to match the look and feel of your dApp.

```javascript
import { SwapWidget } from "@infinityswap/widgets";

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
};
function App() {
  return (
    <div>
      <SwapWidget theme={theme} />
    </div>
  );
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
  );
}
```

### Swap Widget API Reference (Optional props)

| Prop Name                  | Prop Type.    | Default Value. | Description                                                                                                    |
| :------------------------- | :------------ | :------------- | :------------------------------------------------------------------------------------------------------------- |
| `theme`                    | `object`      | `lightTheme`   | Theme prop defines the theme of the widget                                                                     |
| `onConnectWallet`          | `() => void`  |                | If passed, allows you to add custom behavior when the user clicks on the 'Connect your wallet to swap' button. |
| `defaultInputAmount`       | `number`      | 0              | Default amount for inToken                                                                                     |
| `defaultOutputTokenSymbol` | `string`      |                | The default output token symbol for the output token field eg. `defaultOutputTokenSymbol="icp"`                |
| `defaultInputTokenSymbol`  | `string`      |                | The default input token symbol for the input token field eg. `defaultInputTokenSymbol="icp"`                   |
| `onError`                  | `(e) => void` |                | Widget error handler for Javascript errors.                                                                    |
| `onSuccess`                | `(e) => void` |                | A handler that is called when a transaction succeeds                                                           |

|

## License

[MIT](https://choosealicense.com/licenses/mit/)

# Legal notice

Astari encourages integrators to evaluate their own regulatory obligations when integrating this widget into their products, including, but not limited to, those related to economic or trade sanctions compliance.

THE CODE (THE “CODE”) PROVIDED BY ASTARI LTD (THE “COMPANY”), WHICH INTERFACES WITH THE AUTOMATED MARKET MAKER (“AMM”), IS PROVIDED ON AN AS IS BASIS. THE COMPANY DOES NOT GIVE ANY WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE AND/OR NONINFRINGEMENT. IN NO EVENT SHALL THE COMPANY BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE CODE, THE AMM AND/OR THE USE OF OR OTHER DEALINGS IN THE CODE AND THE AMM.

USERS SHOULD BE AWARE OF THE RISKS ASSOCIATED WITH USING OPEN-SOURCE CODE WHICH INCLUDE, BUT ARE NOT LIMITED TO, LACK OF SECURITY, OPERATIONAL INSUFFICIENCIES, SOFTWARE QUALITY AND COPYRIGHT INFRINGEMENT. BY USING THE CODE OR AMM USERS ACCEPT THESE RISKS. FOR THE AVOIDANCE OF DOUBT, THE COMPANY IS NOT RESPONSIBLE FOR AND ACCEPTS NO LIABILITY FOR ANY LOSS WHICH RESULTS FROM ANY SUCH RISK MATERIALISING OR ANY OTHER ISSUE WITH THE CODE OR AMM.
