Rate Calendar Component
Description
This project implements a Rate Calendar component using TypeScript, ReactJS/NextJS, Material UI, and React Query. It fetches data from a Rate Calendar API to display room rates and availability over a specified date range.

code sanbox:-https://codesandbox.io/p/github/devshakilh/room_data/main?file=%2Fpages%2Findex.tsx%3A44%2C1&layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clxvhls920006356ojmn6imhs%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clxvhls920002356ob3ue1s7h%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clxvhls920004356onuttv8xf%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clxvhls920005356o6dxkv244%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clxvhls920002356ob3ue1s7h%2522%253A%257B%2522id%2522%253A%2522clxvhls920002356ob3ue1s7h%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clxvi1zw60002356nhl6swek5%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522initialSelections%2522%253A%255B%257B%2522startLineNumber%2522%253A44%252C%2522startColumn%2522%253A1%252C%2522endLineNumber%2522%253A44%252C%2522endColumn%2522%253A1%257D%255D%252C%2522filepath%2522%253A%2522%252Fpages%252Findex.tsx%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%255D%252C%2522activeTabId%2522%253A%2522clxvi1zw60002356nhl6swek5%2522%257D%252C%2522clxvhls920005356o6dxkv244%2522%253A%257B%2522id%2522%253A%2522clxvhls920005356o6dxkv244%2522%252C%2522activeTabId%2522%253A%2522clxx1j04f007d356oh0q4trdy%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522UNASSIGNED_PORT%2522%252C%2522port%2522%253A3000%252C%2522id%2522%253A%2522clxx1j04f007d356oh0q4trdy%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522path%2522%253A%2522%252F%2522%257D%255D%257D%252C%2522clxvhls920004356onuttv8xf%2522%253A%257B%2522id%2522%253A%2522clxvhls920004356onuttv8xf%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522id%2522%253A%2522clxvhltyb0035356os3lvs1gw%2522%252C%2522mode%2522%253A%2522permanent%2522%257D%255D%252C%2522activeTabId%2522%253A%2522clxvhltyb0035356os3lvs1gw%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D

#-project demo codesanbox and live (https://www.awesomescreenshot.com/video/29039973?key=2bb96a8b54a4a874f08364aee5b6e621)
#Tech Stack
-TypeScript
-ReactJS / NextJS
-Material UI
-React Query
Installation
-Clone the repository:

bash
Copy code
git clone <repository-url>
cd rate-calendar-component
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm run dev
Usage
To use the Rate Calendar component:

Navigate to the application in your web browser.
Select a date range using the Date Range Picker.
View room categories and associated rate plans for the selected dates.
API Integration
The Rate Calendar component integrates with the Rate Calendar API to fetch the following data:

Room categories
Room inventory and availability
Rate plans
API requests are handled using React Query for efficient data fetching and caching.

Contributing
Contributions are welcome! Here's how you can contribute:

Fork the repository.
Create your feature branch (git checkout -b feature/MyFeature).
Commit your changes (git commit -am 'Add some feature').
Push to the branch (git push origin feature/MyFeature).
Create a new Pull Request.