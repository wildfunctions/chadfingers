type PracticeContent = {
  name: string;
  code: string;
}

const practiceContents: { [key: string]: PracticeContent } = { 
  'function_0': {
    name: 'Functions - Level 0',
    code: `var foo = "t";\n\nconst myFunction = function(arg) {\n\tvar a = arg;\n};`
  },
  'function_1': {
    name: 'Functions - Level 1',
    code: `function reverseString(str: string): string {\n\treturn str.split('').reverse().join('');\n}\n\nconst originalString = "hello";\nconst reversedString = reverseString(originalString);\nconsole.log(reversedString);`
  },
  'parenthesis_0': {
    name: 'Parenthesis - Level 0',
    code: `(((((((\n)))))))\n((( )))\n(),(),()\n(((( ))))\n((( )))\n(( ))\n()`
  },
  'parenthesis_1': {
    name: 'Parenthesis - Level 1',
    code: `(),(),()\n(a, b, c)\n( (a, b, c), (a, b), (a), () )\n(( ))\n()`
  }, 
  'parenthesis_2': {
    name: "Parenthesis - Level 2",
    code: `str.split('').reverse().join('').split('').reverse().join('').replaceAll('', '');`
  },
};

const RETURN = '⏎';
const TAB = '↹';

type HighlightedCharacter = {
    character: string;
    color: string;
    classification: string; // Added classification field
};

type ColorTheme = {
  text: string;
  background: string;
};

type ColorThemes = {
  default: ColorTheme;
  error: ColorTheme;
  cursor: ColorTheme;
};

function highlightTypeScript(code: string): HighlightedCharacter[] {
    const result: HighlightedCharacter[] = [];
    const colors = {
        controlFlow: '#af00db',
        typeAndClassName: '#267f99',
        numbers: 'green',
        functionName: '#795e26',
        defines: '#0000ff',
        string: '#a31515',
        variable: '#001080',
        normal: 'black'
    };

    // Patterns to match syntax elements
    const patterns = [
        { pattern: /\(|\)|:|;/g, color: colors.normal, classification: 'syntax' },
        { pattern: /\b(if|else|return|for|while|switch|case|default|break|continue)\b/g, color: colors.controlFlow, classification: 'control' },
        { pattern: /\b(function|const|let|var)\b/g, color: colors.defines, classification: 'defines' },
        { pattern: /(["'])(?:(?=(\\?))\2.)*?\1/g, color: colors.string, classification: 'string' },
        { pattern: /\b([A-Z][a-zA-Z0-9_]*)\b/g, color: colors.typeAndClassName, classification: 'className' },
        { pattern: /:\s*([a-zA-Z0-9_]*)/g, color: colors.typeAndClassName, classification: 'type' },
        { pattern: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(\b/g, color: colors.functionName, classification: 'functionName' },
        { pattern: /\.([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, color: colors.functionName, classification: 'functionName' },
        { pattern: /([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*=>)/g, color: colors.functionName, classification: 'functionName' },
        { pattern: /[0-9]+/g, color: colors.numbers, classification: 'numbers' },
    ];

    const colorMap: { [index: number]: HighlightedCharacter } = {};

    patterns.forEach(({ pattern, color, classification }) => {
        let match;
        while ((match = pattern.exec(code)) !== null) {
            for (let i = match.index; i < match.index + match[0].length; i++) {
                if(!colorMap[i]) {
                  colorMap[i] = { character: code.charAt(i), color, classification };
                }
            }
        }
    });

    // Fill the result based on colorMap, defaulting to normal if not matched
    for (let i = 0; i < code.length; i++) {
        if(code.charAt(i) == '\n') {
          result.push(
            {
              character: RETURN,
              color: colors.normal,
              classification: "default"
            }
          )
        }
        if(code.charAt(i) == '\t') {
          result.push(
            {
              character: TAB,
              color: colors.normal,
              classification: "default"
            }
          )
        }
        if (colorMap[i]) {
            result.push({
                character: code[i],
                color: colorMap[i].color,
                classification: colorMap[i].classification
            });
        } else {
            result.push({
                character: code[i],
                color: colors.normal,
                classification: "default"
            });
        }
    }

    return result;
}

const isFirefox = navigator.userAgent.indexOf("Firefox") > -1;

enum KeyboardEventCodes {
  DIGIT0 = 48,
  DIGIT1 = 49,
  DIGIT2 = 50,
  DIGIT3 = 51,
  DIGIT4 = 52,
  DIGIT5 = 53,
  DIGIT6 = 54,
  DIGIT7 = 55,
  DIGIT8 = 56,
  DIGIT9 = 57,
  A = 65,
  B = 66,
  C = 67,
  D = 68,
  E = 69,
  F = 70,
  G = 71,
  H = 72,
  I = 73,
  J = 74,
  K = 75,
  L = 76,
  M = 77,
  N = 78,
  O = 79,
  P = 80,
  Q = 81,
  R = 82,
  S = 83,
  T = 84,
  U = 85,
  V = 86,
  W = 87,
  X = 88,
  Y = 89,
  Z = 90,
  BACKSPACE = 8,
  COMMA = 188,
  PERIOD = 190,
  SEMICOLON = isFirefox ? 59 : 186,
  FORWARD_SLASH = 191,
  QUOTE = 222,
  BRACKET_LEFT = 219,
  BRACKET_RIGHT = 221,
  BACKQUOTE = 192,
  BACKSLASH = 220,
  MINUS = 173,
  EQUAL = isFirefox ? 61 : 187,
  SPACE = 32,
  ENTER = 13,
  TAB = 9,
  NUMPAD0 = 96,
  NUMPAD1 = 97,
  NUMPAD2 = 98,
  NUMPAD3 = 99,
  NUMPAD4 = 100,
  NUMPAD5 = 101,
  NUMPAD6 = 102,
  NUMPAD7 = 103,
  NUMPAD8 = 104,
  NUMPAD9 = 105,
}

const allowedValues = Object.values(KeyboardEventCodes).filter( (e:any) => typeof e !== 'string');

const themes: ColorThemes = {
  default: {
    text: "gray",
    background: "white",
  },
  error: {
    text: "white",
    background: "red",
  },
  cursor: {
    text: "white",
    background: "#0078d7",
  }
};


function classifier(parsed: string) {
  if(parsed.includes("&quot;")) {
    parsed = parsed.replaceAll("&quot;", `"`)
  }
  return parsed
}

var classifications: HighlightedCharacter[] = [];
var currentPosition = 0;

function renderPage(practiceContent: PracticeContent) {
  const code = document.createElement("div");
  code.id = "code";
  code.style.width = '40%';
  code.style.margin = '0px auto';
  code.style.fontFamily = 'Menlo, Monaco, Consolas'
  
  const title = document.createElement("p");
  title.textContent = practiceContent.name;
  title.style.textAlign = 'center';

  document.body.appendChild(title);

  for(const p of classifications) {
    if(p.character == '\n') {
      const br = document.createElement("br");
      code.appendChild(br);
    } else {
      const span = document.createElement("span");
      span.textContent = p.character
      span.style.color = themes.default.text;
      if([TAB, RETURN].includes(p.character)) {
        span.style.color = themes.default.background;
      }
      // span.style.color = p.color;
      code.appendChild(span);
    }
  }
  document.body.appendChild(code);

  return () => {
    title.remove();
    code.remove();
  }
}

function applyTheme(text: string, background: string, position: number) {
  //@ts-ignore
  code.childNodes[position].style.backgroundColor = background;
  //@ts-ignore
  code.childNodes[position].style.color = text;
}

function loadPage() {
  const url = new URL(window.location.href);
  const lesson = url.searchParams.get('lesson');
  const level = url.searchParams.get('level');
  var urlParamsSet = false;
  if (!lesson) {
    url.searchParams.set('lesson', 'function');
    urlParamsSet = true;
  }
  if (!level) {
    url.searchParams.set('level', '0');
    urlParamsSet = true;
  }
  if(urlParamsSet) {
    window.location.href = url.toString(); 
  }

  const practiceContent = practiceContents[`${lesson}_${level}`];
  classifications = highlightTypeScript(practiceContent.code);

  const deconstructor = renderPage(practiceContent);

  const code = document.getElementById("code");
  if(!code) {
    console.error(`No code element`);
    return
  }

  applyTheme(themes.cursor.text, themes.cursor.background, currentPosition);
}

function keyListener() {

  document.addEventListener('keydown', (event) => {
    if(!event) {
      console.error(`No event: ${event}`)
      return
    }

    if(
      event.keyCode === KeyboardEventCodes.QUOTE && event.key === `'` ||
      event.keyCode === KeyboardEventCodes.FORWARD_SLASH && event.key === `/`
    ) {
      event.preventDefault();
    }
    if(!allowedValues.includes(event.keyCode)) {
      console.log(`keyCode ignored: ${event.keyCode}`)
      return
    }

    if(event.keyCode == KeyboardEventCodes.BACKSPACE) {
      // at beginning of code
      if(currentPosition == 0) {
        return
      }
      applyTheme(themes.default.text, themes.default.background, currentPosition);
      if([TAB, RETURN].includes(classifications[currentPosition].character)) {
        applyTheme(themes.default.background, themes.default.background, currentPosition);
      }
      // look at previous character for \n check
      if(classifications[currentPosition - 1].character === '\n') {
        currentPosition--
      }
      if(classifications[currentPosition - 1].character === '\t') {
        currentPosition--
      }
      applyTheme(themes.cursor.text, themes.cursor.background, --currentPosition);
      return
    }
    if(event.keyCode == KeyboardEventCodes.ENTER) {
      if(classifications[currentPosition].character == RETURN) {
        applyTheme(themes.default.background, themes.default.background, currentPosition);
        currentPosition++
        applyTheme(themes.cursor.text, themes.cursor.background, ++currentPosition);
        return
      }
    }
    if(event.keyCode == KeyboardEventCodes.TAB) {
      event.preventDefault();
      if(classifications[currentPosition].character == TAB) {
        applyTheme(themes.default.background, themes.default.background, currentPosition);
        currentPosition++
        applyTheme(themes.cursor.text, themes.cursor.background, ++currentPosition);
      } 
      return
    }
    if(event.key == classifications[currentPosition].character) {
      const current = classifications[currentPosition];
      applyTheme(current.color, themes.default.background, currentPosition);
      // at the end of code
      if(currentPosition == classifications.length - 1) {
        const url = new URL(window.location.href);
        const level = parseInt(url.searchParams.get('level') || "") || 0;
        url.searchParams.set('level', String(level + 1));
        window.location.href = url.toString(); 
        return
      }
      applyTheme(themes.cursor.text, themes.cursor.background, ++currentPosition);
    } else {
      applyTheme(themes.error.text, themes.error.background, currentPosition);
    }
  })
}

window.onload = function() {
  loadPage();
  keyListener();
}
