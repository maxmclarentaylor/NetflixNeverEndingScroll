I am currently in the process of replicating the Netflix front-end website as a personal upskilling project.

This segment of the application shows my version of the Netflix never-ending scroll.

On first glance it may seem like a simple carousel. However when you look closer at the Netflix ui, it becomes clear it is a challenging piece of code which resulted in extensive use of various hooks, complex conditional styling and array manipluation, with a custom throttle hook.

To run the application after installing all of the packages simply run npm run dev.

This is the first iteration. Styled components will be brought in at a later date.

The scroll has been fully tested. 

Please feel free to manipulate the times of the throttle found @src/components/videoSelectionPage/customHooks/VideoSelectionThrottle.tsx to see the behaviour of the carousel with more clarity.
