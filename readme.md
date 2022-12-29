# EABJeopardy
helping my girlfriend practice Jeopardy. Crawls J-Archive pages for categories matching a regex of her knowledge gaps, and then pulls those into a separate game instance

STRUCTURE

J-app: web app (express) that reads clues.json and renders it as a game board

J-crawl: puppeteer script that crawls J-archives for categories, clues, and answers. These are then written to a database, which is queried daily for 5 random categories (for a total of 25 questions). This daily board is then place inside the web app by overwriting j-app/public/lib/clues.json

Future updates:
- user logins, allowing for users to maintain their own regex and daily boards
- ability to update your own regex
- tracking progress (improvement in categories, gameboard history)

