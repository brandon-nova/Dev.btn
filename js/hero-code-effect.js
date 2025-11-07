// Hero Code Typing Effect
(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const MAX_SNIPPETS = 3;
  const TYPING_SPEED = prefersReducedMotion ? 0 : 240; // ms per character (much slower for calming effect)
  const VISIBLE_DURATION = 4000; // ms
  const FADE_DURATION = 2000; // ms
  
  const codeSnippets = {
    python: [
      {
        code: `def train_model(X, y):
    model = RandomForest()
    model.fit(X, y)
    return model`,
        highlight: (text) => highlightPython(text)
      },
      {
        code: `import pandas as pd
df = pd.read_csv('data.csv')
result = df.groupby('category').mean()`,
        highlight: (text) => highlightPython(text)
      },
      {
        code: `from sklearn.ensemble import GradientBoosting
gb = GradientBoosting(n_estimators=100)
gb.fit(X_train, y_train)`,
        highlight: (text) => highlightPython(text)
      },
      {
        code: `import numpy as np
array = np.array([1, 2, 3, 4, 5])
mean = np.mean(array)`,
        highlight: (text) => highlightPython(text)
      }
    ],
    sql: [
      {
        code: `SELECT customer_id, 
       COUNT(*) as transactions
FROM transactions
GROUP BY customer_id`,
        highlight: (text) => highlightSQL(text)
      },
      {
        code: `SELECT * FROM users
WHERE created_at > '2024-01-01'
ORDER BY created_at DESC`,
        highlight: (text) => highlightSQL(text)
      },
      {
        code: `WITH ranked_data AS (
  SELECT *, ROW_NUMBER() 
  OVER (PARTITION BY category) as rn
  FROM products
)
SELECT * FROM ranked_data WHERE rn = 1`,
        highlight: (text) => highlightSQL(text)
      }
    ],
    javascript: [
      {
        code: `const model = tf.sequential({
  layers: [
    tf.layers.dense({inputShape: [784], units: 32}),
    tf.layers.dense({units: 10})
  ]
});`,
        highlight: (text) => highlightJavaScript(text)
      },
      {
        code: `async function fetchData() {
  const response = await fetch('/api/data');
  const data = await response.json();
  return data;
}`,
        highlight: (text) => highlightJavaScript(text)
      },
      {
        code: `const processArray = (arr) => {
  return arr.map(x => x * 2)
            .filter(x => x > 10)
            .reduce((a, b) => a + b, 0);
};`,
        highlight: (text) => highlightJavaScript(text)
      }
    ],
    r: [
      {
        code: `library(dplyr)
df <- df %>%
  group_by(category) %>%
  summarise(mean = mean(value))`,
        highlight: (text) => highlightR(text)
      },
      {
        code: `model <- lm(y ~ x1 + x2, data = dataset)
summary(model)
predictions <- predict(model, newdata)`,
        highlight: (text) => highlightR(text)
      },
      {
        code: `library(ggplot2)
ggplot(data, aes(x = x, y = y)) +
  geom_point() +
  geom_smooth(method = "lm")`,
        highlight: (text) => highlightR(text)
      }
    ]
  };

  function highlightPython(text) {
    const keywords = ['def', 'import', 'from', 'return', 'class', 'if', 'else', 'for', 'in', 'as'];
    const functions = ['fit', 'predict', 'read_csv', 'groupby', 'mean', 'array', 'mean'];
    
    keywords.forEach(kw => {
      text = text.replace(new RegExp(`\\b${kw}\\b`, 'g'), `<span class="keyword">${kw}</span>`);
    });
    
    functions.forEach(fn => {
      text = text.replace(new RegExp(`\\b${fn}\\b(?=\\()`, 'g'), `<span class="function">${fn}</span>`);
    });
    
    text = text.replace(/'([^']*)'/g, `<span class="string">'$1'</span>`);
    text = text.replace(/"([^"]*)"/g, `<span class="string">"$1"</span>`);
    text = text.replace(/#([^\n]*)/g, `<span class="comment">#$1</span>`);
    text = text.replace(/\b(\d+\.?\d*)\b/g, `<span class="number">$1</span>`);
    
    return text;
  }

  function highlightSQL(text) {
    const keywords = ['SELECT', 'FROM', 'WHERE', 'GROUP BY', 'ORDER BY', 'AS', 'WITH', 'OVER', 'PARTITION BY'];
    
    keywords.forEach(kw => {
      text = text.replace(new RegExp(`\\b${kw}\\b`, 'gi'), `<span class="keyword">${kw}</span>`);
    });
    
    text = text.replace(/'([^']*)'/g, `<span class="string">'$1'</span>`);
    text = text.replace(/\b(\d+\.?\d*)\b/g, `<span class="number">$1</span>`);
    
    return text;
  }

  function highlightJavaScript(text) {
    const keywords = ['const', 'let', 'var', 'function', 'async', 'await', 'return', 'if', 'else', 'for', 'of'];
    
    keywords.forEach(kw => {
      text = text.replace(new RegExp(`\\b${kw}\\b`, 'g'), `<span class="keyword">${kw}</span>`);
    });
    
    text = text.replace(/'([^']*)'/g, `<span class="string">'$1'</span>`);
    text = text.replace(/"([^"]*)"/g, `<span class="string">"$1"</span>`);
    text = text.replace(/`([^`]*)`/g, `<span class="string">\`$1\`</span>`);
    text = text.replace(/\/\/([^\n]*)/g, `<span class="comment">//$1</span>`);
    text = text.replace(/\b(\d+\.?\d*)\b/g, `<span class="number">$1</span>`);
    
    return text;
  }

  function highlightR(text) {
    const keywords = ['library', 'function', 'return', 'if', 'else', 'for', 'in'];
    const functions = ['group_by', 'summarise', 'mean', 'lm', 'summary', 'predict', 'ggplot', 'aes', 'geom_point', 'geom_smooth'];
    
    keywords.forEach(kw => {
      text = text.replace(new RegExp(`\\b${kw}\\b`, 'g'), `<span class="keyword">${kw}</span>`);
    });
    
    functions.forEach(fn => {
      text = text.replace(new RegExp(`\\b${fn}\\b`, 'g'), `<span class="function">${fn}</span>`);
    });
    
    text = text.replace(/'([^']*)'/g, `<span class="string">'$1'</span>`);
    text = text.replace(/"([^"]*)"/g, `<span class="string">"$1"</span>`);
    text = text.replace(/#([^\n]*)/g, `<span class="comment">#$1</span>`);
    text = text.replace(/\b(\d+\.?\d*)\b/g, `<span class="number">$1</span>`);
    
    return text;
  }

  function getRandomSnippet() {
    const languages = Object.keys(codeSnippets);
    const lang = languages[Math.floor(Math.random() * languages.length)];
    const snippets = codeSnippets[lang];
    return snippets[Math.floor(Math.random() * snippets.length)];
  }

  function getRandomPosition(container, existingPositions, minDistance = 300) {
    const containerRect = container.getBoundingClientRect();
    const maxX = containerRect.width - 250;
    const maxY = containerRect.height - 150;
    
    // Try to find a position that's far enough from existing snippets
    let attempts = 0;
    const maxAttempts = 50;
    
    while (attempts < maxAttempts) {
      const x = Math.random() * maxX;
      const y = Math.random() * maxY;
      
      // Check distance from all existing positions
      let tooClose = false;
      for (const pos of existingPositions) {
        const distance = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2));
        if (distance < minDistance) {
          tooClose = true;
          break;
        }
      }
      
      if (!tooClose) {
        return { x, y };
      }
      
      attempts++;
    }
    
    // If we couldn't find a good position after many attempts, just return a random one
    return {
      x: Math.random() * maxX,
      y: Math.random() * maxY
    };
  }

  function createCodeSnippet(container, snippet, existingPositions) {
    const div = document.createElement('div');
    div.className = 'code-snippet';
    const pos = getRandomPosition(container, existingPositions);
    div.style.left = pos.x + 'px';
    div.style.top = pos.y + 'px';
    div.dataset.x = pos.x;
    div.dataset.y = pos.y;
    container.appendChild(div);
    
    return { element: div, position: pos };
  }

  async function typeCode(element, snippet) {
    element.classList.add('typing');
    const fullCode = snippet.code;
    const highlighted = snippet.highlight(fullCode);
    const plainText = fullCode;
    
    // Create a temporary element to get highlighted HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = highlighted;
    const highlightedHTML = tempDiv.innerHTML;
    
    // Type out the code character by character (skip if reduced motion)
    if (!prefersReducedMotion && TYPING_SPEED > 0) {
      let currentText = '';
      for (let i = 0; i < plainText.length; i++) {
        currentText = plainText.substring(0, i + 1);
        // Apply highlighting to current text
        const temp = document.createElement('div');
        temp.innerHTML = snippet.highlight(currentText);
        element.innerHTML = temp.innerHTML;
        await new Promise(resolve => setTimeout(resolve, TYPING_SPEED));
      }
    }
    
    // Show full highlighted version
    element.innerHTML = highlightedHTML;
    element.classList.remove('typing');
    element.classList.add('visible');
    
    // Wait before fading
    await new Promise(resolve => setTimeout(resolve, VISIBLE_DURATION));
    
    // Fade out
    element.classList.remove('visible');
    element.classList.add('fading');
    
    await new Promise(resolve => setTimeout(resolve, FADE_DURATION));
    
    // Remove element
    element.remove();
  }

  function spawnCodeSnippet(container, activeSnippets) {
    if (activeSnippets.size >= MAX_SNIPPETS) {
      return;
    }
    
    // Get existing positions
    const existingPositions = Array.from(activeSnippets).map(item => ({
      x: parseFloat(item.element.dataset.x) || 0,
      y: parseFloat(item.element.dataset.y) || 0
    }));
    
    const snippet = getRandomSnippet();
    const { element, position } = createCodeSnippet(container, snippet, existingPositions);
    
    const snippetData = { element, position };
    activeSnippets.add(snippetData);
    
    typeCode(element, snippet).then(() => {
      activeSnippets.delete(snippetData);
    });
  }

  function init() {
    // Don't initialize if reduced motion is preferred
    if (prefersReducedMotion) {
      return;
    }
    
    const container = document.getElementById('hero-code-background');
    if (!container) return;
    
    const activeSnippets = new Set();
    
    // Spawn initial snippets
    for (let i = 0; i < Math.min(2, MAX_SNIPPETS); i++) {
      setTimeout(() => {
        spawnCodeSnippet(container, activeSnippets);
      }, i * 3000);
    }
    
    // Continuously spawn new snippets
    function scheduleNext() {
      const delay = 3000 + Math.random() * 4000; // 3-7 seconds
      setTimeout(() => {
        if (activeSnippets.size < MAX_SNIPPETS) {
          spawnCodeSnippet(container, activeSnippets);
        }
        scheduleNext();
      }, delay);
    }
    
    scheduleNext();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

