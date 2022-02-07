import { palette } from "./palette"

/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export const color = {
  /**
   * The palette is available to use, but prefer using the name.
   */
  palette,
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The screen background.
   */
  background: '#161615',
  backgroundLight: '#232320',
  /**
   * The main tinting color.
   */
  primary: '#ffb224',
  /**
   * The main tinting color, but darker.
   */
  primaryDarker: '#693f05',
  /**
   * A subtle color used for borders and lines.
   */
  line: '#353431',
  /**
   * The default color of text in many components.
   */
  text: '#a1a09a',
  textHighLighted: '#ededec',
  /**
   * Secondary information.
   */
  dim: '#717069',
  /**
   * Error messages and icons.
   */
  error: palette.angry,

  /**
   * Storybook background for Text stories, or any stories where
   * the text color is color.text, which is white by default, and does not show
   * in Stories against the default white background
   */
  storybookDarkBg: palette.black,

  /**
   * Storybook text color for stories that display Text components against the
   * white background
   */
  storybookTextColor: palette.black,
}
const sandDark = {
  sand1: '#161615',
  sand2: '#1c1c1a',
  sand3: '#232320',
  sand4: '#282826',
  sand5: '#2e2e2b',
  sand6: '#353431',
  sand7: '#3e3e3a',
  sand8: '#51504b',
  sand9: '#717069',
  sand10: '#7f7e77',
  sand11: '#a1a09a',
  sand12: '#ededec',
}