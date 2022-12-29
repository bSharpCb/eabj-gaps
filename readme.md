# Introduction
My girlfriend loves Jeopardy, and we've watched a ton of episodes over the last year together. When struggling with a particular category, she'll often say something like "Ahh lakes and rivers, big knowledge gap for me". Sometime around May 2022, I started writing these down, with the vague idea that I could help her bridge these gaps somehow. 

So now, I'm working on this project as a Christmas present to my girlfriend-- in hopes that it will help her sharpen her Jeopardy skills. This is a tool that crawls J-Archive pages for categories matching a regex of her knowledge gaps, and then pulls those into a separate game instance daily. I don't know if this will actually be helpful at all, but it's been a fun project and I've learned a lot along the way. 

# Structure

J-app: web app (express) that reads clues.json and renders it as a game board

J-crawl: puppeteer script that crawls J-archives for categories, clues, and answers. These are then written to a database, which is queried daily for 5 random categories (for a total of 25 questions). This daily board is then place inside the web app by overwriting j-app/public/lib/clues.json

# Usage

J-crawl:
- npm run clear: removes all entries from db
- npm run update: scrapes clues and updates db
- npm run tca: queries db for 5 random categories and writes to J-app/public/lib/clues.json


# Future updates:
- user logins, allowing for users to maintain their own regex and daily boards
- ability to update your own regex
- tracking progress (improvement in categories, gameboard history)

