# Comment Widget Component

The Comment Widget component is a React component that provides a user-friendly way to display and interact with comments. It allows users to view, reply to, edit, like, and delete comments in a threaded conversation format.

## Test Link

- https://commentwidget-adithya2000.netlify.app

## Note

- This repository is for a sample deployed version of the widget to show its use case

## Features

- Display main comments and their replies in a threaded conversation.
- Reply to comments.
- Edit and delete comments.
- Like comments.
- Sort comments by date or number of likes.
- Persistence: The comment section retains and displays previous comments and likes even after a page reload.
- User Interface: The comment widget has a clean and modern design, prioritizing user experience and accessibility.
- ReactJS: Developed using the ReactJS frontend framework.

## Integration

- The Current component has its core logic removed from the element so it can be easily integrated with any application
- The Logic for handling the different operations is passed as props to the component so we can handle it depending on our own usage
- The comments can be fetched from any endpoint and can be passed as props and depending on the endpoint the logic to edit add replies and like comments can be done

##  Key Design Decisions 

- The first major design decision was to separate core logic from the component as much as possible and this was done effectively
- The current widget component is a pure UI component that displays and sorts data all the other logic and functionality which we need to handle should be done depending on the application and endpoint used
- Another major design decision was the rendering of threaded replies which was achieved using recursion
- To minimize the number of states and the use of useEffect hook which was done (Zero useEffect hooks are used in this component and a total of only five states, which includes the states of child components are used)

## Challenges Faced

- A major challenge faced was to handle the threaded replies properly which after brainstorming was handled using recursion
- Another challenge was to minimize the number of states used which was also achieved
- Working without any endpoint was done by using mock data

## UX and Accessibility 

- UX and accessibility by making the UI as simple as possible
- By removing the core logic from the component it can be used in any application

## External Libraries Used

- The uuid library was used to generate uuid when creating new components but this was done only for mock implementation and is not part of the component so this dependency can actually be removed and the necessary id can be passed based on our endpoint

## Possible Improvements Which Can Be Made

- Pagination-feature can be added easily to the component to load only the specified number initially which can be passed as props and show a load more button to load the next list of comments
- The buttons can be replaced with Icons to improve UX
- The component can be made more responsive
- The sorting can also be handled by the API instead of the component
